import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_CITIES = ["London", "Paris", "Rome", "Berlin", "Madrid"];

// Initialize recent searches from localStorage or use default cities
const initialState = {
  recent: JSON.parse(localStorage.getItem("recentSearches")) || DEFAULT_CITIES,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearch(state, action) {
      const city = action.payload;

      // Move the searched city to the front of the list, ensuring no duplicates and max 5 entries
      const updated = [
        city,
        ...state.recent.filter((c) => c.toLowerCase() !== city.toLowerCase()),
      ].slice(0, 5);

      state.recent = updated;
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    },
  },
});

export const { addSearch } = searchSlice.actions;
export default searchSlice.reducer;
