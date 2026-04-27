require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/products', productRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🛍️ Welcome to Shop Product Management API',
    version: '1.0.0',
    ui: 'http://localhost:5000/',
    endpoints: {
      getAllProducts: 'GET /api/products',
      getProductById: 'GET /api/products/:id',
      addNewProduct: 'POST /api/products',
      updateProduct: 'PUT /api/products/:id',
      sellProduct: 'PATCH /api/products/:id/sell',
      addStock: 'PATCH /api/products/:id/add-stock',
      deleteProduct: 'DELETE /api/products/:id',
      inventorySummary: 'GET /api/products/inventory/summary',
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route नहीं मिला',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server चल रहा है port ${PORT} पर`);
  console.log(`📝 API documentation: http://localhost:${PORT}/`);
});
