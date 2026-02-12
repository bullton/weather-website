// Forecast Weather Component
// Displays 5-day weather forecast

import React from 'react';
import { Typography, Tooltip } from 'antd';
import WeatherIcon from './WeatherIcon';
import dayjs from 'dayjs';
import './ForecastWeather.css';

const { Title, Text } = Typography;

// Use weather emoji icons instead of missing Ant Design icons
const CalendarOutlined = () => <span>📅</span>;
const DropletOutlined = () => <span>💧</span>;
const WindOutlined = () => <span>💨</span>;

function ForecastWeather({ data }) {
  if (!data || !data.forecast) return null;

  const { city, country, forecast } = data;

  // Format date for display
  const formatDate = (dateString) => {
    const date = dayjs(dateString);
    return {
      day: date.format('ddd'), // Day name (Mon, Tue, etc.)
      fullDate: date.format('MMM D'), // Month and day (Jan 15)
      dateObj: date
    };
  };

  // Get day name for today
  const getDayName = (dateString) => {
    const formatted = formatDate(dateString);
    const today = dayjs();
    
    if (formatted.dateObj.isSame(today, 'day')) {
      return 'Today';
    }
    return formatted.day;
  };

  return (
    <div className="forecast-weather-card">
      <div className="forecast-header">
        <Title level={3} style={{ margin: 0, color: '#333' }}>
          <CalendarOutlined /> 5-Day Forecast
        </Title>
        <Text type="secondary" className="forecast-location">
          {city}, {country}
        </Text>
      </div>

      <div className="forecast-grid">
        {forecast.slice(0, 5).map((day, index) => {
          const { date, tempMax, tempMin, icon, description, humidity, windSpeed } = day;
          const dayName = getDayName(date);

          return (
            <Tooltip 
              key={index}
              title={
                <div>
                  <div><strong>{description}</strong></div>
                  <div>Humidity: {humidity}%</div>
                  <div>Wind: {windSpeed} m/s</div>
                </div>
              }
            >
              <div className="forecast-card">
                <Text className="forecast-day">{dayName}</Text>
                <Text className="forecast-date">{formatDate(date).fullDate}</Text>
                
                <div className="forecast-icon-container">
                  <WeatherIcon iconCode={icon} size={60} />
                </div>
                
                <div className="forecast-temps">
                  <Text strong className="forecast-temp forecast-temp-high">
                    {tempMax}°
                  </Text>
                  <Text className="forecast-temp forecast-temp-low">
                    {tempMin}°
                  </Text>
                </div>
                
                <div className="forecast-details">
                  <Text type="secondary" className="forecast-detail">
                    <DropletOutlined /> {humidity}%
                  </Text>
                  <Text type="secondary" className="forecast-detail">
                    <WindOutlined /> {windSpeed}m/s
                  </Text>
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastWeather;
