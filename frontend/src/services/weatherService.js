// Weather API Service
// Handles all API calls to the backend weather service

import axios from 'axios';

// API base URL - configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance for weather API
const weatherApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for logging
weatherApi.interceptors.request.use(
  (config) => {
    console.log(`[Weather API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
weatherApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.error || error.message || 'Unknown error';
    console.error('[Weather API Error]', message);
    return Promise.reject(new Error(message));
  }
);

/**
 * Fetch current weather for a city
 * @param {string} city - City name
 * @returns {Promise} Current weather data
 */
export const fetchWeather = async (city) => {
  const response = await weatherApi.get(`/weather/current/${encodeURIComponent(city)}`);
  return response.data;
};

/**
 * Fetch weather forecast for a city
 * @param {string} city - City name
 * @returns {Promise} Forecast data
 */
export const fetchForecast = async (city) => {
  const response = await weatherApi.get(`/weather/forecast/${encodeURIComponent(city)}`);
  return response.data;
};

/**
 * Search for cities
 * @param {string} query - Search query
 * @returns {Promise} List of matching cities
 */
export const searchCities = async (query) => {
  const response = await weatherApi.get(`/weather/search/${encodeURIComponent(query)}`);
  return response.data;
};

/**
 * Check API health
 * @returns {Promise} Health status
 */
export const checkHealth = async () => {
  const response = await weatherApi.get('/weather/health');
  return response.data;
};

export default weatherApi;
