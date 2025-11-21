# Weather Dashboard

A modern, interactive weather dashboard built with SolidJS and the Open-Meteo API.

## Features

- 🔍 **Location Search** - Search for any city worldwide using geocoding
- 🌡️ **Current Weather** - Real-time temperature and wind speed
- 📊 **Hourly Forecast** - Visual hourly temperature forecast (up to 7 days)
- 📅 **Daily Forecast** - Daily min/max temperatures with gradient bars
- 📈 **Temperature Charts** - Interactive line charts using Chart.js
- 📊 **Statistics** - Max, min, average, and temperature range
- 🎨 **Modern UI** - Clean, responsive design with smooth animations

## Technology Stack

- **SolidJS** - Reactive UI framework
- **TypeScript** - Type-safe development
- **OpenMeteo API** - Weather data provider
- **Chart.js** - Data visualization
- **Lucide Icons** - Beautiful icon set
- **Vite** - Fast build tool

## Project Structure

```
src/
├── components/           # UI Components
│   ├── WeatherCard.tsx   # Main weather display card
│   ├── HourlyForecast.tsx # Hourly temperature view
│   ├── DailyForecast.tsx  # Daily forecast view
│   ├── TemperatureChart.tsx # Chart visualization
│   ├── WeatherStats.tsx   # Statistics display
│   ├── LocationSearch.tsx # Location search component
│   └── *.css             # Component styles
├── services/             # Business Logic
│   └── weather.service.ts # Weather API service
├── types/                # TypeScript Types
│   └── weather.types.ts  # Weather data interfaces
├── utils/                # Utility Functions
│   └── weather.utils.ts  # Weather helpers
├── App.tsx               # Main app component
└── index.tsx             # Entry point
```

## Architecture & Design Patterns

### Separation of Concerns

1. **Components** - Pure UI components that receive props and render
2. **Services** - Handle all API communication and data fetching
3. **Utils** - Pure functions for data transformation
4. **Types** - Centralized type definitions

### Service Layer

The `WeatherService` class provides two main methods:

```typescript
// Search for locations by name
WeatherService.searchLocations(query: string): Promise<Location[]>

// Get weather forecast for coordinates
WeatherService.getWeatherForecast(lat: number, lon: number): Promise<WeatherData>
```

### Data Flow

1. User searches for a location
2. `LocationSearch` component calls `WeatherService.searchLocations()`
3. User selects a location
4. `App.tsx` calls `WeatherService.getWeatherForecast()`
5. Weather data flows down to all display components

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## API Usage

This app uses the **Open-Meteo Forecast API** which provides:

- Current weather conditions
- Hourly forecasts (up to 7 days)
- No API key required
- Free for non-commercial use

**API Endpoint:**
```
https://api.open-meteo.com/v1/forecast
```

**Parameters:**
- `latitude` & `longitude` - Location coordinates
- `current` - Current weather variables (temperature, wind speed)
- `hourly` - Hourly forecast variables (temperature, humidity, wind)

## Components API

### WeatherCard

```tsx
<WeatherCard
  data={weatherData}
  locationName="Berlin, Germany"
/>
```

### HourlyForecast

```tsx
<HourlyForecast
  data={weatherData}
  hours={48}  // Optional, default: 24
/>
```

### DailyForecast

```tsx
<DailyForecast
  data={weatherData}
  days={7}    // Optional, default: 7
/>
```

### TemperatureChart

```tsx
<TemperatureChart
  data={weatherData}
  hours={168} // Optional, default: 48
/>
```

### WeatherStats

```tsx
<WeatherStats data={weatherData} />
```

### LocationSearch

```tsx
<LocationSearch
  onLocationSelect={(location) => {
    // Handle location selection
  }}
/>
```

## Utility Functions

### getCurrentTemperature
```typescript
getCurrentTemperature(data: WeatherData): number
```

### getHourlyForecast
```typescript
getHourlyForecast(
  times: string[],
  temperatures: number[],
  hours?: number
): HourlyData[]
```

### getDailyForecast
```typescript
getDailyForecast(
  times: string[],
  temperatures: number[],
  days?: number
): DailyData[]
```

### formatTime
```typescript
formatTime(dateString: string): string
// Example: "2025-11-21T14:00" → "2 PM"
```

### formatDate
```typescript
formatDate(dateString: string): string
// Example: "2025-11-21T14:00" → "Thu, Nov 21"
```

### getTemperatureColor
```typescript
getTemperatureColor(temp: number): string
// Returns color hex code based on temperature
```

## Color Coding

Temperature colors are dynamically assigned:

- 🔴 **Hot** (≥30°C): Red (#ef4444)
- 🟠 **Warm** (≥20°C): Orange (#f59e0b)
- 🟡 **Mild** (≥10°C): Yellow (#eab308)
- 🔵 **Cool** (≥0°C): Blue (#3b82f6)
- 🟣 **Cold** (<0°C): Indigo (#6366f1)

## Clean Code Principles

This project follows:

- ✅ **SOLID Principles** - Single responsibility, dependency injection
- ✅ **KISS** - Keep It Simple, Stupid
- ✅ **DRY** - Don't Repeat Yourself
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **Separation of Concerns** - Clear layer boundaries
- ✅ **Pure Functions** - Predictable utility functions
- ✅ **Guard Clauses** - Early returns for clarity

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

## Credits

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Icons by [Lucide](https://lucide.dev/)
