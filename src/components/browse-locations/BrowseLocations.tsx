import { Show, createSignal } from "solid-js";
import { ChevronDown, ChevronUp, MapPin } from "lucide-solid";
import { LocationSuggestions } from "../location-suggestions/LocationSuggestions";
import type { Location } from "../../types/weather.types";
import styles from "./BrowseLocations.module.css";

interface BrowseLocationsProps {
  onLocationSelect: (location: Location) => void;
}

export function BrowseLocations(props: BrowseLocationsProps) {
  const [isExpanded, setIsExpanded] = createSignal(false);

  const toggleSuggestions = () => {
    setIsExpanded(!isExpanded());
  };

  return (
    <div class={styles.browseLocations}>
      <button
        class={styles.browseButton}
        onClick={toggleSuggestions}
        aria-expanded={isExpanded()}
        aria-label={
          isExpanded() ? "Hide popular locations" : "Browse popular locations"
        }
      >
        <MapPin size={16} />
        <span class={styles.browseButtonText}>
          {isExpanded() ? "Hide" : "Browse"} Locations
        </span>
        <Show when={isExpanded()}>
          <ChevronUp
            size={16}
            class={styles.chevron}
          />
        </Show>
        <Show when={!isExpanded()}>
          <ChevronDown
            size={16}
            class={styles.chevron}
          />
        </Show>
      </button>

      <Show when={isExpanded()}>
        <div class={styles.suggestionsContainer}>
          <LocationSuggestions onLocationSelect={props.onLocationSelect} />
        </div>
      </Show>
    </div>
  );
}
