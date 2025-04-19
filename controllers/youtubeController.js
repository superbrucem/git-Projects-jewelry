const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Load YouTube data from JSON file
const loadYoutubeData = () => {
  try {
    const dataPath = path.join(__dirname, '../data/youtubeData.json');

    // Debug: Check if data directory and file exist
    const dataDir = path.join(__dirname, '../data');
    console.log('Data directory exists:', fs.existsSync(dataDir));
    console.log('Data file path:', dataPath);
    console.log('Data file exists:', fs.existsSync(dataPath));

    // If data directory doesn't exist, try to create it
    if (!fs.existsSync(dataDir)) {
      console.log('Creating data directory...');
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Check if file exists after ensuring directory exists
    if (!fs.existsSync(dataPath)) {
      console.error('YouTube data file not found even after creating directory');

      // Create a default data file if it doesn't exist
      console.log('Creating default YouTube data file...');
      const defaultData = {
        videos: [
          {
            id: 'dQw4w9WgXcQ',
            title: 'Elegant Opal Necklace Collection',
            description: 'Explore our stunning collection of handcrafted opal necklaces.',
            category: 'Necklaces',
            enabled: true,
            order: 1
          },
          {
            id: 'dQw4w9WgXcQ',
            title: 'Opal Ring Showcase',
            description: 'Discover our exquisite opal rings.',
            category: 'Rings',
            enabled: true,
            order: 2
          }
        ],
        channelId: 'YOUR_CHANNEL_ID'
      };

      fs.writeFileSync(dataPath, JSON.stringify(defaultData, null, 2), 'utf8');
      return defaultData;
    }

    const fileData = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error loading YouTube data:', error);
    return { videos: [] };
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
