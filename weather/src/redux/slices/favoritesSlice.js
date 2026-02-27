import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: JSON.parse(localStorage.getItem("favoriteCities")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const city = action.payload;

      if (state.favorites.includes(city)) {
        state.favorites = state.favorites.filter((c) => c !== city);
      } else {
        state.favorites.push(city);
      }

      localStorage.setItem("favoriteCities", JSON.stringify(state.favorites));
    },
  },
});

// Export the action to be used in components
export const { toggleFavorite } = favoritesSlice.actions;
// Export the reducer to be included in the store
export default favoritesSlice.reducer;
