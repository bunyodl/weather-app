import { createEffect, onCleanup } from "solid-js";
import type { Accessor } from "solid-js";

interface UseAutoRefreshOptions {
  interval: number;
  onRefresh: () => void;
  enabled: Accessor<boolean>;
}

export function useAutoRefresh(options: UseAutoRefreshOptions) {
  const { interval, onRefresh, enabled } = options;

  createEffect(() => {
    if (!enabled()) return;

    let intervalId: number | undefined;
    let isPageVisible = true;

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;

      if (isPageVisible && enabled()) {
        onRefresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    intervalId = setInterval(() => {
      if (isPageVisible && !document.hidden) {
        onRefresh();
      }
    }, interval);

    onCleanup(() => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    });
  });
}

