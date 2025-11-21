import { createSignal, createEffect } from "solid-js";
import type { Accessor } from "solid-js";
import { getBrowserTimezone, getTimezoneAbbreviation } from "../utils/timezone";

interface UseUserTimezoneReturn {
  timezone: Accessor<string>;
  timezoneAbbr: Accessor<string>;
  hasLocationPermission: Accessor<boolean>;
  setHasLocationPermission: (hasPermission: boolean) => void;
}

const DEFAULT_TIMEZONE = "UTC";

export function useUserTimezone(): UseUserTimezoneReturn {
  const [hasLocationPermission, setHasLocationPermission] = createSignal(false);
  const [timezone, setTimezone] = createSignal<string>(DEFAULT_TIMEZONE);
  const [timezoneAbbr, setTimezoneAbbr] = createSignal<string>("UTC");

  createEffect(() => {
    if (hasLocationPermission()) {
      try {
        const browserTz = getBrowserTimezone();
        const abbr = getTimezoneAbbreviation(browserTz);
        setTimezone(browserTz);
        setTimezoneAbbr(abbr);
      } catch (error) {
        console.error("Failed to detect timezone:", error);
        setTimezone(DEFAULT_TIMEZONE);
        setTimezoneAbbr("UTC");
      }
    } else {
      setTimezone(DEFAULT_TIMEZONE);
      setTimezoneAbbr("UTC");
    }
  });

  return {
    timezone,
    timezoneAbbr,
    hasLocationPermission,
    setHasLocationPermission,
  };
}
