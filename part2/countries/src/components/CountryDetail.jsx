import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const CountryDetail = ({country}) => {
  
  const [weather, setWeather] = useState(null)

  const hook = () => {
    const eventHandler = weather => 
      
      setWeather(weather)

    const [lat,lon] = country.capitalInfo.latlng  
    weatherService.getCoordsWeather(lat, lon)
      .then(eventHandler)
  }

  useEffect(hook, [])

  const weatherRender = () => {
    if (!weather) return

    const imageUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    return (
      <div>
        <h2>Weather in {weather.name}</h2>
        <div>temperature {weather.main.temp} Celcius</div>
        <img src={imageUrl}/>
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    )
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map( (l) => 
          <li key={l}>{l}</li>  
        )}
      </ul>
      <img width="150" src={country.flags.png}/>

      { weatherRender() }
    </div>
  )
}

export default CountryDetail