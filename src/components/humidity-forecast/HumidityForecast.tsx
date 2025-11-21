import { type Component, For } from "solid-js";
import { Droplets } from "lucide-solid";
import type { WeatherData } from "../../types/weather.types";
import { formatTime, isWeatherData } from "../../utils/weather.utils";
import styles from "./HumidityForecast.module.css";

interface HumidityForecastProps {
  data: WeatherData | null;
  hours?: number;
  timezone: string;
  timezoneAbbr: string;
}

interface HourlyHumidityData {
  time: string;
  humidity: number;
}

const parseUTCDateString = (dateString: string): Date => {
  if (dateString.endsWith("Z")) {
    return new Date(dateString);
  }
  return new Date(dateString + "Z");
};

const getHourlyHumidity = (
  times: string[],
  humidity: number[],
  hours: number = 24,
): HourlyHumidityData[] => {
  const now = new Date();
  const startIndex = times.findIndex((time) => {
    const date = parseUTCDateString(time);
    return date >= now;
  });

  if (startIndex === -1) return [];

  return times.slice(startIndex, startIndex + hours).map((time, index) => ({
    time,
    humidity: humidity[startIndex + index],
  }));
};

const getHumidityColor = (humidity: number): string => {
  if (humidity >= 80) return "#06b6d4";
  if (humidity >= 60) return "#3b82f6";
  if (humidity >= 40) return "#8b5cf6";
  if (humidity >= 20) return "#ec4899";
  return "#ef4444";
};

export const HumidityForecast: Component<HumidityForecastProps> = (props) => {
  if (!isWeatherData(props.data)) return null;

  const data = props.data;

  const hourlyData = () =>
    getHourlyHumidity(
      data.hourly.time,
      data.hourly.relative_humidity_2m,
      props.hours || 24,
    );

  return (
    <div class={styles.humidityForecast}>
      <div class={styles.header}>
        <div class={styles.titleWrapper}>
          <Droplets size={24} />
          <h3 class={styles.title}>Humidity Forecast</h3>
        </div>
        <p class={styles.timezoneText}>Times in {props.timezoneAbbr}</p>
      </div>
      <div class={styles.hourlyScroll}>
        <For each={hourlyData()}>
          {(hour) => (
            <div class={styles.hourlyItem}>
              <p class={styles.hourTime}>
                {formatTime(hour.time, props.timezone)}
              </p>
              <div
                class={styles.humidityBar}
                style={{
                  height: `${Math.max(30, hour.humidity)}px`,
                  "background-color": getHumidityColor(hour.humidity),
                }}
              />
              <p
                class={styles.humidityValue}
                style={{ color: getHumidityColor(hour.humidity) }}
              >
                {hour.humidity.toFixed(0)}%
              </p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
