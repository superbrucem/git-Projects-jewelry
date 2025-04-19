const express = require('express');
const router = express.Router();
const https = require('https');
const http = require('http');

// Function to fetch data from a URL with special handling for Google Drive
const fetchDataFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    // Determine which protocol to use based on the URL
    const client = url.startsWith('https') ? https : http;

    console.log('Making request to:', url);

    client.get(url, (response) => {
      console.log('Response status code:', response.statusCode);
      console.log('Response headers:', response.headers);

      // Handle redirects (including Google Drive's 303 See Other)
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303) {
        console.log('Following redirect to:', response.headers.location);
        return fetchDataFromUrl(response.headers.location).then(resolve).catch(reject);
      }

      // Special handling for Google Drive
      if (url.includes('drive.google.com') && response.statusCode === 200) {
        // Check if the response is HTML (Google Drive sometimes returns HTML instead of JSON)
        const contentType = response.headers['content-type'] || '';
        if (contentType.includes('text/html')) {
          console.log('Received HTML from Google Drive, extracting JSON...');

          // Collect data chunks
          let htmlData = '';
          response.on('data', (chunk) => {
            htmlData += chunk;
          });

          // Process HTML when complete
          response.on('end', () => {
            try {
              // Try to extract JSON from the HTML
              if (htmlData.includes('{') && htmlData.includes('}')) {
                const jsonStart = htmlData.indexOf('{');
                const jsonEnd = htmlData.lastIndexOf('}') + 1;
                const jsonStr = htmlData.substring(jsonStart, jsonEnd);

                console.log('Extracted JSON string:', jsonStr.substring(0, 100) + '...');
                const parsedData = JSON.parse(jsonStr);
                resolve(parsedData);
              } else {
                // If we can't find JSON in the HTML, try an alternative Google Drive URL
                const fileId = url.match(/id=([^&]+)/)?.[1];
                if (fileId) {
                  const altUrl = `https://drive.google.com/uc?id=${fileId}&export=download&confirm=t`;
                  console.log('Trying alternative Google Drive URL:', altUrl);
                  return fetchDataFromUrl(altUrl).then(resolve).catch(reject);
                } else {
                  reject(new Error('Could not extract JSON from Google Drive response'));
                }
              }
            } catch (error) {
              reject(new Error(`Failed to process Google Drive response: ${error.message}`));
            }
          });
          return;
        }
      }

      // Check for successful response
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to fetch data: ${response.statusCode}`));
      }

      // Collect data chunks
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      // Process data when complete
      response.on('end', () => {
        try {
          console.log('Received data length:', data.length);
          console.log('Data preview:', data.substring(0, 100) + '...');
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
  });
};

// Load YouTube data exclusively from Google Drive
const loadYoutubeData = async () => {
  try {
    // File ID for the JSON file on Google Drive
    const fileId = '1gFyvg1CjWjgBC9OQZe97A2me9BLki657';

    // Try different URL formats for Google Drive
    const urls = [
      // Format 1: Standard export download
      `https://drive.google.com/uc?export=download&id=${fileId}`,

      // Format 2: With confirmation token
      `https://drive.google.com/uc?id=${fileId}&export=download&confirm=t`,

      // Format 3: Direct file URL
      `https://drive.google.com/file/d/${fileId}/view?usp=sharing`
    ];

    // Use environment variable if available
    const customUrl = process.env.YOUTUBE_DATA_URL;
    if (customUrl) {
      urls.unshift(customUrl); // Try the custom URL first
    }

    // Try each URL until one works
    let lastError = null;
    for (const url of urls) {
      try {
        console.log('Fetching YouTube data from Google Drive:', url);
        const data = await fetchDataFromUrl(url);
        console.log('Successfully fetched YouTube data from Google Drive');

        // Ensure the data has a source property
        if (!data.source) {
          data.source = 'google-drive';
        }

        // Ensure the data has a lastUpdated property
        if (!data.lastUpdated) {
          data.lastUpdated = new Date().toISOString();
        }

        return data;
      } catch (error) {
        console.error(`Error with URL ${url}:`, error.message);
        lastError = error;
        // Continue to the next URL
      }
    }

    // If we get here, all URLs failed
    throw lastError || new Error('All Google Drive URLs failed');
  } catch (error) {
    console.error('Error fetching YouTube data from Google Drive:', error.message);

    // Return empty data structure instead of hardcoded data
    return {
      videos: [],
      channelId: "YOUR_CHANNEL_ID",
      source: "google-drive-error",
      lastUpdated: new Date().toISOString(),
      error: error.message
    };
  }
};

// Process videos based on enabled status and sort by order
const processVideos = (youtubeData) => {
  // Filter out disabled videos
  let filteredVideos = youtubeData.videos.filter(video => video.enabled !== false);

  // Sort videos by their order property (ascending)
  filteredVideos.sort((a, b) => {
    return a.order - b.order;
  });

  return filteredVideos;
};

router.get('/', async (req, res) => {
  try {
    const youtubeData = await loadYoutubeData();
    const processedVideos = processVideos(youtubeData);

    // Create debug information to pass to the client
    const debugInfo = {
      videosCount: processedVideos.length,
      dataSource: youtubeData.source || 'google-drive',
      host: req.get('host') || 'unknown',
      url: req.originalUrl || 'unknown',
      timestamp: new Date().toISOString(),
      lastUpdated: youtubeData.lastUpdated || 'unknown',
      dataUrl: process.env.YOUTUBE_DATA_URL || 'default Google Drive URL'
    };

    // If there was an error, include it in the debug info
    if (youtubeData.error) {
      debugInfo.error = youtubeData.error;
    }

    res.render('youtube', {
      title: 'Ottawa Opal Shop - YouTube Channel',
      active: 'youtube',
      videos: processedVideos,
      channelId: youtubeData.channelId,
      debugInfo: JSON.stringify(debugInfo)
    });
  } catch (error) {
    console.error('Error in YouTube route handler:', error);
    res.status(500).send('Error loading YouTube data');
  }
});

module.exports = router;
