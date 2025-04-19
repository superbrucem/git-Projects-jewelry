const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('faq', { 
    title: 'Dean Aaron Jewels - FAQ',
    active: 'faq'
  });
});

module.exports = router;
