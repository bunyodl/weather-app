import { type Component, For } from "solid-js";
import { Wind } from "lucide-solid";
import type { WeatherData } from "../../types/weather.types";
import { formatTime, isWeatherData } from "../../utils/weather.utils";
import styles from "./WindForecast.module.css";

interface WindForecastProps {
  data: WeatherData | null;
  hours?: number;
}

interface HourlyWindData {
  time: string;
  windSpeed: number;
}

const getHourlyWind = (
  times: string[],
  windSpeeds: number[],
  hours: number = 24,
): HourlyWindData[] => {
  const now = new Date();
  const startIndex = times.findIndex((time) => {
    const date = new Date(time);
    return date >= now;
  });

  if (startIndex === -1) return [];

  return times.slice(startIndex, startIndex + hours).map((time, index) => ({
    time,
    windSpeed: windSpeeds[startIndex + index],
  }));
};

const getWindColor = (windSpeed: number): string => {
  if (windSpeed >= 30) return "#ef4444";
  if (windSpeed >= 20) return "#f59e0b";
  if (windSpeed >= 10) return "#eab308";
  if (windSpeed >= 5) return "#10b981";
  return "#3b82f6";
};

const getWindLabel = (windSpeed: number): string => {
  if (windSpeed >= 30) return "Strong";
  if (windSpeed >= 20) return "Moderate";
  if (windSpeed >= 10) return "Light";
  if (windSpeed >= 5) return "Gentle";
  return "Calm";
};

export const WindForecast: Component<WindForecastProps> = (props) => {
  if (!isWeatherData(props.data)) return null;

  const data = props.data;

  const hourlyData = () =>
    getHourlyWind(
      data.hourly.time,
      data.hourly.wind_speed_10m,
      props.hours || 24,
    );

  return (
    <div class={styles.windForecast}>
      <div class={styles.header}>
        <Wind size={24} />
        <h3 class={styles.title}>Wind Speed Forecast</h3>
      </div>
      <div class={styles.hourlyScroll}>
        <For each={hourlyData()}>
          {(hour) => (
            <div class={styles.hourlyItem}>
              <p class={styles.hourTime}>{formatTime(hour.time)}</p>
              <div class={styles.windIndicator}>
                <Wind
                  size={32}
                  style={{ color: getWindColor(hour.windSpeed) }}
                />
              </div>
              <p
                class={styles.windSpeed}
                style={{ color: getWindColor(hour.windSpeed) }}
              >
                {hour.windSpeed.toFixed(1)}
              </p>
              <p class={styles.windLabel}>{getWindLabel(hour.windSpeed)}</p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

