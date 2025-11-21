# Weather Components Documentation

All components created for displaying weather data from Open-Meteo API.

## Components Overview

### 1. WeatherCard
Main weather card displaying current temperature and location information.

**Props:**
- `data: WeatherData` - Full weather data object

**Features:**
- Shows current temperature with large display
- Dynamic weather icon based on temperature
- Location coordinates and timezone
- Elevation and data point count
- Beautiful gradient background

---

### 2. HourlyForecast
Displays hourly temperature forecast in a scrollable horizontal layout.

**Props:**
- `data: WeatherData` - Full weather data object
- `hours?: number` - Number of hours to display (default: 24)

**Features:**
- Scrollable horizontal list
- Visual temperature bars with color coding
- Time formatting (12-hour format)
- Temperature color coding based on value

---

### 3. DailyForecast
Shows daily temperature forecast with min/max temperatures.

**Props:**
- `data: WeatherData` - Full weather data object
- `days?: number` - Number of days to display (default: 7)

**Features:**
- Daily min/max/average temperatures
- Visual temperature gradient bars
- Date formatting (weekday, month, day)
- Up/down arrows for high/low temps

---

### 4. TemperatureChart
Line chart visualization of temperature trends over time.

**Props:**
- `data: WeatherData` - Full weather data object
- `hours?: number` - Number of hours to display (default: 48)

**Features:**
- Interactive line chart using Chart.js
- Smooth curved lines
- Hover tooltips
- Responsive design
- Custom date/time formatting on x-axis

---

### 5. WeatherStats
Statistical overview of temperature data.

**Props:**
- `data: WeatherData` - Full weather data object

**Features:**
- Maximum temperature
- Minimum temperature
- Average temperature
- Temperature range
- Color-coded stat cards with icons

---

## Utilities

### weather.utils.ts

**Functions:**

- `getCurrentTemperature(times: string[], temperatures: number[]): number`
  - Returns current temperature based on current time

- `getHourlyForecast(times: string[], temperatures: number[], hours?: number): HourlyData[]`
  - Returns hourly forecast data for specified number of hours

- `getDailyForecast(times: string[], temperatures: number[], days?: number): DailyData[]`
  - Returns daily forecast data (aggregated from hourly) for specified days

- `formatTime(dateString: string): string`
  - Formats ISO datetime to readable time (e.g., "3 PM")

- `formatDate(dateString: string): string`
  - Formats ISO datetime to readable date (e.g., "Mon, Jan 1")

- `getTemperatureColor(temp: number): string`
  - Returns color hex code based on temperature value
  - Hot (≥30°C): Red (#ef4444)
  - Warm (≥20°C): Orange (#f59e0b)
  - Mild (≥10°C): Yellow (#eab308)
  - Cool (≥0°C): Blue (#3b82f6)
  - Cold (<0°C): Indigo (#6366f1)

---

## Types

### weather.types.ts

**Interfaces:**

```typescript
interface WeatherData {
  elevation: number;
  generationtime_ms: number;
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
  };
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

interface HourlyData {
  time: string;
  temperature: number;
}

interface DailyData {
  date: string;
  minTemp: number;
  maxTemp: number;
  avgTemp: number;
}
```

---

## Usage Example

```tsx
import { WeatherData } from "./types/weather.types";
import {
  WeatherCard,
  HourlyForecast,
  DailyForecast,
  TemperatureChart,
  WeatherStats,
} from "./components";

function App() {
  const [weatherData, setWeatherData] = createSignal<WeatherData | null>(null);

  return (
    <Show when={weatherData()}>
      <WeatherCard data={weatherData()!} />
      <HourlyForecast data={weatherData()!} hours={48} />
      <DailyForecast data={weatherData()!} days={14} />
      <TemperatureChart data={weatherData()!} hours={168} />
      <WeatherStats data={weatherData()!} />
    </Show>
  );
}
```

---

## Dependencies

- **solid-js**: ^1.9.10
- **lucide-solid**: ^0.554.0 (icons)
- **chart.js**: Latest (charting)
- **solid-chartjs**: Latest (SolidJS Chart.js wrapper)

---

## Styling

Each component has its own CSS file with:
- Modern, clean design
- Responsive layouts
- Smooth transitions and hover effects
- Color-coded temperature displays
- Mobile-friendly breakpoints

