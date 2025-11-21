import { type Component, For } from "solid-js";
import { ArrowDown, ArrowUp } from "lucide-solid";
import type { WeatherData } from "../../types/weather.types";
import {
  getDailyForecast,
  formatDate,
  getTemperatureColor,
  isWeatherData,
} from "../../utils/weather.utils";
import styles from "./DailyForecast.module.css";

interface DailyForecastProps {
  data: WeatherData | null;
  days?: number;
}

export const DailyForecast: Component<DailyForecastProps> = (props) => {
  if (!isWeatherData(props.data)) return null;

  const data = props.data;

  const dailyData = () =>
    getDailyForecast(
      data.hourly.time,
      data.hourly.temperature_2m,
      props.days || 7,
    );

  return (
    <div class={styles.dailyForecast}>
      <h3 class={styles.forecastTitle}>Daily Forecast</h3>
      <div class={styles.dailyList}>
        <For each={dailyData()}>
          {(day) => (
            <div class={styles.dailyItem}>
              <div class={styles.dailyDate}>
                <p class={styles.dateText}>{formatDate(day.date)}</p>
              </div>

              <div class={styles.dailyTemps}>
                <div class={styles.tempHigh}>
                  <ArrowUp size={16} />
                  <span style={{ color: getTemperatureColor(day.maxTemp) }}>
                    {day.maxTemp.toFixed(1)}°
                  </span>
                </div>

                <div class={styles.tempBarContainer}>
                  <div
                    class={styles.tempBar}
                    style={{
                      background: `linear-gradient(90deg,
                        ${getTemperatureColor(day.minTemp)} 0%,
                        ${getTemperatureColor(day.avgTemp)} 50%,
                        ${getTemperatureColor(day.maxTemp)} 100%)`,
                    }}
                  />
                </div>

                <div class={styles.tempLow}>
                  <ArrowDown size={16} />
                  <span style={{ color: getTemperatureColor(day.minTemp) }}>
                    {day.minTemp.toFixed(1)}°
                  </span>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

