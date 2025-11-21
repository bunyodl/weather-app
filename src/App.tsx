import { createSignal, createEffect, Show } from "solid-js";
import "./App.css";
import type { Location } from "./types/weather.types";
import { SearchSection, StatusBar, WeatherDisplay } from "./components";
import { useWeatherData } from "./hooks/useWeatherData";
import { useAutoRefresh } from "./hooks/useAutoRefresh";
import { useGeolocation } from "./hooks/useGeolocation";

const REFRESH_INTERVAL_MS = 3 * 60 * 1000; // 3 minutes

function App() {
  const [selectedLocation, setSelectedLocation] = createSignal<Location | null>(
    null,
  );

  const {
    weatherData,
    loading,
    error,
    isRefreshing,
    lastUpdated,
    fetchWeather,
  } = useWeatherData();

  const {
    coordinates,
    permission,
    error: geoError,
    requestLocation,
  } = useGeolocation();

  createEffect(async () => {
    const coords = coordinates();
    if (coords) {
      const userLocation: Location = {
        name: "Your Location",
        latitude: coords.latitude,
        longitude: coords.longitude,
        country: "",
      };

      setSelectedLocation(userLocation);
      fetchWeather(userLocation);
    }
  });

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    fetchWeather(location);
  };

  const handleManualRefresh = () => {
    const location = selectedLocation();
    if (location) {
      fetchWeather(location, true);
    }
  };

  useAutoRefresh({
    interval: REFRESH_INTERVAL_MS,
    onRefresh: () => {
      const location = selectedLocation();
      if (location) {
        fetchWeather(location, true);
      }
    },
    enabled: () => !!weatherData(),
  });

  const showLocationPermission = () => {
    const perm = permission();
    return !loading() && !weatherData() && perm === "prompt";
  };

  const showSuggestions = () => {
    const perm = permission();
    return (
      !loading() &&
      !weatherData() &&
      (perm === "denied" || perm === "unsupported")
    );
  };

  return (
    <div class="app">
      <header class="app-header">
        <h1>Weather Dashboard</h1>
        <p>Search for any location to view comprehensive weather data</p>
      </header>

      <SearchSection
        onLocationSelect={handleLocationSelect}
        onRequestLocation={requestLocation}
        showLocationPermission={showLocationPermission()}
        showSuggestions={showSuggestions()}
      />

      <Show when={loading()}>
        <div class="loading">
          <div class="spinner" />
          <p>Loading weather data...</p>
        </div>
      </Show>

      <Show when={error() || geoError()}>
        <div class="error">
          <p>Error: {error() || geoError()}</p>
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
            location={selectedLocation()!}
          />
        </div>
      </Show>
    </div>
  );
}

export default App;
