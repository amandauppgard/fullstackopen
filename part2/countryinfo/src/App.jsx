import { useState, useEffect } from 'react'
import countriesService from './services/countries.js'

const CountryInfo = ({country, weather}) => {
  if (country === undefined || weather === undefined) {
    return null;
  }

  const imageStyle = {
    width: "250px",
  }
  console.log(weather.weather[0].icon)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital.join(", ")}</p>
      <p>Area: {country.area.toString()} </p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((lang) => 
          <li key={lang}>{lang}</li>
        )}
      </ul>
      <img style={imageStyle} src={country.flags.svg} alt={`Image of ${country.name.common}'s flag.`} />
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} C&deg;</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

const DisplayMatchingNames = ({matchingCountries, setCountryToView, countryToView}) => {
  useEffect(() => {
    if (matchingCountries.length === 1) {
      setCountryToView(matchingCountries[0]);
    }
  },[matchingCountries, setCountryToView])

  if (countryToView !== undefined) return null;

  if (matchingCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (matchingCountries.length === 0) {
    return (
      <div>
        No matching country found
      </div>
    )
  }

  return (
    <>
      {matchingCountries.map((country) => 
        <div key={country.name.common}>
          <p>{country.name.common}</p>
          <button onClick={() => setCountryToView(country)}>Show</button>
        </div>
      )}
    </>
  )
}

const App = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [matchingCountries, setMatchingCountries] = useState([]);
  const [countryToView, setCountryToView] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    countriesService
    .getAll()
    .then((returnedData) => {
      setCountries(returnedData);
    })
  },[])
 
  useEffect(() => {
    if (countries !== null) {
      const matches = countries.filter((country) => country.name.common.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase()))
      setMatchingCountries(matches);
      setCountryToView(undefined);
    }
  },[nameFilter, countries])

  useEffect(() => {
    if (countryToView !== undefined) {
      countriesService
      .getWeather(countryToView.capitalInfo.latlng[0], countryToView.capitalInfo.latlng[1])
      .then((returnedData) => {
        setWeather(returnedData);
      })
    }
  },[countryToView])

  return (
    <div>
      <label htmlFor='country-filter'>find countries</label>
      <input id='country-filter' placeholder='Enter country name' value={nameFilter} onChange={(val) => setNameFilter(val.target.value)}/>
      <DisplayMatchingNames matchingCountries={matchingCountries} setCountryToView={setCountryToView} countryToView={countryToView} /> 
      <CountryInfo country={countryToView} weather={weather} />
    </div>
  )
}

export default App