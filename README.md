# Weather Dashboard

A comprehensive, modern weather dashboard built with SolidJS and the Open-Meteo API. Now using **ALL available weather data** including temperature, humidity, and wind speed!

## ✨ Features

- 📍 **Geolocation Support** - Automatically detect and show weather for your current location
- 🌐 **Smart Location Detection** - Auto-loads on every visit if permission granted
- 🏙️ **Popular Location Suggestions** - Quick access to 10 major cities worldwide
- ⚡ **Zero UI Flash** - Smart loading states prevent content jumping
- 🔍 **Location Search** - Search for any city worldwide using geocoding
- 🌡️ **Current Weather** - Real-time temperature, humidity, and wind speed
- 📊 **Hourly Temperature Forecast** - Visual hourly temperature forecast (up to 7 days)
- 💧 **Hourly Humidity Forecast** - Color-coded humidity levels over time
- 💨 **Hourly Wind Forecast** - Animated wind speed indicators
- 📅 **Daily Forecast** - Daily min/max temperatures with gradient bars
- 📈 **Temperature Charts** - Interactive line charts using Chart.js
- 📊 **Statistics** - Max, min, average, and temperature range
- 🔄 **Live Updates** - Auto-refresh every 3 minutes with smooth transitions
- ⏱️ **Last Updated** - Live timestamp that updates every second
- 🔁 **Manual Refresh** - On-demand weather data updates
- 👁️ **Smart Pausing** - Pauses updates when tab is inactive to save resources
- 🎨 **Modern UI** - Clean, responsive design with CSS Modules
- 📁 **Organized Structure** - Component-based architecture with kebab-case folders

## 🎯 Data Utilization

We now use **100% of available weather data**:

### Current Data

- ✅ Temperature (°C)
- ✅ Wind Speed (km/h)
- ✅ Relative Humidity (%)

### Hourly Forecast (168 hours)

- ✅ Temperature (°C)
- ✅ Relative Humidity (%)
- ✅ Wind Speed (km/h)

## 🔄 Live Weather Updates

The dashboard features **automatic live weather updates** with smooth, polished animations:

### Auto-Refresh System

- **Update Interval**: Every 3 minutes (180 seconds)
- **Smart Pausing**: Automatically pauses when browser tab is inactive
- **Resume on Focus**: Instantly refreshes when you return to the tab
- **Silent Updates**: Background refreshes without showing loading spinner

### User Controls

- **Last Updated Indicator**: Shows exact time or relative time (e.g., "2 minutes ago")
- **Manual Refresh Button**: Click to force an immediate update
- **Visual Feedback**: Animated spinning icon during refresh

### Smooth Transitions

All data updates feature **smooth CSS transitions**:

- Temperature values fade and transform smoothly
- Forecast bars animate height/color changes (0.3s ease)
- Charts update with built-in animations
- No jarring visual changes - everything flows naturally

### Custom Hook Architecture

The `useAutoRefresh` hook encapsulates all auto-refresh logic:

```typescript
useAutoRefresh({
  interval: 180000, // 3 minutes
  onRefresh: () => fetchWeather(),
  enabled: () => !!weatherData(),
});
```

**Benefits:**

- Reusable across different components
- Easy to test in isolation
- Configurable interval and conditions
- Clean separation of concerns

### Performance Optimizations

- **SolidJS Fine-Grained Reactivity**: Only changed values update, not entire components
- **Efficient Re-renders**: No virtual DOM diffing overhead
- **Tab Visibility API**: Stops unnecessary updates when tab is hidden
- **Minimal Network Usage**: Only fetches when needed

## 🛠️ Technology Stack

- **SolidJS** ^1.9.10 - Reactive UI framework
- **TypeScript** ~5.9.3 - Type-safe development
- **OpenMeteo Package** ^1.2.2 - Official weather API client
- **Chart.js** - Data visualization
- **solid-chartjs** - SolidJS Chart.js wrapper
- **Lucide Icons** ^0.554.0 - Beautiful icon set
- **Vite** ^7.2.4 - Fast build tool
- **CSS Modules** - Scoped styling

