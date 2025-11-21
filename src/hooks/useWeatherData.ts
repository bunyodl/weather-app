import { createSignal } from "solid-js";
import type { Accessor } from "solid-js";
import type { WeatherData, Location } from "../types/weather.types";
import { WeatherService } from "../services/weather.service";

interface UseWeatherDataReturn {
  weatherData: Accessor<WeatherData | null>;
  loading: Accessor<boolean>;
  error: Accessor<string | null>;
  isRefreshing: Accessor<boolean>;
  lastUpdated: Accessor<Date | null>;
  fetchWeather: (location: Location, silent?: boolean) => Promise<void>;
}

export function useWeatherData(): UseWeatherDataReturn {
  const [weatherData, setWeatherData] = createSignal<WeatherData | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [lastUpdated, setLastUpdated] = createSignal<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = createSignal(false);

  const fetchWeather = async (location: Location, silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }
      setError(null);

      const data = await WeatherService.getWeatherForecast(
        location.latitude,
        location.longitude,
      );

      setWeatherData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      if (!silent) {
        setWeatherData(null);
      }
    } finally {
      if (!silent) {
        setLoading(false);
      } else {
        setIsRefreshing(false);
      }
    }
  };

  return {
    weatherData,
    loading,
    error,
    isRefreshing,
    lastUpdated,
    fetchWeather,
  };
}

