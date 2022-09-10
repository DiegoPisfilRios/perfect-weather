import React, { useContext } from 'react'
import './Sidebar.style.css'
import cloudy from '../../pictures/partly-cloudy-day.png'
import { MapPin, Search } from 'react-feather'

import locationOFF from '../../pictures/my-location-2.png'
import locationON from '../../pictures/my-location.png'
import RequestCityProvider from '../../context/RequestCity.context';
import RequestGPSProvider from '../../context/RequestGPS.context';
import WeatherProvider from '../../context/Weather.context'
import Skeleton from 'react-loading-skeleton'


const Sidebar = () => {

    const { setFieldSearch, onSearch } = useContext(RequestCityProvider.context)
    const { setGPS, gps } = useContext(RequestGPSProvider.context)
    const { weather } = useContext(WeatherProvider.context)

    const handlerSearch = (e) => {
        if (e.keyCode === 13) {
            onSearch();
            // e.target.value = ''
        }
    }

    const handlerGPS = () => {
        setGPS(!gps)
    }

    const upperCase = (text) => {
        return text.split(' ').map(e => {
            let charAux = e.toString().split('');
            charAux[0] = charAux[0].toUpperCase();
            return charAux.join('')
        }).join(' ')
    }

    return (
        <section className="app-sidebar">
            <div className="location">
                <div className='search'>
                    <input
                        type="text"
                        className="location__search"
                        placeholder="Busca por lugares"
                        onChange={e => setFieldSearch(e.target.value)}
                        onKeyDown={handlerSearch}
                    />
                    <Search />
                </div>
                <button className="location__gps" title='Ubicación actual' onClick={handlerGPS}>
                    <img src={gps ? locationON : locationOFF} alt="q" />
                </button>
            </div>
            <div className="weather">
                <div className="weather-pic">
                    <img src={cloudy} alt="" />
                    <h1>{!weather.main ? <Skeleton /> : Math.round(weather.main.temp)}°C</h1>
                    <h3>{!weather.weather ? <Skeleton /> :upperCase(weather.weather[0].description)}</h3>
                </div>
            </div>
            <div className="location end">
                <p>Hoy &#183; Sabado, 27 Agosto</p>
                <p> <MapPin /> {!weather ? <Skeleton /> :weather.name} </p>
            </div>
        </section>
    )
}

export default Sidebar
