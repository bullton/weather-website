// Weather Icon Component
// Displays weather icons based on OpenWeatherMap icon codes

import React from 'react';
import './WeatherIcon.css';

// OpenWeatherMap icon code mappings
const iconMappings = {
  // Clear sky
  '01d': { emoji: '☀️', name: 'Clear Sky (Day)', bgColor: '#FFD93D' },
  '01n': { emoji: '🌙', name: 'Clear Sky (Night)', bgColor: '#1A1A2E' },
  
  // Few clouds
  '02d': { emoji: '⛅', name: 'Few Clouds (Day)', bgColor: '#74B9FF' },
  '02n': { emoji: '☁️', name: 'Few Clouds (Night)', bgColor: '#636E72' },
  
  // Scattered clouds
  '03d': { emoji: '☁️', name: 'Scattered Clouds', bgColor: '#B2BEC3' },
  '03n': { emoji: '☁️', name: 'Scattered Clouds', bgColor: '#636E72' },
  
  // Broken clouds
  '04d': { emoji: '☁️', name: 'Broken Clouds', bgColor: '#B2BEC3' },
  '04n': { emoji: '☁️', name: 'Broken Clouds', bgColor: '#636E72' },
  
  // Shower rain
  '09d': { emoji: '🌧️', name: 'Shower Rain', bgColor: '#74B9FF' },
  '09n': { emoji: '🌧️', name: 'Shower Rain', bgColor: '#636E72' },
  
  // Rain
  '10d': { emoji: '🌦️', name: 'Rain (Day)', bgColor: '#74B9FF' },
  '10n': { emoji: '🌧️', name: 'Rain (Night)', bgColor: '#636E72' },
  
  // Thunderstorm
  '11d': { emoji: '⛈️', name: 'Thunderstorm', bgColor: '#2D3436' },
  '11n': { emoji: '⛈️', name: 'Thunderstorm', bgColor: '#2D3436' },
  
  // Snow
  '13d': { emoji: '❄️', name: 'Snow', bgColor: '#DFE6E9' },
  '13n': { emoji: '❄️', name: 'Snow', bgColor: '#B2BEC3' },
  
  // Mist
  '50d': { emoji: '🌫️', name: 'Mist', bgColor: '#B2BEC3' },
  '50n': { emoji: '🌫️', name: 'Mist', bgColor: '#636E72' }
};

function WeatherIcon({ iconCode, size = 60, showLabel = false, className = '' }) {
  // Default icon if code not found
  const defaultIcon = { emoji: '🌤️', name: 'Unknown Weather', bgColor: '#74B9FF' };
  
  const iconData = iconMappings[iconCode] || defaultIcon;
  
  // Calculate icon size based on props
  const iconStyle = {
    fontSize: `${size}px`,
    lineHeight: 1
  };

  return (
    <div 
      className={`weather-icon-wrapper ${className}`}
      style={{ backgroundColor: iconData.bgColor }}
      title={iconData.name}
    >
      <span className="weather-icon-emoji" style={iconStyle}>
        {iconData.emoji}
      </span>
      {showLabel && (
        <span className="weather-icon-label">{iconData.name}</span>
      )}
    </div>
  );
}

export default WeatherIcon;
