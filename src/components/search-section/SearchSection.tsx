import { Show } from "solid-js";
import { LocationSearch } from "../location-search/LocationSearch";
import { LocationSuggestions } from "../location-suggestions/LocationSuggestions";
import { LocationPermission } from "../location-permission/LocationPermission";
import type { Location } from "../../types/weather.types";
import styles from "./SearchSection.module.css";

interface SearchSectionProps {
  onLocationSelect: (location: Location) => void;
  onRequestLocation: () => void;
  showLocationPermission: boolean;
  showSuggestions: boolean;
}

export function SearchSection(props: SearchSectionProps) {
  return (
    <div class={styles.searchSection}>
      <LocationSearch onLocationSelect={props.onLocationSelect} />

      <Show when={props.showLocationPermission}>
        <LocationPermission onRequestLocation={props.onRequestLocation} />
      </Show>

      <Show when={props.showSuggestions}>
        <LocationSuggestions onLocationSelect={props.onLocationSelect} />
      </Show>
    </div>
  );
}
