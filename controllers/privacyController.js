const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('privacy', { 
    title: 'Dean Aaron Jewels - Privacy Policy',
    active: 'privacy'
  });
});

module.exports = router;
