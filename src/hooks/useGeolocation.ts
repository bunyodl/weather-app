import { createSignal, onMount } from "solid-js";
import type { Accessor } from "solid-js";

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
}

type PermissionState =
  | "granted"
  | "denied"
  | "prompt"
  | "unsupported"
  | "checking";

interface UseGeolocationReturn {
  coordinates: Accessor<GeolocationCoordinates | null>;
  permission: Accessor<PermissionState>;
  error: Accessor<string | null>;
  requestLocation: () => Promise<void>;
}

export function useGeolocation(): UseGeolocationReturn {
  const [coordinates, setCoordinates] =
    createSignal<GeolocationCoordinates | null>(null);
  const [permission, setPermission] = createSignal<PermissionState>("checking");
  const [error, setError] = createSignal<string | null>(null);

  const checkPermission = async () => {
    if (!navigator.geolocation) {
      setPermission("unsupported");
      return;
    }

    if (!navigator.permissions) {
      setPermission("prompt");
      return;
    }

    try {
      const result = await navigator.permissions.query({
        name: "geolocation" as PermissionName,
      });
      setPermission(result.state as PermissionState);

      result.addEventListener("change", () => {
        setPermission(result.state as PermissionState);
      });

      if (result.state === "granted") {
        await requestLocation();
      }
    } catch (err) {
      console.log("Permission API not fully supported");
      setPermission("prompt");
    }
  };

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setPermission("unsupported");
      setError("Geolocation is not supported by your browser");
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000,
          });
        },
      );

      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setPermission("granted");
      setError(null);
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setPermission("denied");
            setError("Location access denied");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location unavailable");
            break;
          case err.TIMEOUT:
            setError("Location request timeout");
            break;
          default:
            setError("Failed to get location");
        }
      } else {
        setError("Failed to get location");
      }
    }
  };

  onMount(() => {
    checkPermission();
  });

  return {
    coordinates,
    permission,
    error,
    requestLocation,
  };
}
