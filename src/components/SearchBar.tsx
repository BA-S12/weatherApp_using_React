import React, { useState } from "react";
import { featchGeoInfo } from "../app/slice/GeoSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../app/store";
import { RootState } from "../app/store";
import { toast } from "react-toastify";

interface Location {
  id: number;
  name: string;
  latitude: number; // make sure this is here
  longitude: number; // make sure this is here
}

function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const info: Location = useSelector((state: RootState) => state.geo.info);

  const [city, setCity] = useState<string>("");

  const search = () => {
    if (city.trim() === "" || city === null) {
      toast.error("You should enter the name of city");
    } else {
      console.log("fetch api");
      console.log(info);
      dispatch(featchGeoInfo(city));
    }
  };

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

      <button
        onClick={search}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
