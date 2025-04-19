const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('about', {
    title: 'Dean Aaron Jewels - About Us',
    active: 'about'
  });
});

module.exports = router;
