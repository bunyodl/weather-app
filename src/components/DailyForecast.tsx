import { type Component, For } from "solid-js";
import { ArrowDown, ArrowUp } from "lucide-solid";
import type { WeatherData } from "../types/weather.types";
import {
  getDailyForecast,
  formatDate,
  getTemperatureColor,
  isWeatherData,
} from "../utils/weather.utils";
import "./DailyForecast.css";

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
    <div class="daily-forecast">
      <h3 class="forecast-title">Daily Forecast</h3>
      <div class="daily-list">
        <For each={dailyData()}>
          {(day) => (
            <div class="daily-item">
              <div class="daily-date">
                <p class="date-text">{formatDate(day.date)}</p>
              </div>

              <div class="daily-temps">
                <div class="temp-high">
                  <ArrowUp size={16} />
                  <span style={{ color: getTemperatureColor(day.maxTemp) }}>
                    {day.maxTemp.toFixed(1)}°
                  </span>
                </div>

                <div class="temp-bar-container">
                  <div
                    class="temp-bar"
                    style={{
                      background: `linear-gradient(90deg,
                        ${getTemperatureColor(day.minTemp)} 0%,
                        ${getTemperatureColor(day.avgTemp)} 50%,
                        ${getTemperatureColor(day.maxTemp)} 100%)`,
                    }}
                  />
                </div>

                <div class="temp-low">
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
