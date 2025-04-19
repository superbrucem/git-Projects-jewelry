const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const serverless = require('serverless-http');
const app = express();

// Set up static files directory
app.use(express.static('public'));

// Set up view engine
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Import routes
const homeRoutes = require('../../controllers/homeController');
const collectionsRoutes = require('../../controllers/collectionsController');
const newArrivalsRoutes = require('../../controllers/newArrivalsController');
const aboutRoutes = require('../../controllers/aboutController');
const contactRoutes = require('../../controllers/contactController');
const testimonialsRoutes = require('../../controllers/testimonialsController');
const faqRoutes = require('../../controllers/faqController');
const shippingRoutes = require('../../controllers/shippingController');
const productCareRoutes = require('../../controllers/productCareController');
const warrantyRoutes = require('../../controllers/warrantyController');
const privacyRoutes = require('../../controllers/privacyController');
const productRoutes = require('../../controllers/productController');

// Use routes
app.use('/', homeRoutes);
app.use('/collections', collectionsRoutes);
app.use('/new-arrivals', newArrivalsRoutes);
app.use('/about', aboutRoutes);
app.use('/contact', contactRoutes);
app.use('/testimonials', testimonialsRoutes);
app.use('/faq', faqRoutes);
app.use('/shipping', shippingRoutes);
app.use('/product-care', productCareRoutes);
app.use('/warranty', warrantyRoutes);
app.use('/privacy', privacyRoutes);
app.use('/product', productRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found', active: '' });
});

// Export handler for Netlify Functions
exports.handler = serverless(app);