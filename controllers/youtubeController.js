const express = require('express');
const router = express.Router();

// Sample YouTube videos data - you can replace these with your actual YouTube video IDs
const videos = [
  {
    id: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
    title: 'Elegant Opal Necklace Collection',
    description: 'Explore our stunning collection of handcrafted opal necklaces, featuring Australian opals set in 18k gold.',
    category: 'Necklaces'
  },
  {
    id: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
    title: 'Opal Ring Showcase',
    description: 'Discover our exquisite opal rings, each uniquely designed to highlight the natural beauty of these precious stones.',
    category: 'Rings'
  },
  {
    id: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
    title: 'Opal Earrings - New Arrivals',
    description: 'Check out our latest collection of opal earrings, featuring both classic and contemporary designs.',
    category: 'Earrings'
  },
  {
    id: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
    title: 'Custom Opal Jewelry Design Process',
    description: 'Watch our master craftsmen create custom opal jewelry pieces from concept to completion.',
    category: 'Custom Designs'
  },
  {
    id: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
    title: 'Care Tips for Your Opal Jewelry',
    description: 'Learn how to properly care for and maintain your precious opal jewelry to ensure its beauty lasts a lifetime.',
    category: 'Care Tips'
  },
  {
    id: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
    title: 'The Story of Ottawa Opal Shop',
    description: 'Discover the history and passion behind Ottawa Opal Shop and our commitment to quality craftsmanship.',
    category: 'About Us'
  }
];

router.get('/', (req, res) => {
  res.render('youtube', {
    title: 'Ottawa Opal Shop - YouTube Channel',
    active: 'youtube',
    videos: videos
  });
});

module.exports = router;
