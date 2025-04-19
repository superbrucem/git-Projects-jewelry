const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('warranty', { 
    title: 'Dean Aaron Jewels - Warranty',
    active: 'warranty'
  });
});

module.exports = router;
