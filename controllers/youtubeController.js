const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

// Hardcoded YouTube data as fallback for production environment
const hardcodedYoutubeData = {
  videos: [
    {
      id: "dxI_a0Azp10",
      title: "Elegant Opal Necklace Collection",
      description: "Explore our stunning collection of handcrafted opal necklaces, featuring Australian opals set in 18k gold.",
      category: "Necklaces",
      enabled: true,
      order: 3
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Opal Ring Showcase",
      description: "Discover our exquisite opal rings, each uniquely designed to highlight the natural beauty of these precious stones.",
      category: "Rings",
      enabled: true,
      order: 2
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Opal Earrings - New Arrivals",
      description: "Check out our latest collection of opal earrings, featuring both classic and contemporary designs.",
      category: "Earrings",
      enabled: true,
      order: 1
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Custom Opal Jewelry Design Process",
      description: "Watch our master craftsmen create custom opal jewelry pieces from concept to completion.",
      category: "Custom Designs",
      enabled: false,
      order: 6
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Care Tips for Your Opal Jewelry",
      description: "Learn how to properly care for and maintain your precious opal jewelry to ensure its beauty lasts a lifetime.",
      category: "Care Tips",
      enabled: true,
      order: 5
    },
    {
      id: "dQw4w9WgXcQ",
      title: "The Story of Ottawa Opal Shop",
      description: "Discover the history and passion behind Ottawa Opal Shop and our commitment to quality craftsmanship.",
      category: "About Us",
      enabled: true,
      order: 4
    }
  ],
  channelId: "YOUR_CHANNEL_ID",
  source: "hardcoded-fallback",
  lastUpdated: "2023-04-19"
};

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

// Load YouTube data from various sources
const loadYoutubeData = async () => {
  try {
    // URL to the JSON file on Google Drive or other cloud storage
    // Replace this with your actual URL when you have it
    const dataUrl = process.env.YOUTUBE_DATA_URL || 'https://example.com/youtubeData.json';

    // Try to fetch from URL first
    try {
      console.log('Attempting to fetch YouTube data from URL:', dataUrl);
      const data = await fetchDataFromUrl(dataUrl);
      console.log('Successfully fetched YouTube data from URL');
      return data;
    } catch (urlError) {
      console.error('Error fetching from URL:', urlError.message);

      // If URL fetch fails, try local file (for development)
      if (process.env.NODE_ENV !== 'production') {
        try {
          const dataPath = path.join(__dirname, '../data/youtubeData.json');
          console.log('Trying local file:', dataPath);

          if (fs.existsSync(dataPath)) {
            const fileData = fs.readFileSync(dataPath, 'utf8');
            const parsedData = JSON.parse(fileData);
            console.log('Successfully loaded YouTube data from local file');
            return parsedData;
          }
        } catch (fileError) {
          console.error('Error reading local file:', fileError.message);
        }
      }

      // If all else fails, use hardcoded data
      console.log('Using hardcoded fallback data');
      return hardcodedYoutubeData;
    }
  } catch (error) {
    console.error('Error in loadYoutubeData:', error.message);
    return hardcodedYoutubeData;
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

    // Check if we're in a production-like environment
    const isProduction = process.env.NODE_ENV === 'production' ||
                        process.env.NETLIFY === 'true' ||
                        process.env.VERCEL === '1';

    // Create debug information to pass to the client
    const debugInfo = {
      videosCount: processedVideos.length,
      dataSource: youtubeData.source || 'unknown',
      environment: isProduction ? 'production' : 'development',
      host: req.get('host') || 'unknown',
      url: req.originalUrl || 'unknown',
      timestamp: new Date().toISOString(),
      lastUpdated: youtubeData.lastUpdated || 'unknown',
      dataUrl: process.env.YOUTUBE_DATA_URL || 'not set'
    };

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
