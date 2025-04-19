const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('warranty', {
    title: 'Ottawa Opal Shop - Warranty',
    active: 'warranty'
  });
});

module.exports = router;
