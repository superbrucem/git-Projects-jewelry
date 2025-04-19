const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('faq', {
    title: 'Ottawa Opal Shop - FAQ',
    active: 'faq'
  });
});

module.exports = router;