## 📁 Project Structure

```
src/
├── components/
│   ├── weather-card/
│   │   ├── WeatherCard.tsx
│   │   └── WeatherCard.module.css
│   ├── hourly-forecast/
│   │   ├── HourlyForecast.tsx
│   │   └── HourlyForecast.module.css
│   ├── humidity-forecast/
│   │   ├── HumidityForecast.tsx
│   │   └── HumidityForecast.module.css
│   ├── wind-forecast/
│   │   ├── WindForecast.tsx
│   │   └── WindForecast.module.css
│   ├── daily-forecast/
│   │   ├── DailyForecast.tsx
│   │   └── DailyForecast.module.css
│   ├── temperature-chart/
│   │   ├── TemperatureChart.tsx
│   │   └── TemperatureChart.module.css
│   ├── weather-stats/
│   │   ├── WeatherStats.tsx
│   │   └── WeatherStats.module.css
│   ├── location-search/
│   │   ├── LocationSearch.tsx
│   │   └── LocationSearch.module.css
│   ├── search-section/
│   │   ├── SearchSection.tsx
│   │   └── SearchSection.module.css
│   ├── status-bar/
│   │   ├── StatusBar.tsx
│   │   └── StatusBar.module.css
│   ├── weather-display/
│   │   ├── WeatherDisplay.tsx
│   │   └── WeatherDisplay.module.css
│   ├── location-permission/     ← NEW!
│   │   ├── LocationPermission.tsx
│   │   └── LocationPermission.module.css
│   ├── location-suggestions/    ← NEW!
│   │   ├── LocationSuggestions.tsx
│   │   └── LocationSuggestions.module.css
│   └── index.ts
├── hooks/
│   ├── useAutoRefresh.ts        ← Auto-refresh timer
│   ├── useWeatherData.ts        ← Data fetching logic
│   ├── useRelativeTime.ts       ← Live timestamp updates
│   └── useGeolocation.ts        ← NEW! Browser geolocation
├── services/
│   └── weather.service.ts       ← API communication layer
├── types/
│   └── weather.types.ts         ← TypeScript interfaces
├── utils/
│   ├── weather.utils.ts         ← Weather utility functions
│   └── date.utils.ts            ← Date formatting utilities
├── App.tsx                      ← Main app orchestration (119 lines)
├── App.css
├── index.tsx
└── index.css
```

## 📍 Geolocation Features

The dashboard includes **intelligent geolocation support** with privacy-first design:

### Smart Location Detection

**On First Visit:**

- Automatically checks browser location permission status
- Shows appropriate UI based on permission state

**Permission States:**

1. **📍 Prompt (Default)** - Shows beautiful permission request card

   - Friendly UI encouraging location sharing
   - Click "Share My Location" to enable

2. **✅ Granted** - Automatically loads weather for your location

   - Checks permission on every page load
   - Auto-fetches location without user interaction
   - Displays as "Your Location"
   - Instant weather data on page load
   - Works seamlessly on all future visits

3. **❌ Denied** - Shows popular location suggestions

   - 10 major cities worldwide
   - Clean grid layout with hover effects
   - Respects user privacy choice

4. **🚫 Unsupported** - Falls back to location suggestions
   - For browsers without Geolocation API support

### Popular Locations

Quick-access to 10 major cities worldwide:

- 🗽 **New York, USA**
- 🏛️ **London, UK**
- 🗼 **Tokyo, Japan**
- 🗼 **Paris, France**
- 🌊 **Sydney, Australia**
- 🏙️ **Dubai, UAE**
- 🇸🇬 **Singapore, Singapore**
- 🍁 **Toronto, Canada**
- 🇩🇪 **Berlin, Germany**
- 🇮🇳 **Mumbai, India**

