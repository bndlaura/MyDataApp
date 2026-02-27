import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherData } from "../../redux/slices/weatherSlice";
import SearchBar from "../../components/SearchBar/SearchBar";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import Forecast from "../../components/Forecast/Forecast";
import FavoriteCities from "../../components/FavoriteCities/FavoriteCities";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const { current, forecast, loading, error } = useSelector((state) => state.weather);

  function handleSelectFavorite(city) {
    dispatch(fetchWeatherData(city));
  }

  return (
    <div className="page-content">
      <SearchBar />

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {!error && current && <CurrentWeather data={current} />}
      {!error && forecast && <Forecast data={forecast} />}

      <FavoriteCities onSelect={handleSelectFavorite} />
    </div>
  );
}



