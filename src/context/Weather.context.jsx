import React, { createContext, useEffect, useState } from "react";

const context = createContext(null);

const WeatherProvider = ({ children }) => {
    const [weather, setwather] = useState({});
    const [forecast, setforecast] = useState([]);

    const URL_IPINFO = import.meta.env.VITE_APP_IPINFO;
    const TK_OPENWEATHER = import.meta.env.VITE_APP_TOKEN;

    useEffect(() => {
        // GPS
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => requestForLocation({ latitude: latitude, longitude: longitude }),
                () => {
                    fetch(URL_IPINFO) //IP
                        .then(result => result.json())
                        .then(result => requestForCity(result.city))
                        .catch(err => alert('IP-ERROR:' + err))
                });
        }
    }, [])

    const setFieldsWeather = (valuesWeather) => {
        setwather(valuesWeather);
    }

    const requestForCity = (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${TK_OPENWEATHER}&lang=es&q=${city}&units=metric`)
            .then(result => result.json())
            .then(result => {
                console.info('RequestForCity: SUCCESS');
                setFieldsWeather(result);
                requestForecast({
                    lat: result.coord.lat,
                    lon: result.coord.lon
                })
            })
            .catch(err => console.error(err))
    }

    const requestForLocation = ({ latitude, longitude }) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${TK_OPENWEATHER}&lang=es&lat=${latitude}&lon=${longitude}&units=metric`)
            .then(result => result.json())
            .then(result => {
                console.info('RequestForLocation: SUCCESS');
                setFieldsWeather(result);
                requestForecast({
                    lat: result.coord.lat,
                    lon: result.coord.lon
                })
            })
            .catch(err => console.error(err))
    }

    const requestForecast = (coord) => {
        fetch(`http://api.openweathermap.org/data/3.0/onecall?lat=${coord.lat}&lon=${coord.lon}&lang=sp&units=metric&appid=${TK_OPENWEATHER}`)
            .then(result => result.json())
            .then(result => { 
                console.info('RequestForecast: SUCCESS');
                setforecast(result.daily)
            })
            .catch(err => console.error(err))
    }

    return <context.Provider value={{ weather, forecast, requestForLocation, requestForCity, setFieldsWeather }}>{children}</context.Provider>;
};

WeatherProvider.context = context;

export default WeatherProvider;