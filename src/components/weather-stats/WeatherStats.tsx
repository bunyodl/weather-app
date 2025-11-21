import { type Component, createMemo } from "solid-js";
import { Thermometer, TrendingUp, TrendingDown, Activity } from "lucide-solid";
import type { WeatherData } from "../../types/weather.types";
import styles from "./WeatherStats.module.css";

interface WeatherStatsProps {
  data: WeatherData;
}

export const WeatherStats: Component<WeatherStatsProps> = (props) => {
  const stats = createMemo(() => {
    const temps = props.data.hourly.temperature_2m;
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    const avg = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
    const range = max - min;

    return { min, max, avg, range };
  });

  return (
    <div class={styles.weatherStats}>
      <h3 class={styles.statsTitle}>Statistics</h3>
      <div class={styles.statsGrid}>
        <div class={styles.statCard}>
          <div class={styles.statIcon} style={{ "background-color": "#ef4444" }}>
            <TrendingUp size={24} />
          </div>
          <div class={styles.statContent}>
            <p class={styles.statLabel}>Maximum</p>
            <p class={styles.statValue}>{stats().max.toFixed(1)}°</p>
          </div>
        </div>

        <div class={styles.statCard}>
          <div class={styles.statIcon} style={{ "background-color": "#3b82f6" }}>
            <TrendingDown size={24} />
          </div>
          <div class={styles.statContent}>
            <p class={styles.statLabel}>Minimum</p>
            <p class={styles.statValue}>{stats().min.toFixed(1)}°</p>
          </div>
        </div>

        <div class={styles.statCard}>
          <div class={styles.statIcon} style={{ "background-color": "#8b5cf6" }}>
            <Thermometer size={24} />
          </div>
          <div class={styles.statContent}>
            <p class={styles.statLabel}>Average</p>
            <p class={styles.statValue}>{stats().avg.toFixed(1)}°</p>
          </div>
        </div>

        <div class={styles.statCard}>
          <div class={styles.statIcon} style={{ "background-color": "#f59e0b" }}>
            <Activity size={24} />
          </div>
          <div class={styles.statContent}>
            <p class={styles.statLabel}>Range</p>
            <p class={styles.statValue}>{stats().range.toFixed(1)}°</p>
          </div>
        </div>
      </div>
    </div>
  );
};

