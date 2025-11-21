import { type Component, onMount } from "solid-js";
import { Chart, Title, Tooltip, Legend, Colors } from "chart.js";
import { Line } from "solid-chartjs";
import type { WeatherData } from "../../types/weather.types";
import { getHourlyForecast, isWeatherData } from "../../utils/weather.utils";
import styles from "./TemperatureChart.module.css";

interface TemperatureChartProps {
  data: WeatherData | null;
  hours?: number;
}

export const TemperatureChart: Component<TemperatureChartProps> = (props) => {
  if (!isWeatherData(props.data)) return null;

  const data = props.data;

  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors);
  });

  const chartData = () => {
    const hourlyData = getHourlyForecast(
      data.hourly.time,
      data.hourly.temperature_2m,
      props.hours || 48,
    );

    return {
      labels: hourlyData.map((hour) => {
        const date = new Date(hour.time);
        return date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
        });
      }),
      datasets: [
        {
          label: `Temperature (${data.hourly_units.temperature_2m})`,
          data: hourlyData.map((hour) => hour.temperature),
          borderColor: "rgb(99, 102, 241)",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 5,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: (value: number) => `${value}°`,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div class={styles.temperatureChart}>
      <h3 class={styles.chartTitle}>Temperature Trend</h3>
      <div class={styles.chartContainer}>
        <Line
          data={chartData()}
          options={chartOptions}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
};

