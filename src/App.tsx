import { createSignal, Show } from "solid-js";
import "./App.css";
import type { Location } from "./types/weather.types";
import { SearchSection, StatusBar, WeatherDisplay } from "./components";
import { useWeatherData } from "./hooks/useWeatherData";
import { useAutoRefresh } from "./hooks/useAutoRefresh";

const DEFAULT_LOCATION: Location = {
  name: "Berlin",
  latitude: 52.52,
  longitude: 13.41,
  country: "Germany",
};

const REFRESH_INTERVAL_MS = 3 * 60 * 1000; // 3 minutes

function App() {
  const [selectedLocation, setSelectedLocation] =
    createSignal<Location>(DEFAULT_LOCATION);

  const {
    weatherData,
    loading,
    error,
    isRefreshing,
    lastUpdated,
    fetchWeather,
  } = useWeatherData();

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    fetchWeather(location);
  };

  const handleManualRefresh = () => {
    fetchWeather(selectedLocation(), true);
  };

  useAutoRefresh({
    interval: REFRESH_INTERVAL_MS,
    onRefresh: () => fetchWeather(selectedLocation(), true),
    enabled: () => !!weatherData(),
  });

  return (
    <div class="app">
      <header class="app-header">
        <h1>Weather Dashboard</h1>
        <p>Search for any location to view comprehensive weather data</p>
      </header>

      <SearchSection
        onLocationSelect={handleLocationSelect}
        onLoadDefault={() => fetchWeather(DEFAULT_LOCATION)}
        showDefaultButton={!weatherData() && !loading()}
      />

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
          <StatusBar
            lastUpdated={lastUpdated}
            isRefreshing={isRefreshing()}
            onRefresh={handleManualRefresh}
          />
          <WeatherDisplay
            data={weatherData()!}
            location={selectedLocation()}
          />
        </div>
      </Show>
    </div>
  );
}

export default App;
