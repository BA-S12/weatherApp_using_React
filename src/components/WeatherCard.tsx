import React, { useEffect } from "react";
import weatherImage from "../image/cloude.png";
import { useState } from "react";
import { fetchWeatherApi } from "openmeteo";
import axios from "axios";
import { stat } from "fs";

type WeatherCardProps = {
  latitude?: number;
  longitude?: number;
  name?: string;
};

function WeatherCard({ latitude, longitude, name }: WeatherCardProps) {
  const weatherIcons: { [key: number]: string } = {
    0: "/icons/sunny.png",
    1: "/icons/mostly-sunny.png",
    2: "/icons/cloudy.png",
    3: "/icons/very-cloudy.png",
    45: "/icons/fog.png",
    51: "/icons/drizzle.png",
    61: "/icons/rain.png",
    95: "/icons/thunderstorm.png",
  };
  const weatherCodeMap: { [key: number]: string } = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  const [time, setTime] = useState();
  const [temperature, setTemperature] = useState<number>();
  const [weatherCode, setWeatherCode] = useState<number>();
  const [state, setState] = useState<number>();

  useEffect(() => {
    if (latitude && longitude) {
      const url = "https://api.open-meteo.com/v1/forecast";

      axios
        .get(url, {
          params: {
            latitude: latitude,
            longitude: longitude,
            daily: ["sunset", "sunrise"],
            hourly: [
              "temperature_2m",
              "weather_code",
              "temperature_80m",
              "temperature_120m",
              "temperature_180m",
            ],
            current: ["is_day", "weather_code", "surface_pressure"],
            timezone: "auto", // optional but recommended
          },
        })
        .then((res) => {
          console.log(res.data);
          setTime(res.data.daily.time[0]);
          setTemperature(res.data.hourly.temperature_180m[0]);
          setWeatherCode(res.data.hourly.weather_code[0]);
          setState(res.data.current.is_day);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [latitude, longitude]);

  return (
    <div className="text-white flex flex-col items-center justify-center  m-10 py-4 px-6  bg-[#003049] rounded">
      <div className="head  flex gap-10  items-center self-start mb-4">
        <div className="cityName">
          <h1 className="text-[40px] font-bold">
            {name || "no thing"}
            <span className="text-[20px] font-thin"> {time}</span>
          </h1>
        </div>
      </div>

      <div className="body flex items-center justify-center gap-6">
        <div className="data font-medium text-left leading-[2] text-[17px] capitalize">
          <h1 className="text-7xl font-semibold">{temperature}</h1>
          <p>{weatherCodeMap[state || 0]}</p>
          <p className="">down:40 | large:40</p>
        </div>
        <div className="image">
          {weatherIcons[weatherCode ||0]}
          {/* <img src={weatherImage} alt="cloude" className="w-[200px]" /> */}
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
