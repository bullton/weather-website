// Current Weather Component
// Displays current weather information for a city

import React from 'react';
import { Card, Typography, Row, Col, Tooltip } from 'antd';
import {
  ThermometerOutlined,
  EyeOutlined,
  CloudOutlined,
  SunriseOutlined,
  SunsetOutlined
} from '@ant-design/icons';
import WeatherIcon from './WeatherIcon';
import './CurrentWeather.css';

const { Title, Text } = Typography;

// Use weather emoji icons instead of missing Ant Design icons
const DropletOutlined = () => <span style={{fontSize: '1.5rem'}}>💧</span>;
const WindOutlined = () => <span style={{fontSize: '1.5rem'}}>💨</span>;

function CurrentWeather({ data }) {
  if (!data) return null;

  const {
    city,
    country,
    temperature,
    feelsLike,
    humidity,
    windSpeed,
    description,
    icon,
    visibility,
    cloudiness,
    sunrise,
    sunset
  } = data;

  const weatherDetails = [
    {
      icon: <ThermometerOutlined />,
      label: 'Feels Like',
      value: `${feelsLike}°C`,
      tooltip: 'Temperature feels like'
    },
    {
      icon: <DropletOutlined />,
      label: 'Humidity',
      value: `${humidity}%`,
      tooltip: 'Relative humidity'
    },
    {
      icon: <WindOutlined />,
      label: 'Wind Speed',
      value: `${windSpeed} m/s`,
      tooltip: 'Wind speed'
    },
    {
      icon: <EyeOutlined />,
      label: 'Visibility',
      value: `${visibility} km`,
      tooltip: 'Visibility distance'
    },
    {
      icon: <CloudOutlined />,
      label: 'Cloudiness',
      value: `${cloudiness}%`,
      tooltip: 'Cloud coverage'
    },
    {
      icon: <SunriseOutlined />,
      label: 'Sunrise',
      value: sunrise,
      tooltip: 'Sunrise time'
    },
    {
      icon: <SunsetOutlined />,
      label: 'Sunset',
      value: sunset,
      tooltip: 'Sunset time'
    }
  ];

  return (
    <div className="current-weather-card">
      <div className="current-weather-header">
        <Title level={2} style={{ margin: 0, color: '#333' }}>
          {city}, {country}
        </Title>
      </div>

      <div className="weather-main">
        <div className="weather-icon-container">
          <WeatherIcon iconCode={icon} size={120} />
        </div>
        <div className="weather-temp-container">
          <Text className="weather-temp">{temperature}°C</Text>
          <Text className="weather-description">{description}</Text>
        </div>
      </div>

      <Row gutter={[16, 16]} className="weather-details-grid">
        {weatherDetails.map((detail, index) => (
          <Col xs={12} sm={8} md={6} lg={4} key={index}>
            <Tooltip title={detail.tooltip}>
              <div className="weather-detail-item">
                <Text type="secondary" className="detail-icon">
                  {detail.icon}
                </Text>
                <Text className="detail-label">{detail.label}</Text>
                <Text strong className="detail-value">
                  {detail.value}
                </Text>
              </div>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CurrentWeather;
