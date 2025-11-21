import { type Component } from "solid-js";
import { CloudRain, Sun, Cloud, CloudSnow, Wind, Droplets } from "lucide-solid";
import type { WeatherData } from "../../types/weather.types";
import { getCurrentTemperature } from "../../utils/weather.utils";
import styles from "./WeatherCard.module.css";

interface WeatherCardProps {
  data: WeatherData;
  locationName?: string;
}

const getWeatherIcon = (temp: number) => {
  if (temp >= 25) return Sun;
  if (temp >= 15) return Cloud;
  if (temp >= 0) return CloudRain;
  return CloudSnow;
};

export const WeatherCard: Component<WeatherCardProps> = (props) => {
  const currentTemp = () => getCurrentTemperature(props.data);

  const WeatherIcon = () => {
    const Icon = getWeatherIcon(currentTemp());
    return <Icon size={80} />;
  };

  return (
    <div class={styles.weatherCard}>
      <div class={styles.weatherCardHeader}>
        <div class={styles.locationInfo}>
          <h2>Current Weather</h2>
          {props.locationName && (
            <p class={styles.locationName}>{props.locationName}</p>
          )}
          <p class={styles.location}>
            {props.data.latitude.toFixed(2)}°, {props.data.longitude.toFixed(2)}
            °
          </p>
          <p class={styles.timezone}>{props.data.timezone}</p>
        </div>
      </div>

      <div class={styles.weatherCardBody}>
        <div class={styles.weatherIcon}>
          <WeatherIcon />
        </div>
        <div class={styles.temperatureDisplay}>
          <span class={styles.temperature}>{currentTemp().toFixed(1)}</span>
          <span class={styles.unit}>{props.data.current_units.temperature_2m}</span>
        </div>
      </div>

      <div class={styles.weatherCardFooter}>
        <div class={styles.weatherStat}>
          <Wind size={20} />
          <div>
            <p class={styles.statLabel}>Wind Speed</p>
            <p class={styles.statValue}>
              {props.data.current.wind_speed_10m.toFixed(1)}{" "}
              {props.data.current_units.wind_speed_10m}
            </p>
          </div>
        </div>
        <div class={styles.weatherStat}>
          <Droplets size={20} />
          <div>
            <p class={styles.statLabel}>Humidity</p>
            <p class={styles.statValue}>
              {props.data.current.relative_humidity_2m.toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

