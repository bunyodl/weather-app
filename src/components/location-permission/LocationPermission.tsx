import { MapPin } from "lucide-solid";
import styles from "./LocationPermission.module.css";

interface LocationPermissionProps {
  onRequestLocation: () => void;
}

export function LocationPermission(props: LocationPermissionProps) {
  return (
    <div class={styles.permissionPrompt}>
      <div class={styles.iconWrapper}>
        <MapPin size={32} />
      </div>
      <h3>Enable Location Access</h3>
      <p>Get weather for your current location automatically</p>
      <button
        class={styles.enableBtn}
        onClick={props.onRequestLocation}
      >
        Share My Location
      </button>
    </div>
  );
}
