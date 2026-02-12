// Main App Component
import React, { useState } from 'react';
import { Layout, Typography, Spin, Alert, Row, Col } from 'antd';
import CitySearch from './components/CitySearch';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';
import { fetchWeather, fetchForecast } from './services/weatherService';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastCity, setLastCity] = useState('');

  const handleSearch = async (city) => {
    if (!city.trim()) return;
    
    setLastCity(city);
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city)
      ]);
      
      setWeather(weatherData.data);
      setForecast(forecastData.data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const clearWeather = () => {
    setWeather(null);
    setForecast(null);
    setError(null);
    setLastCity('');
  };

  return (
    <Layout className="app-container">
      <Header className="app-header">
        <Title level={1} style={{ color: 'white', margin: 0 }}>
          🌤️ Weather App
        </Title>
        <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
          Real-time weather updates and 5-day forecasts
        </Text>
      </Header>

      <Content>
        <div className="search-container">
          <CitySearch 
            onSearch={handleSearch} 
            onClear={clearWeather}
            loading={loading}
          />
        </div>

        {loading && (
          <div className="loading-container">
            <Spin size="large" />
            <Text style={{ display: 'block', marginTop: 16, color: 'white' }}>
              Loading weather data for {lastCity || '...'}...
            </Text>
          </div>
        )}

        {error && (
          <div className="error-container" style={{ maxWidth: 600, margin: '0 auto' }}>
            <Alert
              type="error"
              message="Weather Error"
              description={error}
              showIcon
              closable
              onClose={() => setError(null)}
            />
          </div>
        )}

        {weather && !loading && !error && (
          <div className="weather-content fade-in">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <CurrentWeather data={weather} />
              </Col>
              <Col xs={24} lg={12}>
                <ForecastWeather data={forecast} />
              </Col>
            </Row>
          </div>
        )}

        {!weather && !loading && !error && (
          <div className="loading-container" style={{ color: 'white' }}>
            <Title level={3} style={{ color: 'white' }}>
              🔍 Search for a city
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
              Enter a city name to get real-time weather information
            </Text>
          </div>
        )}
      </Content>

      <Footer style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
        <Text style={{ color: 'rgba(255,255,255,0.6)' }}>
          Powered by OpenWeatherMap API | Built with React + Ant Design
        </Text>
      </Footer>
    </Layout>
  );
}

export default App;
