import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface stateType {
  value: number;
  info: { id: number; name: string; latitude: number; longitude: number };
  weatherInfo: {
    time: string;
    temperature: number;
    weatherCode: number;
    state: number;
  };
  isLoding: boolean;
  isLoadingWeather: boolean;
  status: string;
}

const initialState: stateType = {
  value: 0,
  info: {
    id: 0,
    name: "",
    latitude: 0,
    longitude: 0,
  },
  weatherInfo: {
    time: "",
    temperature: 0,
    weatherCode: 0,
    state: 0,
  },

  isLoding: false,
  isLoadingWeather: false,
  status: "idle",
};
// Don’t access live state from initialState 🔴🔴🔴🔴🔴
// the string is prefex, put what you want
export const featchGeoInfo = createAsyncThunk<stateType["info"], string>(
  "geoInfoAPI/fatch",
  async (city: string) => {
    const res = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: city,
          country_code: "SA",
        },
      }
    );
    // send which you want and what the type do you like

    const data = res.data.results[0];
    const id = data.id;
    const name = data.name;
    const latitude = data.latitude;
    const longitude = data.longitude;
    return { id, name, latitude, longitude };
  }
);

export const fetchTheWeatherInfo = createAsyncThunk(
  "weatherInfo/fetch",
  async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    const url = "https://api.open-meteo.com/v1/forecast";

    const res = await axios.get(url, {
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
        timezone: "auto",
      },
    });

    const data = res.data;
    const time = data.daily.time[0];
    const temperature = data.hourly.temperature_180m[0];
    const weatherCode = data.hourly.weather_code[0];
    const state = data.current.is_day;

    return { time, temperature, weatherCode, state };
    // setTime(res.data.daily.time[0]);
    // setTemperature(res.data.hourly.temperature_180m[0]);
    // setWeatherCode(res.data.hourly.weather_code[0]);
    // setState(res.data.current.is_day);
  }
);

const geoSlice = createSlice({
  name: "geo",
  initialState,
  reducers: {},

  extraReducers(builder) {
    // do the type of status do someting
    builder
      .addCase(featchGeoInfo.pending, (state, action) => {
        state.isLoding = true;
        state.status = "loading";
      })
      .addCase(featchGeoInfo.fulfilled, (state, action) => {
        state.isLoding = false;
        state.status = "succeeded";
        console.log("the data from redux geo inf", action.payload);
        state.info = action.payload;
      })
      .addCase(featchGeoInfo.rejected, (state, action) => {
        state.status = " failed";
        state.isLoding = false;
      });

    builder
      .addCase(fetchTheWeatherInfo.pending, (state, action) => {
        state.isLoadingWeather = true;
      })
      .addCase(fetchTheWeatherInfo.fulfilled, (state, action) => {
        state.isLoadingWeather = false;

        console.log("the data from redux weather info", action.payload);
        state.weatherInfo = action.payload;
      })
      .addCase(fetchTheWeatherInfo.rejected, (state, action) => {
        state.isLoadingWeather = false;
      });
  },
});

export const {} = geoSlice.actions;

export default geoSlice.reducer;
