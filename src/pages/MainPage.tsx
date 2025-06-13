import React,{useState} from "react";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";

function MainPage() {
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [name, setName] = useState<string | undefined>();
  return (
    <div className="flex flex-col items-center justify-center  min-h-screen bg-[#14213d] ">
      <SearchBar setLatitude={setLatitude} setLongitude={setLongitude} setName={setName} />
      <WeatherCard latitude={latitude} longitude={longitude} name={name} />

    </div>
  );
}

export default MainPage;
