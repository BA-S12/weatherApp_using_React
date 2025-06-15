import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface stateType {
  value: number;
  info: { id: number; name: string; latitude: number; longitude: number };
  isLoding: boolean;
}

const initialState: stateType = {
  value: 0,
  info: {
    id: 0,
    name: "",
    latitude: 0,
    longitude: 0,
  },
  isLoding: false,
};


// the string is prefex, put what you want
export const featchGeoInfo = createAsyncThunk<stateType["info"], string>(
  "geoInfoAPI/fatch",
  async (city:string) => {
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

const geoSlice = createSlice({
  name: "geo",
  initialState,
  reducers: {},

  extraReducers(builder) {
    // do the type of status do someting
    builder
      .addCase(featchGeoInfo.pending, (state, action) => {
        state.isLoding = true;
      })
      .addCase(featchGeoInfo.fulfilled, (state, action) => {
        state.isLoding = false;
        console.log("the data from redux", action.payload);
        state.info = action.payload;
      })
      .addCase(featchGeoInfo.rejected, (state, action) => {
        state.isLoding = false;
      });
  },
});

export const {} = geoSlice.actions;

export default geoSlice.reducer;
