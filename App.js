import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");
  const [humidity, setHumidity] = useState("");
  const [showWindImage, setShowWindImage] = useState(false);
  const [wind, setWind]=useState("");

  const changeHandler = e => {
    setCity(e.target.value);
  }

  const submitHandler = e => {
    e.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a417857b5161845b6d154c3bb7c5d2e1`)
      .then(response => response.json())
      .then(data => {
        const kelvin = data.main.temp;
        const celsius = kelvin - 273.15;
        setResult("Temperature at" + " "+city+"\n "+Math.round(celsius)+"°C");
        setHumidity(`Humidity ${data.main.humidity}%`);
        setWind("Wind"+data.wind.speed+"km/hr")
        setCity("");
        
        setShowWindImage(true); // Set showWindImage to true when data is successfully fetched
      })
      .catch(error => {
        console.log("error");
        setShowWindImage(false); // Set showWindImage to false on error
      });
  }

  return (
    <div className="App">
      <center>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              Weather app
            </h4>
            <form onSubmit={submitHandler}>
              <input type="text" name="city" value={city} onChange={changeHandler} placeholder="Enter city name" />
              <button type="submit">Get Temperature</button>
            </form>
            <h1>{result}</h1><br></br>
            <div className="humidity-wind-container">
              <div className="wind-container">
                {showWindImage && (
                  <img src="http://127.0.0.1:5501/images/wind.png" alt="Wind icon" style={{ height: '30px', width: '30px', marginRight: '5px' }} />
                )} &nbsp;&nbsp;{wind}
              </div><br></br>
              <div className="humidity-container">
                {showWindImage && (
                  <img src="http://127.0.0.1:5501/images/humidity.png" alt="Humidity icon" style={{ height: '30px', width: '30px', marginLeft: '5px' }} />
                )}&nbsp;&nbsp;
                {humidity}
              </div>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
}

export default App;
