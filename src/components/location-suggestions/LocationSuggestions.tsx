import { MapPin, RefreshCw } from "lucide-solid";
import { createSignal, onMount } from "solid-js";
import type { Location } from "../../types/weather.types";
import { ALL_LOCATIONS } from "../../data/locations";
import {
  getRandomLocations,
  LOCATIONS_TO_SHOW,
} from "../../utils/location.utils";
import styles from "./LocationSuggestions.module.css";

interface LocationSuggestionsProps {
  onLocationSelect: (location: Location) => void;
}

export function LocationSuggestions(props: LocationSuggestionsProps) {
  const [displayedLocations, setDisplayedLocations] = createSignal<Location[]>(
    [],
  );

  onMount(() => {
    setDisplayedLocations(getRandomLocations(ALL_LOCATIONS, LOCATIONS_TO_SHOW));
  });

  const handleRefresh = () => {
    setDisplayedLocations(getRandomLocations(ALL_LOCATIONS, LOCATIONS_TO_SHOW));
  };

  return (
    <div class={styles.suggestions}>
      <div class={styles.header}>
        <h3 class={styles.title}>
          <MapPin size={18} />
          Popular Locations
        </h3>
        <button
          class={styles.refreshButton}
          onClick={handleRefresh}
          aria-label="Shuffle locations"
        >
          <RefreshCw size={16} />
          Shuffle
        </button>
      </div>
      <div class={styles.grid}>
        {displayedLocations().map((location) => (
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
