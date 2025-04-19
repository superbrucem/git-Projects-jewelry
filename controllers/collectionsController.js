const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('collections', {
    title: 'Ottawa Opal Shop - Collections',
    active: 'collections'
  });
});

module.exports = router;
