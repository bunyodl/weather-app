import { type Component, For } from "solid-js";
import type { WeatherData } from "../../types/weather.types";
import {
  getHourlyForecast,
  formatTime,
  getTemperatureColor,
  isWeatherData,
} from "../../utils/weather.utils";
import styles from "./HourlyForecast.module.css";

interface HourlyForecastProps {
  data: WeatherData | null;
  hours?: number;
}

export const HourlyForecast: Component<HourlyForecastProps> = (props) => {
  if (!isWeatherData(props.data)) return null;

  const data = props.data;

  const hourlyData = () =>
    getHourlyForecast(
      data.hourly.time,
      data.hourly.temperature_2m,
      props.hours || 24,
    );

  return (
    <div class={styles.hourlyForecast}>
      <h3 class={styles.forecastTitle}>Hourly Temperature</h3>
      <div class={styles.hourlyScroll}>
        <For each={hourlyData()}>
          {(hour) => (
            <div class={styles.hourlyItem}>
              <p class={styles.hourTime}>{formatTime(hour.time)}</p>
              <div
                class={styles.hourTempBar}
                style={{
                  height: `${Math.max(30, Math.abs(hour.temperature) * 2)}px`,
                  "background-color": getTemperatureColor(hour.temperature),
                }}
              />
              <p
                class={styles.hourTemp}
                style={{ color: getTemperatureColor(hour.temperature) }}
              >
                {hour.temperature.toFixed(1)}°
              </p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

