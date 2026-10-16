export type Region = "eu" | "latam";

export const REGION_COOKIE = "cb_region";

// UE + EEE (IS, LI, NO) + CH + GB
const EU_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE", "IS", "LI", "NO", "CH", "GB",
]);

export function isRegion(value: string | undefined | null): value is Region {
  return value === "eu" || value === "latam";
}

function regionFromAcceptLanguage(header: string | null): Region {
  if (!header) return "latam";
  const first = header.split(",")[0]?.split(";")[0]?.trim() ?? "";
  const country = first.split("-")[1]?.toUpperCase();
  return country && EU_COUNTRIES.has(country) ? "eu" : "latam";
}

export function resolveRegion(input: {
  cookie: string | undefined;
  country: string | null;
  acceptLanguage: string | null;
}): Region {
  if (isRegion(input.cookie)) return input.cookie;
  if (input.country) {
    return EU_COUNTRIES.has(input.country.toUpperCase()) ? "eu" : "latam";
  }
  return regionFromAcceptLanguage(input.acceptLanguage);
}
