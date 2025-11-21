import z from "zod";

export const envSchema = z.object({
  OPEN_METEO_GEOCODING_API_URL: z.url(),
  OPEN_METEO_FORECAST_API_URL: z.url(),
});
