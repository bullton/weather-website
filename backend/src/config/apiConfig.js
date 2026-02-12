// API Configuration for OpenWeatherMap
// Get your free API key from: https://openweathermap.org/api

const apiConfig = {
  // OpenWeatherMap API Settings
  openWeatherMap: {
    // Base URLs for different API endpoints
    current: process.env.OPENWEATHER_CURRENT_URL || 'http://api.openweathermap.org/data/2.5/weather',
    forecast: process.env.OPENWEATHER_FORECAST_URL || 'http://api.openweathermap.org/data/2.5/forecast',
    
    // Your API key - get from https://openweathermap.org/api
    apiKey: process.env.OPENWEATHER_API_KEY || '',
    
    // Units of measurement (standard, metric, imperial)
    units: 'metric',
    
    // API request timeout
    timeout: parseInt(process.env.API_TIMEOUT) || 10000
  },

  // Rate limiting settings
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },

  // Server configuration
  server: {
    port: parseInt(process.env.PORT) || 3001,
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
  },

  // Weather icon URL template
  iconUrl: (iconCode) => `http://openweathermap.org/img/wn/${iconCode}@2x.png`
};

module.exports = apiConfig;
