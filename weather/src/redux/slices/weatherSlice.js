import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentWeather, getForecast } from "../../api/weatherService";

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (city) => {
    const current = await getCurrentWeather(city);
    const forecast = await getForecast(city);
    return { current, forecast };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    current: null,
    forecast: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.current;
        state.forecast = action.payload.forecast;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.current = null;
        state.forecast = null;
      });
  },
});

export default weatherSlice.reducer;
