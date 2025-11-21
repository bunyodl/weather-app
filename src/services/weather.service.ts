import { fetchWeatherApi } from "openmeteo";
import type {
  WeatherData,
  Location,
  GeocodingResult,
} from "../types/weather.types";

const GEOCODING_API = import.meta.env.VITE_OPEN_METEO_GEOCODING_API_URL;
const FORECAST_API = import.meta.env.VITE_OPEN_METEO_FORECAST_API_URL;
const BIGDATACLOUD_API =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
const IP_API = "http://ip-api.com/json/";

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

  static async reverseGeocode(
    latitude: number,
    longitude: number,
  ): Promise<Location | null> {
    const location = await this.reverseGeocodeOpenMeteo(latitude, longitude);
    if (location) return location;

    console.warn("Open-Meteo geocoding failed, trying IP-based location...");
    const ipLocation = await this.getLocationFromIP();
    if (ipLocation) return ipLocation;

    console.warn("IP-based location failed, trying BigDataCloud...");
    const bigDataLocation = await this.reverseGeocodeBigDataCloud(
      latitude,
      longitude,
    );
    if (bigDataLocation) return bigDataLocation;

    console.warn("All reverse geocoding attempts failed");
    return null;
  }

  private static async reverseGeocodeOpenMeteo(
    latitude: number,
    longitude: number,
  ): Promise<Location | null> {
    try {
      const response = await fetch(
        `${GEOCODING_API}?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`,
      );

      if (!response.ok) {
        throw new Error("Failed to reverse geocode");
      }

      const data: GeocodingResult = await response.json();

      if (!data.results || data.results.length === 0) {
        return null;
      }

      const result = data.results[0];

      if (!result.name && !result.country) {
        return null;
      }

      return {
        name: result.name || result.admin1 || result.country || "Your Location",
        latitude: result.latitude,
        longitude: result.longitude,
        country: result.country,
        admin1: result.admin1,
      };
    } catch (error) {
      console.error("Error with Open-Meteo reverse geocoding:", error);
      return null;
    }
  }

  private static async reverseGeocodeBigDataCloud(
    latitude: number,
    longitude: number,
  ): Promise<Location | null> {
    try {
      const response = await fetch(
        `${BIGDATACLOUD_API}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      );

      if (!response.ok) {
        throw new Error("Failed to reverse geocode with BigDataCloud");
      }

      const data = await response.json();

      if (!data.locality && !data.city && !data.countryName) {
        return null;
      }

      const name =
        data.city ||
        data.locality ||
        data.principalSubdivision ||
        data.countryName ||
        "Your Location";

      return {
        name,
        latitude,
        longitude,
        country: data.countryName,
        admin1: data.principalSubdivision,
      };
    } catch (error) {
      console.error("Error with BigDataCloud reverse geocoding:", error);
      return null;
    }
  }

  static async getLocationFromIP(): Promise<Location | null> {
    try {
      const response = await fetch(
        `${IP_API}?fields=status,city,country,lat,lon,regionName`,
      );

      if (!response.ok) {
        throw new Error("Failed to get location from IP");
      }

      const data = await response.json();

      if (data.status !== "success") {
        return null;
      }

      return {
        name: data.city || data.regionName || data.country || "Your Location",
        latitude: data.lat,
        longitude: data.lon,
        country: data.country,
        admin1: data.regionName,
      };
    } catch (error) {
      console.error("Error getting location from IP:", error);
      return null;
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
