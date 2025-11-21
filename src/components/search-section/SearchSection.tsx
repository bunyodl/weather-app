import { Show } from "solid-js";
import { LocationSearch } from "../location-search/LocationSearch";
import type { Location } from "../../types/weather.types";
import styles from "./SearchSection.module.css";

interface SearchSectionProps {
  onLocationSelect: (location: Location) => void;
  onLoadDefault: () => void;
  showDefaultButton: boolean;
}

export function SearchSection(props: SearchSectionProps) {
  return (
    <div class={styles.searchSection}>
      <LocationSearch onLocationSelect={props.onLocationSelect} />
      <Show when={props.showDefaultButton}>
        <button class={styles.defaultBtn} onClick={props.onLoadDefault}>
          Or view weather for Berlin, Germany
        </button>
      </Show>
    </div>
  );
}

