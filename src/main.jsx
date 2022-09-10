import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Context's
import WeatherProvider from './context/Weather.context'
import RequestCityProvider from './context/RequestCity.context'
import RequestGPSProvider from './context/RequestGPS.context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WeatherProvider>
      <RequestCityProvider>
        <RequestGPSProvider>
          <App />
        </RequestGPSProvider>
      </RequestCityProvider>
    </WeatherProvider>
  </React.StrictMode>
)
