import styles from "./TimezoneIndicator.module.css";

interface TimezoneIndicatorProps {
  timezone: string;
  size?: "small" | "medium";
}

export function TimezoneIndicator(props: TimezoneIndicatorProps) {
  const size = () => props.size || "medium";

  return (
    <div class={styles.timezoneIndicator} classList={{ [styles[size()]]: true }}>
      <span class={styles.icon}>🌐</span>
      <span class={styles.text}>All times shown in {props.timezone}</span>
    </div>
  );
}

