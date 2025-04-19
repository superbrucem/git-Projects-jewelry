const express = require('express');
const router = express.Router();
const https = require('https');
const http = require('http');

// Function to fetch data from a URL
const fetchDataFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    // Determine which protocol to use based on the URL
    const client = url.startsWith('https') ? https : http;

    client.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return fetchDataFromUrl(response.headers.location).then(resolve).catch(reject);
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
    // URL to the JSON file on Google Drive
    const defaultUrl = 'https://drive.google.com/uc?export=download&id=1gFyvg1CjWjgBC9OQZe97A2me9BLki657';
    const dataUrl = process.env.YOUTUBE_DATA_URL || defaultUrl;

    console.log('Fetching YouTube data from Google Drive:', dataUrl);
    const data = await fetchDataFromUrl(dataUrl);
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
