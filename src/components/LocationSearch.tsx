import { type Component, createSignal, For, Show } from "solid-js";
import { Search, MapPin } from "lucide-solid";
import type { Location } from "../types/weather.types";
import { WeatherService } from "../services/weather.service";
import "./LocationSearch.css";

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
    <div class="location-search">
      <div class="search-input-container">
        <Search
          size={20}
          class="search-icon"
        />
        <input
          type="text"
          class="search-input"
          placeholder="Search for a city..."
          value={query()}
          onInput={(e) => handleSearch(e.currentTarget.value)}
          onFocus={() => {
            if (locations().length > 0) setShowResults(true);
          }}
        />
        <Show when={isSearching()}>
          <div class="search-spinner" />
        </Show>
      </div>

      <Show when={showResults() && locations().length > 0}>
        <div class="search-results">
          <For each={locations()}>
            {(location) => (
              <button
                class="search-result-item"
                onClick={() => handleLocationSelect(location)}
              >
                <MapPin
                  size={16}
                  class="location-icon"
                />
                <div class="location-info">
                  <p class="location-name">{location.name}</p>
                  <p class="location-details">
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
        <div class="search-results">
          <div class="no-results">No locations found</div>
        </div>
      </Show>
    </div>
  );
};
