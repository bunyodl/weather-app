import { MapPin } from "lucide-solid";
import type { Location } from "../../types/weather.types";
import styles from "./LocationSuggestions.module.css";

const POPULAR_LOCATIONS: Location[] = [
  { name: "New York", latitude: 40.7128, longitude: -74.006, country: "USA" },
  { name: "London", latitude: 51.5074, longitude: -0.1278, country: "UK" },
  { name: "Tokyo", latitude: 35.6762, longitude: 139.6503, country: "Japan" },
  { name: "Paris", latitude: 48.8566, longitude: 2.3522, country: "France" },
  {
    name: "Sydney",
    latitude: -33.8688,
    longitude: 151.2093,
    country: "Australia",
  },
  { name: "Dubai", latitude: 25.2048, longitude: 55.2708, country: "UAE" },
  {
    name: "Singapore",
    latitude: 1.3521,
    longitude: 103.8198,
    country: "Singapore",
  },
  {
    name: "Toronto",
    latitude: 43.6532,
    longitude: -79.3832,
    country: "Canada",
  },
  { name: "Berlin", latitude: 52.52, longitude: 13.41, country: "Germany" },
  { name: "Mumbai", latitude: 19.076, longitude: 72.8777, country: "India" },
];

interface LocationSuggestionsProps {
  onLocationSelect: (location: Location) => void;
}

export function LocationSuggestions(props: LocationSuggestionsProps) {
  return (
    <div class={styles.suggestions}>
      <h3 class={styles.title}>
        <MapPin size={18} />
        Popular Locations
      </h3>
      <div class={styles.grid}>
        {POPULAR_LOCATIONS.map((location) => (
          <button
            class={styles.locationCard}
            onClick={() => props.onLocationSelect(location)}
          >
            <span class={styles.cityName}>{location.name}</span>
            <span class={styles.country}>{location.country}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { POPULAR_LOCATIONS };
