/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_OPEN_METEO_GEOCODING_API_URL: string;
  VITE_OPEN_METEO_FORECAST_API_URL: string;
  VITE_BIGDATACLOUD_RGC_API_URL: string;
  VITE_IP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
