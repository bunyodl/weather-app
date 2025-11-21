import type {
  DailyData,
  HourlyData,
  WeatherData,
} from "../types/weather.types";
import { formatTimeInTimezone } from "./timezone";

export const getCurrentTemperature = (data: WeatherData): number => {
  return data.current.temperature_2m;
};

export const getHourlyForecast = (
  times: string[],
  temperatures: number[],
  hours: number = 24,
): HourlyData[] => {
  const now = new Date();
  const startIndex = times.findIndex((time) => {
    const date = parseUTCDateString(time);
    return date >= now;
  });

  if (startIndex === -1) return [];

  return times.slice(startIndex, startIndex + hours).map((time, index) => ({
    time,
    temperature: temperatures[startIndex + index],
  }));
};

export const getDailyForecast = (
  times: string[],
  temperatures: number[],
  days: number = 7,
): DailyData[] => {
  const now = new Date();
  const startIndex = times.findIndex((time) => {
    const date = parseUTCDateString(time);
    return date >= now;
  });

  if (startIndex === -1) return [];

  const dailyData: DailyData[] = [];
  const endIndex = Math.min(startIndex + days * 24, times.length);

  for (let i = startIndex; i < endIndex; i += 24) {
    const dayTemps = temperatures.slice(
      i,
      Math.min(i + 24, temperatures.length),
    );

    if (dayTemps.length === 0) continue;

    const date = times[i];

    dailyData.push({
      date,
      minTemp: Math.min(...dayTemps),
      maxTemp: Math.max(...dayTemps),
      avgTemp: dayTemps.reduce((sum, temp) => sum + temp, 0) / dayTemps.length,
    });
  }

  return dailyData;
};

export const formatTime = (
  dateString: string,
  timezone: string = "UTC",
): string => {
  return formatTimeInTimezone(dateString, timezone);
};

const parseUTCDateString = (dateString: string): Date => {
  // Remove any trailing non-date/time characters (like timezone abbreviations etc.)
  // Keep only the date and time part up to potential Z or last digit (ISO8601)
  // Example: "2024-06-16T12:45:00EDT" => "2024-06-16T12:45:00"
  // Example: "2024-06-16T12:45:00Z" => okay as is

  // Extract only ISO date-time + optional 'Z'
  const match = dateString.match(
    /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?)(Z)?/,
  );
  if (match) {
    // "Z" present? Use ISO; otherwise, treat as UTC
    const base = match[1];
    const z = match[2] || "";
    return new Date(base + z || "Z");
  }
  // Fallback: try to parse anyway
  return new Date(dateString);
};

export const formatDate = (
  dateString: string,
  timezone: string = "UTC",
): string => {
  const date = parseUTCDateString(dateString);
  return date.toLocaleDateString("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const getTemperatureColor = (temp: number): string => {
  if (temp >= 30) return "#ef4444";
  if (temp >= 20) return "#f59e0b";
  if (temp >= 10) return "#eab308";
  if (temp >= 0) return "#3b82f6";
  return "#6366f1";
};

export function isWeatherData(data: WeatherData | null): data is WeatherData {
  return data !== null;
}
