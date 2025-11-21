export interface WeatherData {
  current: {
    interval: number;
    temperature_2m: number;
    time: string;
    wind_speed_10m: number;
  };
  current_units: {
    interval: string;
    temperature_2m: string;
    time: string;
    wind_speed_10m: string;
  };
  elevation: number;
  generationtime_ms: number;
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
  };
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export interface HourlyData {
  time: string;
  temperature: number;
}

export interface DailyData {
  date: string;
  minTemp: number;
  maxTemp: number;
  avgTemp: number;
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

export interface GeocodingResult {
  results?: Location[];
}
