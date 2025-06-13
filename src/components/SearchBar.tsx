import React, { useState, useEffect } from "react";
import axios from "axios";
interface Location {
  id: number;
  name: string;
  country: string;
  country_code: string;
  latitude: number; // make sure this is here
  longitude: number; // make sure this is here
}
interface SearchBarProps {
  setLatitude: React.Dispatch<React.SetStateAction<number | undefined>>;
  setLongitude: React.Dispatch<React.SetStateAction<number | undefined>>;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;
}
function SearchBar({ setLatitude, setLongitude,setName }: SearchBarProps) {
  const [city, setCity] = useState<string>("");

  const search = () => {
    axios
      .get("https://geocoding-api.open-meteo.com/v1/search", {
        params: {
          name: city.trim(),
          country_code: "SA",
        },
      })
      .then((res) => {
        const results: Location[] = res.data.results || [];
         const filtered = results.filter(
          (loc) => loc.country_code.toUpperCase() === "SA"
        );
        console.log(filtered)
        if (results.length > 0) {
          setLatitude(results[0].latitude);
          setLongitude(results[0].longitude);
          setName(results[0].name)
        }
      })
      .catch((err) => {
        console.error("Error fetching location:", err);
      });
  };
  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter"){
      search()
    }

  }

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
