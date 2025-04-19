const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('about', {
    title: 'Ottawa Opal Shop - About Us',
    active: 'about'
  });
});

module.exports = router;
