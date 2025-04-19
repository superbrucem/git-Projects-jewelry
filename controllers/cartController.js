const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('cart', {
    title: 'Ottawa Opal Shop - Shopping Cart',
    active: 'cart'
  });
});

module.exports = router;
