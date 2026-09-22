import { useQuery } from "@tanstack/react-query";
import { locationKeys, searchLocations } from "./locations";

export function useLocationSearch(term: string, enabled = true) {
  const normalizedTerm = term.trim();
  return useQuery({
    queryKey: locationKeys.search(normalizedTerm),
    queryFn: ({ signal }) => searchLocations(normalizedTerm, signal),
    enabled: enabled && normalizedTerm.length >= 2,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 1,
  });
}
