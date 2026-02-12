// OpenWeatherMap API Service
// Handles all communication with OpenWeatherMap API

const axios = require('axios');
const apiConfig = require('../config/apiConfig');

class OpenWeatherMapService {
  constructor() {
    this.apiKey = apiConfig.openWeatherMap.apiKey;
    this.baseUrl = {
      current: apiConfig.openWeatherMap.current,
      forecast: apiConfig.openWeatherMap.forecast
    };
    this.timeout = apiConfig.openWeatherMap.timeout;
    this.units = apiConfig.openWeatherMap.units;
  }

  /**
   * Make API request to OpenWeatherMap
   * @param {string} url - API endpoint URL
   * @param {object} params - Query parameters
   * @returns {object} API response data
   */
  async makeRequest(url, params) {
    try {
      const response = await axios.get(url, {
        params: {
          ...params,
          appid: this.apiKey,
          units: this.units
        },
        timeout: this.timeout
      });

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handle API errors
   * @param {object} error - Axios error object
   * @throws {Error} Custom error with appropriate message
   */
  handleError(error) {
    if (error.response) {
      // API returned error status
      const status = error.response.status;
      
      switch (status) {
        case 401:
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        case 404:
          throw new Error('City not found. Please check the city name and try again.');
        case 429:
          throw new Error('Too many requests. Please wait a moment and try again.');
        default:
          throw new Error(`API error (${status}): ${error.response.data.message || 'Unknown error'}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Unable to connect to weather service. Please check your internet connection.');
    } else {
      // Error in request setup
      throw new Error(`Request error: ${error.message}`);
    }
  }

  /**
   * Get current weather for a city
   * @param {string} city - City name or ID
   * @returns {object} Current weather data
   */
  async getCurrentWeather(city) {
    if (!this.apiKey || this.apiKey === 'your_api_key_here') {
      throw new Error('API key not configured. Please set your OpenWeatherMap API key in the .env file.');
    }

    const data = await this.makeRequest(this.baseUrl.current, {
      q: city
    });

    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      description: data.weather[0].description,
      weatherCode: data.weather[0].id,
      icon: data.weather[0].icon,
      visibility: data.visibility / 1000, // Convert to km
      cloudiness: data.clouds.all,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get 5-day / 3-hour forecast for a city
   * @param {string} city - City name or ID
   * @returns {object} Forecast data with daily summaries
   */
  async getForecast(city) {
    if (!this.apiKey || this.apiKey === 'your_api_key_here') {
      throw new Error('API key not configured. Please set your OpenWeatherMap API key in the .env file.');
    }

    const data = await this.makeRequest(this.baseUrl.forecast, {
      q: city
    });

    // Group forecast data by day and get daily summaries
    const dailyForecasts = this.processForecastData(data.list);

    return {
      city: data.city.name,
      country: data.city.country,
      forecast: dailyForecasts,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Process raw forecast data into daily summaries
   * @param {Array} forecastList - Raw forecast list from API
   * @returns {Array} Processed daily forecast data
   */
  processForecastData(forecastList) {
    const dailyData = {};

    forecastList.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      
      if (!dailyData[date]) {
        dailyData[date] = {
          date: date,
          temps: [],
          icons: [],
          descriptions: [],
          weatherCodes: [],
          humidity: [],
          windSpeed: []
        };
      }

      dailyData[date].temps.push(forecast.main.temp);
      dailyData[date].icons.push(forecast.weather[0].icon);
      dailyData[date].descriptions.push(forecast.weather[0].description);
      dailyData[date].weatherCodes.push(forecast.weather[0].id);
      dailyData[date].humidity.push(forecast.main.humidity);
      dailyData[date].windSpeed.push(forecast.wind.speed);
    });

    // Convert to array and calculate daily averages
    return Object.values(dailyData).map(day => {
      // Get the most common icon and description
      const iconCounts = {};
      const descCounts = {};
      
      day.icons.forEach(icon => iconCounts[icon] = (iconCounts[icon] || 0) + 1);
      day.descriptions.forEach(desc => descCounts[desc] = (descCounts[desc] || 0) + 1);

      const mostCommonIcon = Object.entries(iconCounts)
        .sort(([,a], [,b]) => b - a)[0][0];
      
      const mostCommonDesc = Object.entries(descCounts)
        .sort(([,a], [,b]) => b - a)[0][0];

      // Get the first weather code for the most common icon
      const mainWeatherCode = day.weatherCodes[day.icons.indexOf(mostCommonIcon)];

      return {
        date: day.date,
        tempMax: Math.round(Math.max(...day.temps)),
        tempMin: Math.round(Math.min(...day.temps)),
        tempAvg: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
        icon: mostCommonIcon,
        description: mostCommonDesc,
        weatherCode: mainWeatherCode,
        humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
        windSpeed: Math.round(day.windSpeed.reduce((a, b) => a + b, 0) / day.windSpeed.length * 10) / 10
      };
    });
  }

  /**
   * Validate if API key is working
   * @returns {boolean} True if API key is valid
   */
  async validateApiKey() {
    try {
      await this.makeRequest(this.baseUrl.current, {
        q: 'London',
        cnt: 1
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Export service instance
module.exports = new OpenWeatherMapService();
