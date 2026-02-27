const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export async function getCurrentWeather(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "City not found");
  }

  return data;
}

export async function getForecast(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Forecast not found");
  }

  return data;
}



