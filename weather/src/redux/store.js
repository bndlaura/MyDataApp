import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";
import weatherReducer from "./slices/weatherSlice";
import favoritesReducer from "./slices/favoritesSlice";

// Configure the Redux store with all slices
export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    weather: weatherReducer,
    favorites: favoritesReducer,
  },
});
