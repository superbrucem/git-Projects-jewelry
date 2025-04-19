const express = require('express');
const path = require('path');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');
const serverless = require('serverless-http');
const app = express();

// Debug function to check if directory exists
function checkDirectoryExists(dirPath) {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch (error) {
    console.error(`Error checking directory ${dirPath}:`, error);
    return false;
  }
}

// Set up static files directory
app.use(express.static('public'));

// Set up view engine
const viewsPath = path.join(__dirname, '../../views');
console.log('Views path:', viewsPath);
console.log('Views directory exists:', checkDirectoryExists(viewsPath));

// List all files in the directory structure for debugging
const rootDir = path.join(__dirname, '../..');
console.log('Root directory exists:', checkDirectoryExists(rootDir));
try {
  const rootFiles = fs.readdirSync(rootDir);
  console.log('Root directory files:', rootFiles);

  if (rootFiles.includes('views')) {
    const viewsDir = path.join(rootDir, 'views');
    const viewsFiles = fs.readdirSync(viewsDir);
    console.log('Views directory files:', viewsFiles);
  }
} catch (error) {
  console.error('Error listing directory:', error);
}

app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Import routes with fallback handling
let homeRoutes, collectionsRoutes, newArrivalsRoutes, aboutRoutes, contactRoutes,
    testimonialsRoutes, faqRoutes, shippingRoutes, productCareRoutes, warrantyRoutes,
    privacyRoutes, productRoutes;

try {
  homeRoutes = require('../../controllers/homeController');
  collectionsRoutes = require('../../controllers/collectionsController');
  newArrivalsRoutes = require('../../controllers/newArrivalsController');
  aboutRoutes = require('../../controllers/aboutController');
  contactRoutes = require('../../controllers/contactController');
  testimonialsRoutes = require('../../controllers/testimonialsController');
  faqRoutes = require('../../controllers/faqController');
  shippingRoutes = require('../../controllers/shippingController');
  productCareRoutes = require('../../controllers/productCareController');
  warrantyRoutes = require('../../controllers/warrantyController');
  privacyRoutes = require('../../controllers/privacyController');
  productRoutes = require('../../controllers/productController');
  console.log('Successfully loaded all controllers');
} catch (error) {
  console.error('Error loading controllers:', error);
  // Load fallback home controller
  try {
    homeRoutes = require('./fallback-home');
    console.log('Loaded fallback home controller');
  } catch (fallbackError) {
    console.error('Error loading fallback home controller:', fallbackError);
    // Create a simple router as last resort
    const router = express.Router();
    router.get('/', (_req, res) => res.send('Server is running but controllers failed to load'));
    homeRoutes = router;
  }
}

// Create a fallback router for missing controllers
const createFallbackRouter = (routeName) => {
  const router = express.Router();
  router.get('/', (_req, res) => {
    res.send(`
      <html>
        <head>
          <title>Dean Aaron Jewels - ${routeName}</title>
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
              <h1>Dean Aaron Jewels</h1>
            </header>
            <div class="message">
              <h2>${routeName} Page</h2>
              <p>This section is currently unavailable.</p>
              <p><a href="/">Return to Home</a></p>
            </div>
          </div>
        </body>
      </html>
    `);
  });
  return router;
};

// Use routes with fallbacks for any missing controllers
app.use('/', homeRoutes);
app.use('/collections', collectionsRoutes || createFallbackRouter('Collections'));
app.use('/new-arrivals', newArrivalsRoutes || createFallbackRouter('New Arrivals'));
app.use('/about', aboutRoutes || createFallbackRouter('About'));
app.use('/contact', contactRoutes || createFallbackRouter('Contact'));
app.use('/testimonials', testimonialsRoutes || createFallbackRouter('Testimonials'));
app.use('/faq', faqRoutes || createFallbackRouter('FAQ'));
app.use('/shipping', shippingRoutes || createFallbackRouter('Shipping & Returns'));
app.use('/product-care', productCareRoutes || createFallbackRouter('Product Care'));
app.use('/warranty', warrantyRoutes || createFallbackRouter('Warranty'));
app.use('/privacy', privacyRoutes || createFallbackRouter('Privacy Policy'));
app.use('/product', productRoutes || createFallbackRouter('Product'));

// Handle 404
app.use((_req, res) => {
  res.status(404).render('404', { title: 'Page Not Found', active: '' });
});

// Add error handler for view rendering issues
app.use((err, _req, res, next) => {
  console.error('Server error:', err);
  if (err.message.includes('Failed to lookup view')) {
    return res.status(500).send(`
      <html>
        <head><title>Error</title></head>
        <body>
          <h1>View Rendering Error</h1>
          <p>There was an error rendering the view. Please check the server logs.</p>
          <pre>${err.message}</pre>
        </body>
      </html>
    `);
  }
  next(err);
});

// Export handler for Netlify Functions
exports.handler = serverless(app);