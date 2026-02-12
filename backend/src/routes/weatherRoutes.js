// Weather API Routes
// Handles all weather-related API endpoints

const express = require('express');
const openWeatherMapService = require('../services/openWeatherMapService');

const router = express.Router();

/**
 * GET /api/weather/current/:city
 * Get current weather for a specific city
 * @route GET /api/weather/current/:city
 * @param {string} city - City name (URL parameter)
 * @returns {object} Current weather data
 */
router.get('/current/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    if (!city || city.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'City name is required'
      });
    }

    const weatherData = await openWeatherMapService.getCurrentWeather(city);
    
    res.json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    res.status(error.message.includes('not found') ? 404 : 500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/weather/current
 * Get current weather for a city (query parameter)
 * @route GET /api/weather/current
 * @param {string} city - City name (query parameter)
 * @returns {object} Current weather data
 */
router.get('/current', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city || city.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'City name is required as query parameter'
      });
    }

    const weatherData = await openWeatherMapService.getCurrentWeather(city);
    
    res.json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    res.status(error.message.includes('not found') ? 404 : 500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/weather/forecast/:city
 * Get 5-day forecast for a specific city
 * @route GET /api/weather/forecast/:city
 * @param {string} city - City name (URL parameter)
 * @returns {object} Forecast data
 */
router.get('/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    if (!city || city.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'City name is required'
      });
    }

    const forecastData = await openWeatherMapService.getForecast(city);
    
    res.json({
      success: true,
      data: forecastData
    });
  } catch (error) {
    res.status(error.message.includes('not found') ? 404 : 500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/weather/forecast
 * Get 5-day forecast for a city (query parameter)
 * @route GET /api/weather/forecast
 * @param {string} city - City name (query parameter)
 * @returns {object} Forecast data
 */
router.get('/forecast', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city || city.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'City name is required as query parameter'
      });
    }

    const forecastData = await openWeatherMapService.getForecast(city);
    
    res.json({
      success: true,
      data: forecastData
    });
  } catch (error) {
    res.status(error.message.includes('not found') ? 404 : 500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/weather/search/:query
 * Search for cities (basic implementation)
 * @route GET /api/weather/search/:query
 * @param {string} query - Search query
 * @returns {Array} List of matching cities
 */
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    
    if (!query || query.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Search query must be at least 2 characters'
      });
    }

    // Note: OpenWeatherMap has a separate Geo API for city search
    // This is a simplified version using current weather API
    // For production, use: http://api.openweathermap.org/geo/1.0/direct
    
    // Return popular cities for demo
    const popularCities = [
      { name: 'Beijing', country: 'CN', lat: 39.9042, lon: 116.4074 },
      { name: 'Shanghai', country: 'CN', lat: 31.2304, lon: 121.4737 },
      { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
      { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
      { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
      { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
      { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
      { name: 'Moscow', country: 'RU', lat: 55.7558, lon: 37.6173 },
      { name: 'Hong Kong', country: 'HK', lat: 22.3193, lon: 114.1694 },
      { name: 'Singapore', country: 'SG', lat: 1.3521, lon: 103.8198 }
    ];

    // Filter cities based on query
    const filteredCities = popularCities.filter(city => 
      city.name.toLowerCase().includes(query.toLowerCase())
    );

    res.json({
      success: true,
      data: filteredCities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/weather/health
 * Health check endpoint
 * @route GET /api/weather/health
 * @returns {object} Health status
 */
router.get('/health', async (req, res) => {
  try {
    const apiKeyValid = await openWeatherMapService.validateApiKey();
    
    res.json({
      success: true,
      status: 'healthy',
      apiKeyConfigured: apiKeyValid
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 'unhealthy',
      error: error.message
    });
  }
});

module.exports = router;
