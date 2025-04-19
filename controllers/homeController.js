const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Ottawa Opal Shop - Home',
    active: 'home'
  });
});

module.exports = router;
