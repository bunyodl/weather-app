import { Show } from "solid-js";
import { LocationSearch } from "../location-search/LocationSearch";
import { LocationSuggestions } from "../location-suggestions/LocationSuggestions";
import { LocationPermission } from "../location-permission/LocationPermission";
import { BrowseLocations } from "../browse-locations/BrowseLocations";
import type { Location } from "../../types/weather.types";
import styles from "./SearchSection.module.css";

interface SearchSectionProps {
  onLocationSelect: (location: Location) => void;
  onRequestLocation: () => void;
  showLocationPermission: boolean;
  showCollapsibleBrowse: boolean;
  showSuggestionsDirectly: boolean;
  timezone: string;
  timezoneAbbr: string;
  hasLocationPermission: boolean;
}

export function SearchSection(props: SearchSectionProps) {
  return (
    <div class={styles.searchSection}>
      <LocationSearch onLocationSelect={props.onLocationSelect} />

      <Show when={props.showLocationPermission}>
        <LocationPermission onRequestLocation={props.onRequestLocation} />
      </Show>

      {/* Show suggestions directly when no weather data */}
      <Show when={props.showSuggestionsDirectly}>
        <LocationSuggestions onLocationSelect={props.onLocationSelect} />
      </Show>

      {/* Show collapsible browse button when weather data is visible */}
      <Show when={props.showCollapsibleBrowse}>
        <BrowseLocations onLocationSelect={props.onLocationSelect} />
      </Show>
    </div>
  );
}
