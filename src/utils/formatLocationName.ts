import type { Location } from "../types/weather.types";

const normalizeString = (str: string = ""): string => str.trim().toLowerCase();

const shouldRemoveAdmin1 = (admin1: string = "", name: string): boolean => {
  const normAdmin1 = normalizeString(admin1);
  const normName = normalizeString(name);

  if (normAdmin1 === normName) return true;
  if (normAdmin1.includes(normName) && normAdmin1.startsWith(normName))
    return true;

  return false;
};

const extractDisplayAdmin1 = (admin1: string = "", name: string): string => {
  if (!admin1) return "";
  if (shouldRemoveAdmin1(admin1, name)) return "";

  return admin1;
};

export function formatLocationName(location: Location): string {
  const { name, admin1, country } = location;

  if (!country) {
    return name;
  }

  const displayAdmin1 = extractDisplayAdmin1(admin1, name);
  const isCountryOnly = country.startsWith(name);

  if (isCountryOnly) {
    return country;
  }

  const parts = [name];

  if (displayAdmin1) {
    parts.push(displayAdmin1);
  }

  parts.push(country);

  return parts.join(", ");
}
