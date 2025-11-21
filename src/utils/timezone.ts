const TIMEZONE_ABBREVIATIONS: Record<string, string> = {
  "America/New_York": "ET",
  "America/Chicago": "CT",
  "America/Denver": "MT",
  "America/Los_Angeles": "PT",
  "America/Phoenix": "MST",
  "America/Anchorage": "AKT",
  "Pacific/Honolulu": "HST",
  "Europe/London": "GMT",
  "Europe/Paris": "CET",
  "Europe/Berlin": "CET",
  "Europe/Rome": "CET",
  "Europe/Madrid": "CET",
  "Europe/Moscow": "MSK",
  "Asia/Dubai": "GST",
  "Asia/Kolkata": "IST",
  "Asia/Shanghai": "CST",
  "Asia/Tokyo": "JST",
  "Asia/Seoul": "KST",
  "Australia/Sydney": "AEDT",
  "Pacific/Auckland": "NZDT",
};

export function getBrowserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getTimezoneAbbreviation(timezone: string): string {
  if (TIMEZONE_ABBREVIATIONS[timezone]) {
    return TIMEZONE_ABBREVIATIONS[timezone];
  }

  const offset = getTimezoneOffset(timezone);
  if (offset === 0) {
    return "UTC";
  }

  const sign = offset >= 0 ? "+" : "";
  return `GMT${sign}${offset}`;
}

export function getTimezoneOffset(timezone: string): number {
  const date = new Date();
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
  const offset = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
  return offset;
}

export function convertUTCToUserTimezone(
  utcDateString: string,
  userTimezone: string,
): Date {
  const date = new Date(utcDateString);
  return new Date(date.toLocaleString("en-US", { timeZone: userTimezone }));
}

export function formatDateInTimezone(
  date: Date | string,
  timezone: string,
  options: Intl.DateTimeFormatOptions = {},
): string {
  const dateObj = typeof date === "string" ? parseUTCDateString(date) : date;

  return dateObj.toLocaleString("en-US", {
    timeZone: timezone,
    ...options,
  });
}

function parseUTCDateString(dateString: string): Date {
  if (dateString.endsWith("Z")) {
    return new Date(dateString);
  }
  return new Date(dateString + "Z");
}

export function formatTimeInTimezone(
  date: Date | string,
  timezone: string,
): string {
  const dateObj = typeof date === "string" ? parseUTCDateString(date) : date;

  return dateObj.toLocaleString("en-US", {
    timeZone: timezone,
    hour: "numeric",
    hour12: true,
  });
}

export function formatDateTimeInTimezone(
  date: Date | string,
  timezone: string,
): string {
  const dateObj = typeof date === "string" ? parseUTCDateString(date) : date;

  return dateObj.toLocaleString("en-US", {
    timeZone: timezone,
    month: "short",
    day: "numeric",
    hour: "numeric",
    hour12: true,
  });
}
