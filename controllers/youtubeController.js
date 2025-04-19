const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

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

// Load YouTube data based on environment
const loadYoutubeData = () => {
  try {
    // Check if we're in a production-like environment
    const isProduction = process.env.NODE_ENV === 'production' ||
                        process.env.NETLIFY === 'true' ||
                        (typeof window !== 'undefined') || // Browser environment
                        process.env.VERCEL === '1'; // Vercel environment

    // For production environments, always use hardcoded data
    if (isProduction) {
      console.log('Production environment detected, using hardcoded data');
      return hardcodedYoutubeData;
    }

    // For local development, try to load from file
    const dataPath = path.join(__dirname, '../data/youtubeData.json');
    console.log('Development environment, loading from file:', dataPath);

    if (fs.existsSync(dataPath)) {
      const fileData = fs.readFileSync(dataPath, 'utf8');
      const parsedData = JSON.parse(fileData);
      console.log('Successfully loaded YouTube data from file');
      return parsedData;
    } else {
      console.log('YouTube data file not found, using hardcoded data');
      return hardcodedYoutubeData;
    }
  } catch (error) {
    console.error('Error loading YouTube data:', error);
    console.log('Falling back to hardcoded YouTube data');
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

router.get('/', (req, res) => {
  const youtubeData = loadYoutubeData();
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
    isProduction: isProduction,
    host: req.get('host') || 'unknown',
    url: req.originalUrl || 'unknown',
    timestamp: new Date().toISOString(),
    lastUpdated: youtubeData.lastUpdated || 'unknown'
  };

  res.render('youtube', {
    title: 'Ottawa Opal Shop - YouTube Channel',
    active: 'youtube',
    videos: processedVideos,
    channelId: youtubeData.channelId,
    debugInfo: JSON.stringify(debugInfo)
  });
});

module.exports = router;
