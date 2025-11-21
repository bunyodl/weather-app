import type {
  DailyData,
  HourlyData,
  WeatherData,
} from "../types/weather.types";

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
    const date = new Date(time);
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
    const date = new Date(time);
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

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
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
