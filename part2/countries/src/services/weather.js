import axios from 'axios'

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getCoordsWeather = (latitude, longitude) => 
  axios.get(`${baseUrl}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
    .then(response => response.data)

export default { getCoordsWeather }

