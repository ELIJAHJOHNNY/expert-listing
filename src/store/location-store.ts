import { create } from "zustand";
import type { Location } from "@/types";

type LocationStore = {
  selectedLocation: Location | null;
  recentLocations: Location[];
  selectLocation: (location: Location) => void;
  clearSelection: () => void;
  clearRecentLocations: () => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  selectedLocation: null,
  recentLocations: [],
  selectLocation: (location) =>
    set((state) => ({
      selectedLocation: location,
      recentLocations: [location, ...state.recentLocations.filter((item) => item.id !== location.id)].slice(
        0,
        3,
      ),
    })),
  clearSelection: () => set({ selectedLocation: null }),
  clearRecentLocations: () => set({ recentLocations: [] }),
}));
