import { API } from "@/api/api";
import { getJson } from "@/api/client";
import type { GeocodingResponse, Location } from "@/types";

export const locationKeys = {
  all: ["locations"] as const,
  search: (term: string) => [...locationKeys.all, "search", term] as const,
};

export async function searchLocations(term: string, signal?: AbortSignal): Promise<Location[]> {
  const params = new URLSearchParams({ name: term, count: "7", language: "en", format: "json" });
  const data = await getJson<GeocodingResponse>(`${API.geocoding.search}?${params}`, signal);
  return data.results ?? [];
}
