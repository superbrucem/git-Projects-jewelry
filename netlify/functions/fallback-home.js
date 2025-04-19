// This is a fallback home controller in case the original one fails
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    res.send(`
      <html>
        <head>
          <title>Ottawa Opal Shop - Fallback Home</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }
            .container { max-width: 1200px; margin: 0 auto; }
            header { text-align: center; margin-bottom: 30px; }
            h1 { color: #ffcccc; }
            .message { background-color: #f8f8f8; padding: 20px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <header>
              <h1>Ottawa Opal Shop</h1>
            </header>
            <div class="message">
              <h2>Welcome to our Jewelry Store</h2>
              <p>This is a fallback page. The main site is currently experiencing technical difficulties.</p>
              <p>Please check back later or contact us at support@ottawaopalshop.com</p>
            </div>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error in fallback home:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
