import { type Component, createSignal, For, Show } from "solid-js";
import { Search, MapPin } from "lucide-solid";
import type { Location } from "../../types/weather.types";
import { WeatherService } from "../../services/weather.service";
import styles from "./LocationSearch.module.css";

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
}

export const LocationSearch: Component<LocationSearchProps> = (props) => {
  const [query, setQuery] = createSignal("");
  const [locations, setLocations] = createSignal<Location[]>([]);
  const [isSearching, setIsSearching] = createSignal(false);
  const [showResults, setShowResults] = createSignal(false);

  let debounceTimer: ReturnType<typeof setTimeout>;

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (value.trim().length < 2) {
      setLocations([]);
      setShowResults(false);
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await WeatherService.searchLocations(value);
        setLocations(results);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setLocations([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  const handleLocationSelect = (location: Location) => {
    setQuery(`${location.name}, ${location.country}`);
    setShowResults(false);
    props.onLocationSelect(location);
  };

  return (
    <div class={styles.locationSearch}>
      <div class={styles.searchInputContainer}>
        <Search size={20} class={styles.searchIcon} />
        <input
          type="text"
          class={styles.searchInput}
          placeholder="Search for a city..."
          value={query()}
          onInput={(e) => handleSearch(e.currentTarget.value)}
          onFocus={() => {
            if (locations().length > 0) setShowResults(true);
          }}
        />
        <Show when={isSearching()}>
          <div class={styles.searchSpinner} />
        </Show>
      </div>

      <Show when={showResults() && locations().length > 0}>
        <div class={styles.searchResults}>
          <For each={locations()}>
            {(location) => (
              <button
                class={styles.searchResultItem}
                onClick={() => handleLocationSelect(location)}
              >
                <MapPin size={16} class={styles.locationIcon} />
                <div class={styles.locationInfo}>
                  <p class={styles.locationName}>{location.name}</p>
                  <p class={styles.locationDetails}>
                    {location.admin1 ? `${location.admin1}, ` : ""}
                    {location.country}
                  </p>
                </div>
              </button>
            )}
          </For>
        </div>
      </Show>

      <Show
        when={
          showResults() &&
          query().length >= 2 &&
          locations().length === 0 &&
          !isSearching()
        }
      >
        <div class={styles.searchResults}>
          <div class={styles.noResults}>No locations found</div>
        </div>
      </Show>
    </div>
  );
};

