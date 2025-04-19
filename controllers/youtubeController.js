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
  channelId: "YOUR_CHANNEL_ID"
};

// Load YouTube data from JSON file with fallback to hardcoded data
const loadYoutubeData = () => {
  try {
    // Check if we're in a Netlify environment
    const isNetlify = process.env.NETLIFY === 'true';
    console.log('Is Netlify environment:', isNetlify);

    // If we're in Netlify, use the hardcoded data
    if (isNetlify) {
      console.log('Using hardcoded YouTube data for Netlify environment');
      return hardcodedYoutubeData;
    }

    // For local development, try to load from file
    const dataPath = path.join(__dirname, '../data/youtubeData.json');
    console.log('Attempting to load YouTube data from:', dataPath);

    if (fs.existsSync(dataPath)) {
      const fileData = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(fileData);
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

  res.render('youtube', {
    title: 'Ottawa Opal Shop - YouTube Channel',
    active: 'youtube',
    videos: processedVideos,
    channelId: youtubeData.channelId
  });
});

module.exports = router;
