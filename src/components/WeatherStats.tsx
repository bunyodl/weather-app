import { type Component, createMemo } from "solid-js";
import { Thermometer, TrendingUp, TrendingDown, Activity } from "lucide-solid";
import type { WeatherData } from "../types/weather.types";
import "./WeatherStats.css";

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
    <div class="weather-stats">
      <h3 class="stats-title">Statistics</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style={{ "background-color": "#ef4444" }}>
            <TrendingUp size={24} />
          </div>
          <div class="stat-content">
            <p class="stat-label">Maximum</p>
            <p class="stat-value">{stats().max.toFixed(1)}°</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style={{ "background-color": "#3b82f6" }}>
            <TrendingDown size={24} />
          </div>
          <div class="stat-content">
            <p class="stat-label">Minimum</p>
            <p class="stat-value">{stats().min.toFixed(1)}°</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style={{ "background-color": "#8b5cf6" }}>
            <Thermometer size={24} />
          </div>
          <div class="stat-content">
            <p class="stat-label">Average</p>
            <p class="stat-value">{stats().avg.toFixed(1)}°</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style={{ "background-color": "#f59e0b" }}>
            <Activity size={24} />
          </div>
          <div class="stat-content">
            <p class="stat-label">Range</p>
            <p class="stat-value">{stats().range.toFixed(1)}°</p>
          </div>
        </div>
      </div>
    </div>
  );
};

