import { type Component } from "solid-js";
import { CloudRain, Sun, Cloud, CloudSnow, Wind } from "lucide-solid";
import type { WeatherData } from "../types/weather.types";
import { getCurrentTemperature } from "../utils/weather.utils";
import "./WeatherCard.css";

interface WeatherCardProps {
  data: WeatherData;
}

const getWeatherIcon = (temp: number) => {
  if (temp >= 25) return Sun;
  if (temp >= 15) return Cloud;
  if (temp >= 0) return CloudRain;
  return CloudSnow;
};

export const WeatherCard: Component<WeatherCardProps> = (props) => {
  const currentTemp = () =>
    getCurrentTemperature(
      props.data.hourly.time,
      props.data.hourly.temperature_2m,
    );

  const WeatherIcon = () => {
    const Icon = getWeatherIcon(currentTemp());
    return <Icon size={80} />;
  };

  return (
    <div class="weather-card">
      <div class="weather-card-header">
        <div class="location-info">
          <h2>Current Weather</h2>
          <p class="location">
            {props.data.latitude.toFixed(2)}°, {props.data.longitude.toFixed(2)}
            °
          </p>
          <p class="timezone">{props.data.timezone}</p>
        </div>
      </div>

      <div class="weather-card-body">
        <div class="weather-icon">
          <WeatherIcon />
        </div>
        <div class="temperature-display">
          <span class="temperature">{currentTemp().toFixed(1)}</span>
          <span class="unit">{props.data.hourly_units.temperature_2m}</span>
        </div>
      </div>

      <div class="weather-card-footer">
        <div class="weather-stat">
          <Wind size={20} />
          <div>
            <p class="stat-label">Elevation</p>
            <p class="stat-value">{props.data.elevation}m</p>
          </div>
        </div>
        <div class="weather-stat">
          <Cloud size={20} />
          <div>
            <p class="stat-label">Data Points</p>
            <p class="stat-value">{props.data.hourly.time.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
