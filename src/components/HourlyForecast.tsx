import { type Component, For } from "solid-js";
import type { WeatherData } from "../types/weather.types";
import {
  getHourlyForecast,
  formatTime,
  getTemperatureColor,
  isWeatherData,
} from "../utils/weather.utils";
import "./HourlyForecast.css";

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
    <div class="hourly-forecast">
      <h3 class="forecast-title">Hourly Forecast</h3>
      <div class="hourly-scroll">
        <For each={hourlyData()}>
          {(hour) => (
            <div class="hourly-item">
              <p class="hour-time">{formatTime(hour.time)}</p>
              <div
                class="hour-temp-bar"
                style={{
                  height: `${Math.max(30, Math.abs(hour.temperature) * 2)}px`,
                  "background-color": getTemperatureColor(hour.temperature),
                }}
              />
              <p
                class="hour-temp"
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
