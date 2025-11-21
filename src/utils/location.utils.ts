import type { Location } from "../types/weather.types";

const LOCATIONS_TO_SHOW = 10;

export function getRandomLocations(
  locations: Location[],
  count: number = LOCATIONS_TO_SHOW,
): Location[] {
  const shuffled = [...locations].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export { LOCATIONS_TO_SHOW };
