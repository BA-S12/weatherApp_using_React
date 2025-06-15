import React, { useEffect, useState } from "react";
import axios from "axios";
import { featchGeoInfo } from "../app/slice/GeoSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../app/store";
import { RootState } from "../app/store";

interface Location {
  id: number;
  name: string;
  latitude: number; // make sure this is here
  longitude: number; // make sure this is here
}
interface SearchBarProps {
  setLatitude: React.Dispatch<React.SetStateAction<number | undefined>>;
  setLongitude: React.Dispatch<React.SetStateAction<number | undefined>>;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function SearchBar({ setLatitude, setLongitude, setName }: SearchBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.geo.isLoding);
  const info: Location = useSelector((state: RootState) => state.geo.info);

  const [city, setCity] = useState<string>("");

  const search = () => {
    console.log("fetch api");
    console.log(info);
    dispatch(featchGeoInfo(city));
  };
  // becuse after the dispatch end send the data
  useEffect(() => {
    setLatitude(info.latitude);
    setLongitude(info.longitude);
    setName(info.name);
  }, [info,setLatitude,setLongitude,setName]);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <label className="w-full max-w-xs">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter city name"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      {isLoading ? (
        <div
          className="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
              aspect-square w-8 flex justify-center items-center text-yellow-700"
        ></div>
      ) : (
        <button
          onClick={search}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      )}
      <div className="text-white">
        {info.id} {info.name} {info.latitude} {info.longitude}
      </div>
    </div>
  );
}

export default SearchBar;
