const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('collections', {
    title: 'Dean Aaron Jewels - Collections',
    active: 'collections'
  });
});

module.exports = router;
