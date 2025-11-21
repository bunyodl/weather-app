export interface WeatherData {
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
