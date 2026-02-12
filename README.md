# 🌤️ Weather Website

A modern weather application built with React + Node.js, featuring real-time weather updates and 5-day forecasts powered by OpenWeatherMap API.

## 🚀 Features

- **Real-time Weather**: Get current weather conditions for any city worldwide
- **5-Day Forecast**: View detailed weather predictions for the next 5 days
- **City Search**: Search for cities with autocomplete functionality
- **Responsive Design**: Beautiful UI that works on desktop and mobile devices
- **Modern Tech Stack**: Built with React 18, Ant Design, and Express.js

## 📁 Project Structure

```
weather-website/
├── backend/                 # Node.js Express API server
│   ├── src/
│   │   ├── config/         # API configuration
│   │   ├── routes/         # API routes
│   │   ├── services/       # OpenWeatherMap integration
│   │   └── index.js        # Server entry point
│   ├── .env                # Environment variables
│   └── package.json
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── CitySearch.jsx
│   │   │   ├── CurrentWeather.jsx
│   │   │   ├── ForecastWeather.jsx
│   │   │   └── WeatherIcon.jsx
│   │   ├── services/       # API service
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (free from [openweathermap.org](https://openweathermap.org/api))

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd weather-website/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your API key:
   ```bash
   # Edit .env file and add your OpenWeatherMap API key
   OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run at `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd weather-website/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:5173`

## 🔧 Configuration

### Backend (.env)

```env
PORT=3001
OPENWEATHER_API_KEY=your_api_key_here
OPENWEATHER_CURRENT_URL=http://api.openweathermap.org/data/2.5/weather
OPENWEATHER_FORECAST_URL=http://api.openweathermap.org/data/2.5/forecast
API_TIMEOUT=10000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3001/api
```

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/weather/current/:city` | GET | Get current weather |
| `/api/weather/forecast/:city` | GET | Get 5-day forecast |
| `/api/weather/search/:query` | GET | Search cities |
| `/api/weather/health` | GET | API health check |

### Example Responses

**Current Weather:**
```json
{
  "success": true,
  "data": {
    "city": "Beijing",
    "country": "CN",
    "temperature": 22,
    "feelsLike": 24,
    "humidity": 65,
    "windSpeed": 3.5,
    "description": "clear sky",
    "icon": "01d"
  }
}
```

**Forecast:**
```json
{
  "success": true,
  "data": {
    "city": "Beijing",
    "forecast": [
      {
        "date": "2024-01-15",
        "tempMax": 25,
        "tempMin": 15,
        "icon": "01d",
        "description": "clear sky"
      }
    ]
  }
}
```

## 🎨 Technologies Used

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Ant Design** - UI component library
- **Axios** - HTTP client
- **Day.js** - Date formatting
- **CSS3** - Modern styling with animations

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Axios** - HTTP client for API calls
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **express-rate-limit** - Rate limiting

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

MIT License - feel free to use this project for learning or as a starting point for your own applications.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

If you have any questions or issues, please open an issue on GitHub.

---

Built with ❤️ using React and OpenWeatherMap API

---
**Last Updated:** 2024-01-15 21:35 UTC
