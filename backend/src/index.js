// Weather Backend - Main Entry Point
// Express server for weather API

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const weatherRoutes = require('./routes/weatherRoutes');

// Create Express app
const app = express();

// Middleware configuration
// Allow all origins for development
app.use(cors({
  origin: true,
  methods: ['GET'],
  credentials: true
}));

// JSON parsing
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per window
  message: {
    success: false,
    error: 'Too many requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', limiter);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/weather', weatherRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Weather API',
    version: '1.0.0',
    endpoints: {
      current: '/api/weather/current/{city}',
      forecast: '/api/weather/forecast/{city}',
      search: '/api/weather/search/{query}',
      health: '/api/weather/health'
    },
    documentation: 'https://openweathermap.org/api'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║           Weather Backend Server Started              ║
╠═══════════════════════════════════════════════════════╣
║  Server running at: http://localhost:${PORT}             ║
║  API endpoints:                                         ║
║    - GET /api/weather/current/{city}                   ║
║    - GET /api/weather/forecast/{city}                 ║
║    - GET /api/weather/search/{query}                  ║
║    - GET /api/weather/health                          ║
╚═══════════════════════════════════════════════════════╝
  `);
  
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey || apiKey === 'your_api_key_here') {
    console.log('⚠️  IMPORTANT: Please set your OpenWeatherMap API key in the .env file');
    console.log('   Get your free API key from: https://openweathermap.org/api');
  } else {
    console.log('✅ API Key configured');
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

module.exports = app;
