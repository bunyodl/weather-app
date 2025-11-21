import { createEffect, createSignal, Show } from "solid-js";
import "./App.css";
import type { WeatherData } from "./types/weather.types";
import {
  WeatherCard,
  HourlyForecast,
  DailyForecast,
  TemperatureChart,
  WeatherStats,
} from "./components";

function App() {
  const [weatherData, setWeatherData] = createSignal<WeatherData | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const result = await fetch(
          "https://archive-api.open-meteo.com/v1/era5?latitude=52.52&longitude=13.41&start_date=2021-01-01&end_date=2021-12-31&hourly=temperature_2m",
        );
        if (!result.ok) throw new Error("Failed to fetch data");

        const data = await result.json();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  });

  return (
    <div class="app">
      <header class="app-header">
        <h1>Weather Dashboard</h1>
        <p>Berlin, Germany - Full Year Data (2021)</p>
      </header>

      <Show when={loading()}>
        <div class="loading">
          <div class="spinner" />
          <p>Loading weather data...</p>
        </div>
      </Show>

      <Show when={error()}>
        <div class="error">
          <p>Error: {error()}</p>
        </div>
      </Show>

      <Show when={weatherData() && !loading()}>
        <div class="weather-container">
          <div class="main-section">
            <WeatherCard data={weatherData()!} />
            <WeatherStats data={weatherData()!} />
          </div>

          <div class="forecast-section">
            <HourlyForecast
              data={weatherData()}
              hours={48}
            />
            <DailyForecast
              data={weatherData()}
              days={14}
            />
          </div>

          <div class="chart-section">
            <TemperatureChart
              data={weatherData()}
              hours={168}
            />
          </div>
        </div>
      </Show>
    </div>
  );
}

export default App;
