import React from 'react'
import partly from '../../pictures/climas/partly-cloudy-day.png'
import './WeatherDay.style.css'
const WeatherDay = ({ day, max, min }) => {
    return (
        <div className="today__item">
            <p className='today__item__day'>{day}</p>
            <div className='today_item__weather'>
                <img src={partly} alt="" />
                <div>
                    <p>{Math.round(max)}°</p>
                    <p>{Math.round(min)}°</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherDay
