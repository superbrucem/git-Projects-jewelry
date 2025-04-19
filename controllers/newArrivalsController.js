const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('new-arrivals', {
    title: 'Dean Aaron Jewels - New Arrivals',
    active: 'new-arrivals'
  });
});

module.exports = router;
