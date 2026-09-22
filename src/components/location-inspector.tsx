"use client";

import { useLocationStore } from "@/store/location-store";
import { formatPopulation } from "@/utils/format";

export function LocationInspector() {
  const location = useLocationStore((state) => state.selectedLocation);
  if (!location)
    return (
      <div className="mt-12 border-t border-[#173b35]/15 pt-5 text-sm text-[#71827b]">
        Choose a place to see its location brief.
      </div>
    );
  return (
    <section
      className="mt-12 animate-[rise_.45s_ease-out] border-t border-[#173b35]/15 pt-5"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold tracking-[.16em] text-[#ef6a4a]">LOCATION BRIEF</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#173b35]">
            {location.name}
          </h2>
          <p className="mt-1 text-[#71827b]">
            {[location.admin1, location.country].filter(Boolean).join(", ")}
          </p>
        </div>
        <span className="grid size-12 place-items-center rounded-full bg-[#d7f05a] text-[#173b35]">
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s7-5.4 7-12a7 7 0 1 0-14 0c0 6.6 7 12 7 12Z" />
            <circle cx="12" cy="9" r="2" />
          </svg>
        </span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-[#71827b]">Coordinates</p>
          <p className="mt-1 font-semibold text-[#173b35]">
            {location.latitude.toFixed(3)}°, {location.longitude.toFixed(3)}°
          </p>
        </div>
        <div>
          <p className="text-[#71827b]">Local context</p>
          <p className="mt-1 font-semibold text-[#173b35]">{formatPopulation(location.population)}</p>
        </div>
      </div>
    </section>
  );
}
