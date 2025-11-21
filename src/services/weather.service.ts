import { fetchWeatherApi } from "openmeteo";
import type {
  WeatherData,
  Location,
  GeocodingResult,
} from "../types/weather.types";

const GEOCODING_API = import.meta.env.VITE_OPEN_METEO_GEOCODING_API_URL;
const FORECAST_API = import.meta.env.VITE_OPEN_METEO_FORECAST_API_URL;

export class WeatherService {
  static async searchLocations(query: string): Promise<Location[]> {
    if (!query || query.trim().length < 2) {
      return [];
    }

    try {
      const response = await fetch(
        `${GEOCODING_API}?name=${encodeURIComponent(
          query,
        )}&count=10&language=en&format=json`,
      );

      if (!response.ok) {
        throw new Error("Failed to search locations");
      }

      const data: GeocodingResult = await response.json();

      if (!data.results) {
        return [];
      }

      return data.results.map((result: any) => ({
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude,
        country: result.country,
        admin1: result.admin1,
      }));
    } catch (error) {
      console.error("Error searching locations:", error);
      return [];
    }
  }

  static async getWeatherForecast(
    latitude: number,
    longitude: number,
  ): Promise<WeatherData> {
    const params = {
      latitude,
      longitude,
      current: ["temperature_2m", "wind_speed_10m", "relative_humidity_2m"],
      hourly: ["temperature_2m", "relative_humidity_2m", "wind_speed_10m"],
    };

    try {
      const responses = await fetchWeatherApi(FORECAST_API, params);

      const response = responses[0];

      const utcOffsetSeconds = response.utcOffsetSeconds();
      const timezone = response.timezone();
      const timezoneAbbreviation = response.timezoneAbbreviation();
      const latitude_result = response.latitude();
      const longitude_result = response.longitude();
      const elevation = response.elevation();

      const current = response.current()!;
      const hourly = response.hourly()!;

      const range = (start: number, stop: number, step: number) =>
        Array.from(
          { length: (stop - start) / step },
          (_, i) => start + i * step,
        );

      const weatherData: WeatherData = {
        latitude: latitude_result,
        longitude: longitude_result,
        elevation,
        generationtime_ms: 0,
        utc_offset_seconds: utcOffsetSeconds,
        timezone: timezone ?? "UTC",
        timezone_abbreviation: timezoneAbbreviation ?? "UTC",
        current: {
          time: new Date(
            (Number(current.time()) + utcOffsetSeconds) * 1000,
          ).toISOString(),
          temperature_2m: current.variables(0)!.value(),
          wind_speed_10m: current.variables(1)!.value(),
          relative_humidity_2m: current.variables(2)!.value(),
          interval: Number(current.interval()),
        },
        current_units: {
          time: "iso8601",
          temperature_2m: "°C",
          wind_speed_10m: "km/h",
          relative_humidity_2m: "%",
          interval: "seconds",
        },
        hourly: {
          time: range(
            Number(hourly.time()),
            Number(hourly.timeEnd()),
            hourly.interval(),
          ).map((t) =>
            new Date((t + utcOffsetSeconds) * 1000).toISOString().slice(0, 16),
          ),
          temperature_2m: Array.from(hourly.variables(0)!.valuesArray() || []),
          relative_humidity_2m: Array.from(
            hourly.variables(1)!.valuesArray() || [],
          ),
          wind_speed_10m: Array.from(hourly.variables(2)!.valuesArray() || []),
        },
        hourly_units: {
          time: "iso8601",
          temperature_2m: "°C",
          relative_humidity_2m: "%",
          wind_speed_10m: "km/h",
        },
      };

      return weatherData;
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw new Error("Failed to fetch weather data");
    }
  }
}
