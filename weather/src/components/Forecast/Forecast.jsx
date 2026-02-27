import { getWeatherIcon } from "../../utils/weatherIcon";
import "./Forecast.css";

export default function Forecast({ data }) {
  if (!data || !data.list || data.cod === "404") return null;

  const daily = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  function formatDay(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
    });
  }

  return (
      <div className="forecast-container">
      <h2 className="forecast-title">5‑Day Forecast</h2>

      <div className="forecast-list">
        {daily.map((day) => (
          <div key={day.dt} className="forecast-row">
            
            <div className="forecast-left">
              <p className="forecast-day">{formatDay(day.dt_txt)}</p>
            </div>

            <div className="forecast-center">
              <img
                src={getWeatherIcon(day.weather[0].icon)}
                alt="weather icon"
                className="forecast-icon"
              />
              <p className="forecast-desc">{day.weather[0].description}</p>
            </div>

            <div className="forecast-right">
              <p className="forecast-temp">
                {Math.round(day.main.temp)}°C
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
