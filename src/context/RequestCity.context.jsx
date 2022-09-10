import React, { createContext, useContext, useState } from "react";
import WeatherProvider from './Weather.context'

const context = createContext(null);

const RequestCityProvider = ({ children }) => {
    const [search, setsearch] = useState('');
    const { requestForCity } = useContext(WeatherProvider.context);

    const setFieldSearch = (value) => {
        setsearch(value);
    }

    const onSearch = () => {
        requestForCity(search);
    }

    return <context.Provider value={{ setFieldSearch, onSearch, search }}>{children}</context.Provider>;
};

RequestCityProvider.context = context;

export default RequestCityProvider;