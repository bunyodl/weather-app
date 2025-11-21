import { createSignal, Show } from "solid-js";
import "./App.css";
import type { WeatherData, Location } from "./types/weather.types";
import {
  WeatherCard,
  HourlyForecast,
  DailyForecast,
  TemperatureChart,
  WeatherStats,
  LocationSearch,
} from "./components";
import { WeatherService } from "./services/weather.service";

const DEFAULT_LOCATION: Location = {
  name: "Berlin",
  latitude: 52.52,
  longitude: 13.41,
  country: "Germany",
};

function App() {
  const [weatherData, setWeatherData] = createSignal<WeatherData | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [selectedLocation, setSelectedLocation] =
    createSignal<Location>(DEFAULT_LOCATION);

  const fetchWeather = async (location: Location) => {
    try {
      setLoading(true);
      setError(null);
      const data = await WeatherService.getWeatherForecast(
        location.latitude,
        location.longitude,
      );
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    fetchWeather(location);
  };

  const loadDefaultLocation = () => {
    fetchWeather(DEFAULT_LOCATION);
  };

  return (
    <div class="app">
      <header class="app-header">
        <h1>Weather Dashboard</h1>
        <p>Search for any location to view weather forecast</p>
      </header>

      <div class="search-section">
        <LocationSearch onLocationSelect={handleLocationSelect} />
        <Show when={!weatherData() && !loading()}>
          <button
            class="default-location-btn"
            onClick={loadDefaultLocation}
          >
            Or view weather for Berlin, Germany
          </button>
        </Show>
      </div>

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
            <WeatherCard
              data={weatherData()!}
              locationName={`${selectedLocation().name}${
                selectedLocation().admin1
                  ? `, ${selectedLocation().admin1}`
                  : ""
              }, ${selectedLocation().country}`}
            />
            <WeatherStats data={weatherData()!} />
          </div>

          <div class="forecast-section">
            <HourlyForecast
              data={weatherData()}
              hours={48}
            />
            <DailyForecast
              data={weatherData()}
              days={7}
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
