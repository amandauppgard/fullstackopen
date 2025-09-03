import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
    const key = import.meta.env.VITE_WEATHER_KEY;
    const request = axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${key}`)
    return request.then(response => response.data)
}

 
export default {getAll, getWeather}