import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

type WeatherCardProps = {
  latitude?: number;
  longitude?: number;
  name?: string;
};
interface Location {
  id: number;
  name: string;
  latitude: number; // make sure this is here
  longitude: number; // make sure this is here
}
function WeatherCard({ latitude, longitude, name }: WeatherCardProps) {

  const info:Location = useSelector((state:RootState)=>state.geo.info);

  const weatherIcons: { [key: number]: string } = {
    0: "/icons/wi-day-sunny.svg",
    1: "/icons/weather.png",
    2: "/icons/wi-cloud.svg",
    45: "/icons/wi-fog.svg",
    51: "/icons/rainy-day.png",
    61: "/icons/heavy-rain.png",
    95: "/icons/thunderstorm.png",
  };
  const nameOfMonth: { [kay: number]: string } = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
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
  const [time, setTime] = useState<string>();
  const [temperature, setTemperature] = useState<number>();
  const [weatherCode, setWeatherCode] = useState<number>();
  const [state, setState] = useState<number>();
  const [language, setLanguage] = useState<string>("");
  const [t, i18n] = useTranslation();

  useEffect(() => {
         console.log("---------------------------------")
      console.log(info.latitude,info.longitude)
    if (info.latitude && info.longitude) {
 
      const url = "https://api.open-meteo.com/v1/forecast";

      axios
        .get(url, {
          params: {
            latitude: info.latitude,
            longitude: info.longitude,
            daily: ["sunset", "sunrise"],
            hourly: [
              "temperature_2m",
              "weather_code",
              "temperature_80m",
              "temperature_120m",
              "temperature_180m",
            ],
            current: ["is_day", "weather_code", "surface_pressure"],
            timezone: "auto",
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
  }, [info.longitude, info.latitude]);



  const handleLanguageChnage = () => { 
      if(language ==="AR"){
        i18n.changeLanguage("en");
        setLanguage("EN")
          document.documentElement.setAttribute("dir", "ltr");
      }
      else{
         i18n.changeLanguage("ar");
        setLanguage("AR")
            document.documentElement.setAttribute("dir", "rtl");
      }
    };

  const timeArr = time?.split("-") || "";
  const monthIndex = time ? Number(timeArr[1]) - 1 : 0;
  const monthName = nameOfMonth[monthIndex] || "";

  return (
    <>
      <div   className="text-white flex flex-col items-center justify-center m-10 py-4 px-6 bg-[#003049] rounded-2xl shadow-2xl shadow-black/30 ">
        <div  className="head  flex gap-10  items-center self-start mb-4">
          <div className="cityName" >
            <h1 className="text-[40px] font-bold">
              {name}
              <span className="text-[20px] font-thin">
                {timeArr[0]} {monthName} {timeArr[2]}
              </span>
            </h1>
          </div>
        </div>

        <div className="body flex items-center justify-center gap-6">
          <div className="data font-medium text-left leading-[2] text-[17px] capitalize">
            <h1 className="text-7xl font-semibold">{temperature}</h1>
            <p>{weatherCodeMap[state || 0]}</p>
            <p className="">
              {t("down")}:{temperature} | {t("up")}:{temperature}
            </p>
          </div>
          <div className="image">
            <img
              src={weatherIcons[weatherCode || 0]}
              alt={state ? "" : ""}
              className="w-[200px]"
            />
          </div>
        </div>
      </div>
      <p onClick={handleLanguageChnage} className="text-white cursor-pointer">
        {language==="AR"?"EN":"عربي"}
      </p>
    </>
  );
}

export default WeatherCard;
