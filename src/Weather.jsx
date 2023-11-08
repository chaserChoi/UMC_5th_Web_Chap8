import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const API_KEY = "18383738b94568431ab07111e09bf9bf";
const url = "https://api.openweathermap.org/data/2.5/weather";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const InputBox = styled.input`
  width: 300px;
  height: 70px;
  border-radius: 20px;
  padding: 0 20px;
  font-size: 20px;
  box-shadow: 0px 0px 10px rgbr(0, 0, 0, 0.1);
`;

const WeatherBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 300px;
  margin-top: 50px;
  border: 2px solid black;
  border-radius: 20px;
  padding: 0 20px;
  box-shadow: 0px 0px 10px rgbr(0, 0, 0, 0.1);
`;

const City = styled.p`
  display: flex;
  margin: 10px;
  font-size: 30px;
`;

const Temp = styled.p`
  display: flex;
  margin: 5px;
  font-size: 75px;
`;

const WeatherStatus = styled.p`
  display: flex;
  flex-direction: row-reverse;
  margin: 10px;
  font-size: 30px;
`;

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await axios.get(url, {
          params: {
            q: location,
            appid: API_KEY,
          },
        });
        setWeather(response.data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    }
  };

  return (
    <Container>
      <InputBox
        type="text"
        placeholder="도시 이름을 입력하새요."
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      {weather && (
        <WeatherBox>
          <City>{weather.name}</City>
          <Temp>{Math.round((weather.main.temp - 273.15) * 10) / 10} ℃</Temp>
          <WeatherStatus>{weather.weather[0].main}</WeatherStatus>
        </WeatherBox>
      )}
    </Container>
  );
};

export default Weather;
