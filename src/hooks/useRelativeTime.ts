import { createSignal, createEffect, onCleanup } from "solid-js";
import type { Accessor } from "solid-js";
import { formatLastUpdated } from "../utils/date.utils";

const UPDATE_INTERVAL_MS = 1000;

export function useRelativeTime(date: Accessor<Date | null>): Accessor<string> {
  const [relativeTime, setRelativeTime] = createSignal("");

  createEffect(() => {
    const currentDate = date();
    if (!currentDate) {
      setRelativeTime("");
      return;
    }

    const updateTime = () => {
      setRelativeTime(formatLastUpdated(currentDate));
    };

    updateTime();

    const intervalId = setInterval(updateTime, UPDATE_INTERVAL_MS);

    onCleanup(() => {
      clearInterval(intervalId);
    });
  });

  return relativeTime;
}
