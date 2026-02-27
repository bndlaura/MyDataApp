import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "../../redux/slices/searchSlice";
import { fetchWeatherData } from "../../redux/slices/weatherSlice";
import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const recent = useSelector((state) => state.search.recent);

  // Search input state
  const [query, setQuery] = useState("");
  // Dropdown open state
  const [open, setOpen] = useState(false);

  function handleSearch(city) {
    dispatch(addSearch(city));
    dispatch(fetchWeatherData(city));
    setQuery("");
    setOpen(false);
  }

  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
        placeholder="Search city..."
      />

      {open && (
        <div
          className="search-dropdown"
          onMouseLeave={() => setOpen(false)}   
        >
          {recent.map((city) => (
            <div
              key={city}
              className="search-item"
              onClick={() => handleSearch(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
