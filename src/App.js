import React, { useState, useRef } from "react";
import axios from "axios";
import videoSunset from "./assets/sunsetvideo.mp4";
import rainvideo from "./assets/rainvideo.mp4";
import sunnyvideo from "./assets/sunnyvideo.mp4";
import hotvideo from "./assets/hotvideo.mp4";
import cloudvideo from "./assets/cloudvideo.mp4";
import snowyvideo from "./assets/snowyvideo.mp4";
import mist from "./assets/mist.mp4";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        
      });
      setLocation("");
    }
  };

  const videoRef = useRef();

  // useEffect(() => {
  //   videoRef.current.playbackRate = 0.6;
  // }, []);

  return (
    <div className="app">
      {!data.weather && (
        <video
          className="bgvideo"
          src={videoSunset}
          ref={videoRef}
          autoPlay
          loop
          muted
        />
      )}
      {data.weather
        ? data.weather[0].main === "Clouds" &&
          data.main.temp.toFixed() < 25 &&
          data.main.temp.toFixed() > 0 && (
            <video className="bgvideo" src={cloudvideo} autoPlay loop muted />
          )
        : null}
      {data.main
        ? data.main.temp.toFixed() >= 25 && (
            <video className="bgvideo" src={hotvideo} autoPlay loop muted />
          )
        : null}
      {data.main
        ? data.main.temp.toFixed() <= 0 && (
            <video className="bgvideo" src={snowyvideo} autoPlay loop muted />
          )
        : null}
      {data.weather
        ? data.weather[0].main === "Rain" &&
          data.main.temp.toFixed() < 25 &&
          data.main.temp.toFixed() > 0 && (
            <video className="bgvideo" src={rainvideo} autoPlay loop muted />
          )
        : null}
      {data.weather
        ? data.weather[0].main === "Clear" &&
          data.main.temp.toFixed() < 25 &&
          data.main.temp.toFixed() > 0 && (
            <video className="bgvideo" src={sunnyvideo} autoPlay loop muted />
          )
        : null}
      {data.weather
        ? data.weather[0].main === ("Mist" || "Haze") &&
          data.main.temp.toFixed() < 25 &&
          data.main.temp.toFixed() > 0 && (
            <video className="bgvideo" src={mist} autoPlay loop muted />
          )
        : null}
      {/* <div className="overlay"></div> */}
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Введите локацию"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.name === "Moscow" ? (data.name = "Москва") : null}
            {data.name === "London" ? (data.name = "Лондон") : null}
            {data.name === "New York" ? (data.name = "Нью Йорк") : null}
            {data.name === "Paris" ? (data.name = "Париж") : null}
            {data.name === "Los Angeles" ? (data.name = "Лос Анджелес") : null}
            {data.name === "Tokyo" ? (data.name = "Токио") : null}

            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          {data.weather && (
            <div className="description">
              {data.weather[0].main === "Clouds" ? <p>Облачно</p> : null}
              {data.weather[0].main === "Clear" ? <p>Ясно</p> : null}
              {data.weather[0].main === "Rain" ? <p>Дождь</p> : null}
              {data.weather[0].main === "Snow" ? <p>Снег</p> : null}
              {data.weather[0].main === "Mist" ? <p>Туман</p> : null}
              {data.weather[0].main === "Haze" ? <p>Дымка</p> : null}
              {data.weather[0].main === "Fog" ? <p>Туман</p> : null}
            </div>
          )}
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Ощущается как</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Влажность</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed() * 0.45} м/с</p>
              ) : null}
              <p>Скорость ветра</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
