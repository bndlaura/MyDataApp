import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/slices/favoritesSlice";
import { getWeatherIcon } from "../../utils/weatherIcon";
import "./CurrentWeather.css";

export default function CurrentWeather({ data }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  if (!data.sys || !data.weather) {
    return (
      <div className="error-text">
        <p>City not found. Try another search.</p>
      </div>
    );
  }

  const isFav = favorites.includes(data.name);

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="cw-wrapper">
      <div className="cw-header">
        <div>
          <h2 className="cw-location">
            {data.name}, {data.sys.country}
          </h2>
          <p className="cw-date">{date}</p>
          <p className="cw-description">{data.weather[0].description}</p>
        </div>

        <button
          className={`cw-fav-btn ${isFav ? "active" : ""}`}
          onClick={() => dispatch(toggleFavorite(data.name))}
        >
          {isFav ? "★" : "☆"}
        </button>
      </div>

      <div className="cw-temp-section">
        <img
          src={getWeatherIcon(data.weather[0].icon)}
          alt="weather icon"
          className="cw-icon"
        />
        <h1 className="cw-temp">{Math.round(data.main.temp)}°C</h1>
      </div>

      <div className="cw-indicators">
        <div className="cw-indicator">
          <span className="cw-label">Feels like</span>
          <span className="cw-value">{Math.round(data.main.feels_like)}°C</span>
        </div>

        <div className="cw-indicator">
          <span className="cw-label">Humidity</span>
          <span className="cw-value">{data.main.humidity}%</span>
        </div>

        <div className="cw-indicator">
          <span className="cw-label">Wind</span>
          <span className="cw-value">{Math.round(data.wind.speed)} km/h</span>
        </div>
      </div>
    </div>
  );
}
