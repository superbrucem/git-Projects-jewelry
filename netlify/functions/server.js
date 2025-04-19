const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Your existing routes from app.js
app.use('/', homeRoutes);
app.use('/collections', collectionsRoutes);
// ... other routes

// Handle 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found', active: '' });
});

// Export handler for Netlify Functions
exports.handler = serverless(app);