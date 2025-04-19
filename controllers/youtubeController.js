const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Load YouTube data from JSON file
const loadYoutubeData = () => {
  try {
    const dataPath = path.join(__dirname, '../data/youtubeData.json');
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
