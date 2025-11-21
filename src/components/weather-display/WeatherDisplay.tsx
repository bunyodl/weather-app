import type { WeatherData, Location } from "../../types/weather.types";
import {
  WeatherCard,
  HourlyForecast,
  DailyForecast,
  TemperatureChart,
  WeatherStats,
  HumidityForecast,
  WindForecast,
} from "../index";
import { formatLocationName } from "../../utils/formatLocationName";
import styles from "./WeatherDisplay.module.css";

interface WeatherDisplayProps {
  data: WeatherData;
  location: Location;
}

export function WeatherDisplay(props: WeatherDisplayProps) {
  return (
    <div class={styles.weatherContainer}>
      <div class={styles.mainSection}>
        <WeatherCard
          data={props.data}
          locationName={formatLocationName(props.location)}
        />
        <WeatherStats data={props.data} />
      </div>

      <div class={styles.forecastSection}>
        <HourlyForecast
          data={props.data}
          hours={48}
        />
        <HumidityForecast
          data={props.data}
          hours={48}
        />
        <WindForecast
          data={props.data}
          hours={48}
        />
      </div>

      <div class={styles.forecastSection}>
        <DailyForecast
          data={props.data}
          days={7}
        />
      </div>

      <div class={styles.chartSection}>
        <TemperatureChart
          data={props.data}
          hours={168}
        />
      </div>
    </div>
  );
}