### Privacy & UX

- ✅ Auto-loads location on every visit if permission granted
- ✅ Never forces location access
- ✅ Respects browser permission settings
- ✅ Shows clear prompts and alternatives
- ✅ No UI flashing - "checking" state prevents content jumps
- ✅ Works perfectly without location access

## 🎨 Architecture Principles

### 1. Separation of Concerns

- **Components** - Pure UI components with scoped CSS modules
- **Hooks** - Custom reusable logic (geolocation, auto-refresh, data fetching)
- **Services** - All API communication isolated
- **Utils** - Pure functions for data transformation
- **Types** - Centralized type definitions

### 2. Component Composition

The app uses a **modular component architecture**:

- `App.tsx` - Orchestrates data fetching and state management (119 lines)
- `SearchSection` - Composes search, permissions, and suggestions
- `StatusBar` - Displays update status and refresh controls
- `WeatherDisplay` - Composes all weather data components
- Individual forecast components - Focused, single-responsibility UI

### 3. Custom Hooks

- `useGeolocation` - Browser geolocation with permission handling
- `useWeatherData` - Encapsulates all data fetching logic
- `useAutoRefresh` - Auto-refresh with tab visibility detection
- `useRelativeTime` - Live timestamp that updates every second
- Reusable, testable, and easily configurable

### 4. CSS Modules

All components use CSS Modules to prevent style conflicts:

- Scoped class names (e.g., `styles.weatherCard`)
- No global CSS pollution
- Better maintainability

### 5. Kebab-Case Folder Structure

- Each component in its own folder
- Consistent naming convention
- Easy to locate and modify

### 6. Clean Code Principles

