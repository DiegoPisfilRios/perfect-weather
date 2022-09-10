import React, { createContext, useContext, useState } from "react";
import WeatherProvider from './Weather.context'
const context = createContext(null);

const RequestGPSProvider = ({ children }) => {
    const [gps, setgps] = useState(false);
    const { requestForLocation} = useContext(WeatherProvider.context);

    const setGPS = (value) => {
        if (!value) {
            setgps(false);
            return;
        }

        // gps
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
                requestForLocation({ latitude: latitude, longitude: longitude });
                setgps(true);
            }, () => {
                setgps(false);
                alert('No se puede acceder a los datos del GPS.')
            });
        } 
    }

    return <context.Provider value={{ setGPS, gps }}>{children}</context.Provider>;
};

RequestGPSProvider.context = context;

export default RequestGPSProvider;