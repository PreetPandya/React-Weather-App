import React, { useState } from "react";
import "./WeatherApp.css";
import axios from "axios";

import clearIcon from "../Assets/clear.png";
import cloudIcon from "../Assets/cloud.png";
import drizzleIcon from "../Assets/drizzle.png";
import humidityIcon from "../Assets/humidity.png";
import rainIcon from "../Assets/rain.png";
import searchIcon from "../Assets/search.png";
import snowIcon from "../Assets/snow.png";
import windIcon from "../Assets/wind.png";
import hazeIcon from "../Assets/haze.png";

export default function WeatherApp() {
  const [data, setdata] = useState({});
  const [cityName, setCityName] = useState("london");
  const [error, setError] = useState(null);

  const apiKey = "1a7ebded16ba1dd5b6a5d70807f558dc";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  const searchLocationByEnter = (event) => {
    if (event.key === "Enter") {
      if (cityName.trim() === "") {
        setError("Please enter a city name");
        return;
      }

      axios.get(apiUrl)
        .then((response) => {
          setdata(response.data);
          setCityName("");
          setError(null);
        })
        .catch((error) => {
          setError("City not found. Please enter a valid city name.");
        });
    }
  };

  const searchLocationByIcon = () => {
    if (cityName.trim() === "") {
      setError("Please enter a city name !");
      return;
    }

    axios.get(apiUrl)
      .then((response) => {
        setdata(response.data);
        setCityName("");
        setError(null);
      })
      .catch((error) => {
        setError("City not found. Please enter a valid city name !");
      });
  };

  let weatherData = data?.weather?.[0]?.main;
  let weatherImage = cloudIcon;
  if (weatherData === "Clear") {
    weatherImage = clearIcon;
  }
  if (weatherData === "Clouds") {
    weatherImage = cloudIcon;
  }
  if (weatherData === "Drizzle") {
    weatherImage = drizzleIcon;
  }
  if (weatherData === "Rain") {
    weatherImage = rainIcon;
  }
  if (weatherData === "Snow") {
    weatherImage = snowIcon;
  }
  if (weatherData === "Haze") {
    weatherImage = hazeIcon;
  }

  return (
    <div className="container">
      <div className="top-bar">
        <input
          className="cityInput"
          type="text"
          value={cityName}
          onChange={(event) => setCityName(event.target.value)}
          onKeyPress={searchLocationByEnter}
          placeholder="Search"
        />
        <div className="search-icon" onClick={searchLocationByIcon}>
          <img src={searchIcon} alt="search-icon" />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="details">
        <div className="weather-image">
          <img src={weatherImage} alt="" />
        </div>

        <div className="weather-temp">{data?.main?.temp}°c</div>
        <div className="weather-description">
          <p>{data?.weather?.[0]?.description}</p>
        </div>
      </div>

      <hr />

      <div className="weather-location">{data?.name}</div>
      <div className="data-container">
        <div className="element">
          <img className="icon" src={humidityIcon} alt="" />
          <div className="data">
            <div className="humidity-precentage">{data?.main?.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img className="icon" src={windIcon} alt="" />
          <div className="data">
            <div className="wind-speed">{data?.wind?.speed} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
