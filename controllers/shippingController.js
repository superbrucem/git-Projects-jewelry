const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('shipping', { 
    title: 'Dean Aaron Jewels - Shipping & Returns',
    active: 'shipping'
  });
});

module.exports = router;
