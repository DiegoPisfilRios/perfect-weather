import React, { useContext } from 'react'
import './Panel.style.css'
import windsock from '../../pictures/windsock.png'
import humidity from '../../pictures/humidity.png'
import cloud from '../../pictures/cloud.png'
import wind from '../../pictures/wind.png'
import WeatherDay from '../weatherDay/WeatherDay'
import WeatherProvider from '../../context/Weather.context'
import Skeleton from 'react-loading-skeleton'


const Panel = () => {
    const { forecast, weather } = useContext(WeatherProvider.context);

    const dias = {
        Mon: 'Lun',
        Tue: 'Mar',
        Wed: 'Mie',
        Thu: 'Jue',
        Fri: 'Vie',
        Sat: 'Sab',
        Sun: 'Dom',
    }

    const unixToDateLat = (unix) => {
        let date = new Date(unix * 1000).toUTCString();
        let iday = date.split(', ');
        let inum = iday[1].split(' ')[0]
        return dias[iday[0]] + ', ' + inum
    }

    return (
        <section className="app-panel">
            <div className="panel-head">
                <h2 className="app-title">Pronóstico de la semana</h2>
                <label className="chk-cmp">
                    <input type="checkbox" name="" id="chk-inp" />
                    <div className="chk-draw">
                        <p>°C</p>
                        <p>°F</p>
                    </div>
                </label>
            </div>
            <br />
            <div className="today">
                {
                    forecast.map((day, index) => {
                        if (index > 0) {
                            return <WeatherDay
                                key={index}
                                day={index == 1 ? 'Mañana' : unixToDateLat(day.dt)}
                                max={day.temp.max}
                                min={day.temp.min}
                            />
                        }
                    })
                }
            </div>
            <br />
            <h2 className="app-title" id='demo'>Lo que se espera para hoy</h2>
            <br />
            <div className="details">
                <div className="details__item">
                    <p>Estado del Viento</p>
                    <div>
                        <img src={windsock} alt="" />
                        <p>{ !weather.wind ? <Skeleton /> : weather.wind.speed}<span>mph</span></p>
                    </div>
                </div>
                <div className="details__item">
                    <p>Humedad</p>
                    <div><img src={humidity} alt="" />
                        <p>{!weather.main ? <Skeleton /> :weather.main.humidity}<span>%</span> </p>
                    </div>
                </div>
                <div className="details__item">
                    <p>Visibilidad</p>
                    <div><img src={cloud} alt="" />
                        <p>{!weather.visibility ? <Skeleton /> :weather.visibility / 10000}<span>kilometro</span></p>
                    </div>
                </div>
                <div className="details__item">
                    <p>Precion del Aire</p>
                    <div><img src={wind} alt="" />
                        <p>{!weather.main ? <Skeleton /> :weather.main.pressure}<span>mb</span></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Panel
