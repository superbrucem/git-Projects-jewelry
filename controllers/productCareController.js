const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('product-care', { 
    title: 'Dean Aaron Jewels - Product Care',
    active: 'product-care'
  });
});

module.exports = router;
