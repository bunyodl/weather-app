import z from "zod";

export const envSchema = z.object({
  VITE_OPEN_METEO_GEOCODING_API_URL: z.url(),
  VITE_OPEN_METEO_FORECAST_API_URL: z.url(),
  VITE_BIGDATACLOUD_RGC_API_URL: z.url(),
  VITE_IP_API_URL: z.url(),
});