- ✅ SOLID principles
- ✅ Single Responsibility
- ✅ DRY (Don't Repeat Yourself)
- ✅ Type Safety with TypeScript
- ✅ Guard Clauses & Early Returns
- ✅ Minimal side effects
- ✅ Small, focused components

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_OPEN_METEO_GEOCODING_API_URL=https://geocoding-api.open-meteo.com/v1/search
VITE_OPEN_METEO_FORECAST_API_URL=https://api.open-meteo.com/v1/forecast
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 📦 Service Layer

The `WeatherService` class provides two main methods:

```typescript
// Search for locations by name
static async searchLocations(query: string): Promise<Location[]>

// Get complete weather forecast for coordinates
static async getWeatherForecast(
  latitude: number,
  longitude: number
): Promise<WeatherData>
```

### Live Update Configuration

The auto-refresh interval is configurable in `App.tsx`:

```typescript
const REFRESH_INTERVAL_MS = 180000; // 180 seconds (3 minutes)
```

You can adjust this value to any interval:

- `60000` = 1 minute
- `180000` = 3 minutes (default)
- `300000` = 5 minutes
- `900000` = 15 minutes

## 🎯 Component APIs

### WeatherCard

Shows current weather with temperature, humidity, and wind speed.

```tsx
<WeatherCard
  data={weatherData}
  locationName="Berlin, Germany"
/>
```

### HourlyForecast

Temperature forecast with color-coded bars.

```tsx
<HourlyForecast
  data={weatherData}
  hours={48} // Optional, default: 24
/>
```

### HumidityForecast ✨ NEW

Humidity levels over time with color coding.

```tsx
<HumidityForecast
  data={weatherData}
  hours={48} // Optional, default: 24
/>
```

### WindForecast ✨ NEW

Wind speed forecast with animated icons.

```tsx
<WindForecast
  data={weatherData}
  hours={48} // Optional, default: 24
/>
```

### DailyForecast

Daily min/max/average temperatures.

```tsx
<DailyForecast
  data={weatherData}
  days={7} // Optional, default: 7
/>
```

### TemperatureChart

Interactive line chart visualization.

```tsx
<TemperatureChart
  data={weatherData}
  hours={168} // Optional, default: 48
/>
```

### WeatherStats

Statistical overview of temperature data.

```tsx
<WeatherStats data={weatherData} />
```

### LocationSearch

Search and select locations.

```tsx
<LocationSearch
  onLocationSelect={(location) => {
    // Handle location selection
  }}
/>
```

## 🎨 Color Coding

### Temperature Colors

- 🔴 **Hot** (≥30°C): Red (#ef4444)
- 🟠 **Warm** (≥20°C): Orange (#f59e0b)
- 🟡 **Mild** (≥10°C): Yellow (#eab308)
- 🔵 **Cool** (≥0°C): Blue (#3b82f6)
- 🟣 **Cold** (<0°C): Indigo (#6366f1)

### Humidity Colors

- 💧 **Very High** (≥80%): Cyan (#06b6d4)
- 💦 **High** (≥60%): Blue (#3b82f6)
- 🌫️ **Moderate** (≥40%): Purple (#8b5cf6)
- 🌤️ **Low** (≥20%): Pink (#ec4899)
- ☀️ **Very Low** (<20%): Red (#ef4444)

### Wind Speed Colors

- 🌪️ **Strong** (≥30 km/h): Red (#ef4444)
- 💨 **Moderate** (≥20 km/h): Orange (#f59e0b)
- 🍃 **Light** (≥10 km/h): Yellow (#eab308)
- 🌱 **Gentle** (≥5 km/h): Green (#10b981)
- 😴 **Calm** (<5 km/h): Blue (#3b82f6)

## 🔧 Utility Functions

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
// "2025-11-21T14:00" → "2 PM"
```

### formatDate

```typescript
formatDate(dateString: string): string
// "2025-11-21T14:00" → "Thu, Nov 21"
```

### getTemperatureColor

```typescript
getTemperatureColor(temp: number): string
// Returns hex color based on temperature
```

### isWeatherData

```typescript
isWeatherData(data: WeatherData | null): data is WeatherData
// Type guard for null checking
```

## 📊 API Usage

This app uses the **Open-Meteo Forecast API**:

**Endpoint:** `https://api.open-meteo.com/v1/forecast`

**Features:**

- Current weather conditions
- Hourly forecasts (up to 7 days)
- No API key required
- Free for non-commercial use

**Parameters Used:**

- `current`: temperature_2m, wind_speed_10m, relative_humidity_2m
- `hourly`: temperature_2m, relative_humidity_2m, wind_speed_10m

## 🎯 Data Flow

```
User → LocationSearch → WeatherService.searchLocations()
                              ↓
                      User selects location
                              ↓
                WeatherService.getWeatherForecast()
                              ↓
                        WeatherData
                              ↓
            Components display all available data
                              ↓
                   Auto-refresh every 60s
                              ↓
          Silent background updates with smooth transitions
```

### Live Update Flow

```
Initial Load → Display Data → Start Auto-Refresh Timer
                                       ↓
                              Every 3 minutes
                                       ↓
                            Check Tab Visibility
                                       ↓
                    Tab Active? → Silent Refresh → Smooth Update
                                       ↓
                    Tab Hidden? → Skip Update (save resources)
                                       ↓
                    Tab Returns? → Immediate Refresh
```

### Component Breakdown

The refactored architecture splits concerns cleanly:

**App.tsx** (130 lines)

- State management
- Data fetching orchestration
- Route handling

**StatusBar** (35 lines)

- Last updated timestamp
- Manual refresh button
- Refresh status indicator

**WeatherDisplay** (40 lines)

- Composes all weather components
- Manages layout structure
- Passes data to child components

**useAutoRefresh** (30 lines)

- Auto-refresh timer
- Tab visibility detection
- Cleanup on unmount

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📝 License

MIT

## 🙏 Credits

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [SolidJS](https://solidjs.com/)

---

**Made with ❤️ using Clean Code principles and modern web technologies**
