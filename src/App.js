import { useState, useEffect } from 'react';
import './App.css';

import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('salem');
  const [state, setState] = useState('salem');

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = (event) => {
    setState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>React Weather App</h1>
      </header>
      <div className="container">
        <div className="card">
          <div className="input-area">
            <label htmlFor="locationName">Enter Your Location : </label>
            <input
              type="text"
              name="locationName"
              value={getState}
              onChange={inputHandler}
            />{' '}
            <button type="submit" onClick={submitHandler}>
              Search
            </button>
          </div>
          {apiData.main ? (
            <div className="weather-status">
              <p>Type - {apiData.weather[0].main}</p>
              <p>Temp - {kelvinToFarenheit(apiData.main.temp)}&deg; C</p>
              <p>
                Min Temp - {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
              </p>
              <p>
                Max Temp - {kelvinToFarenheit(apiData.main.temp_max)}&deg; C
              </p>
              <p>Place - {apiData.name}</p>
              <p>
                Country -{' '}
                {countries.getName(apiData.sys.country, 'en', {
                  select: 'official',
                })}
              </p>
              <p>Time - {Date(apiData.sys.country)}</p>
              <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt=""
              />
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
      <footer className="footer">
        <code>
          Created by <span>imshines</span> using React
        </code>
      </footer>
    </div>
  );
}

export default App;
