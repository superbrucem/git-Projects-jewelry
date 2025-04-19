const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact', {
    title: 'Dean Aaron Jewels - Contact Us',
    active: 'contact'
  });
});

module.exports = router;
