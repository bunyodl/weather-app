import { Show } from "solid-js";
import type { Accessor } from "solid-js";
import { RefreshCw } from "lucide-solid";
import styles from "./StatusBar.module.css";
import { useRelativeTime } from "../../hooks/useRelativeTime";

interface StatusBarProps {
  lastUpdated: Accessor<Date | null>;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function StatusBar(props: StatusBarProps) {
  const relativeTime = useRelativeTime(props.lastUpdated);

  return (
    <div class={styles.statusBar}>
      <div class={styles.lastUpdated}>
        <Show when={props.lastUpdated()}>Last updated: {relativeTime()}</Show>
      </div>
      <button
        class={styles.refreshBtn}
        onClick={props.onRefresh}
        disabled={props.isRefreshing}
        title="Refresh weather data"
      >
        <RefreshCw
          class={props.isRefreshing ? styles.spinning : ""}
          size={18}
        />
        <span>{props.isRefreshing ? "Updating..." : "Refresh"}</span>
      </button>
    </div>
  );
}
