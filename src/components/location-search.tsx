"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocationSearch } from "@/api/query/use-location-search";
import { Input } from "@/components/ui/input";
import { useLocationStore } from "@/store/location-store";
import type { Location } from "@/types";
import { locationLabel } from "@/utils/format";

function useDebouncedValue(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const isDebouncing = value !== debouncedValue;
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);
  return { debouncedValue, isDebouncing };
}

export function LocationSearch() {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [dropdownMaxHeight, setDropdownMaxHeight] = useState(288);
  const [openAbove, setOpenAbove] = useState(false);
  const { debouncedValue, isDebouncing } = useDebouncedValue(input);
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRowRef = useRef<HTMLDivElement>(null);
  const { data = [], isFetching, isError } = useLocationSearch(debouncedValue, !isDebouncing);
  const { selectLocation, recentLocations, clearSelection, clearRecentLocations } = useLocationStore();
  const hasQuery = input.trim().length >= 2;
  const showRecent = !hasQuery && recentLocations.length > 0;
  const results = showRecent ? recentLocations : data;

  useEffect(() => setActiveIndex(-1), [debouncedValue]);
  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);
  useEffect(() => {
    const updateDropdownPlacement = () => {
      const inputRow = inputRowRef.current;
      if (!open || !inputRow) return;

      const { top, bottom } = inputRow.getBoundingClientRect();
      const viewportPadding = 16;
      const below = window.innerHeight - bottom - viewportPadding;
      const above = top - viewportPadding;
      const shouldOpenAbove = below < 240 && above > below;

      setOpenAbove(shouldOpenAbove);
      setDropdownMaxHeight(Math.max(0, Math.min(288, shouldOpenAbove ? above : below)));
    };

    updateDropdownPlacement();
    window.addEventListener("resize", updateDropdownPlacement);
    return () => window.removeEventListener("resize", updateDropdownPlacement);
  }, [open]);

  const choose = (location: Location) => {
    selectLocation(location);
    setInput(locationLabel(location));
    setOpen(false);
  };
  const clear = () => {
    setInput("");
    clearSelection();
    setActiveIndex(-1);
    setOpen(true);
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && results.length) {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp" && results.length) {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      choose(results[activeIndex]);
    } else if (event.key === "Escape") setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative w-full">
      <div
        ref={inputRowRef}
        className="flex items-center gap-3 rounded-full bg-[#eef0ed] px-5 py-3 transition focus-within:bg-[#e6eae5] focus-within:ring-2 focus-within:ring-[#105B48]/20"
      >
        <svg
          aria-hidden="true"
          className="size-5 shrink-0 text-[#105B48]/70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-4.2-4.2" />
        </svg>
        <Input
          value={input}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setInput(event.target.value);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search a city or neighbourhood"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          aria-autocomplete="list"
        />
        {input && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear search"
            className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-[#105B48] shadow-sm hover:bg-[#A8DC66]"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        )}
        {(isDebouncing || isFetching) && (
          <span
            className="size-4 animate-spin rounded-full border-2 border-[#105B48]/20 border-t-[#105B48]"
            aria-label="Searching"
          />
        )}
      </div>
      {open && (
        <div
          className={`search-results absolute z-10 w-full overflow-y-auto rounded-2xl border border-[#105B48]/10 bg-white shadow-[0_24px_60px_rgba(16,91,72,.16)] ${openAbove ? "bottom-full mb-3" : "top-full mt-3"}`}
          role="listbox"
          id={listId}
          style={{ maxHeight: dropdownMaxHeight }}
        >
          <div className="group absolute top-3 right-3 z-10">
            <button
              type="button"
              aria-label="Keyboard navigation help"
              className="grid size-6 place-items-center rounded-full border border-[#105B48]/20 bg-white text-xs font-bold text-[#105B48] shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#105B48]"
            >
              ?
            </button>
            <div
              role="tooltip"
              className="pointer-events-none absolute top-0 right-8 w-56 translate-x-1 rounded-lg bg-[#105B48] px-3 py-2 text-xs leading-5 text-white opacity-0 shadow-lg transition group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100"
            >
              Use ↑ ↓ to navigate, Enter to select, and Esc to close.
            </div>
          </div>
          {!input && !showRecent && (
            <div className="px-5 py-8 text-center">
              <span className="mx-auto grid size-11 place-items-center rounded-full bg-[#A8DC66] text-[#105B48]">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 21s7-5.4 7-12a7 7 0 1 0-14 0c0 6.6 7 12 7 12Z" />
                  <circle cx="12" cy="9" r="2" />
                </svg>
              </span>
              <p className="mt-3 text-sm text-[#105B48]/70">Start with a city or neighbourhood.</p>
            </div>
          )}
          {showRecent && (
            <div className="flex items-center justify-between px-5 pt-4">
              <p className="text-[11px] font-bold tracking-[.16em] text-[#105B48]/60">RECENTLY EXPLORED</p>
              <button
                type="button"
                onClick={clearRecentLocations}
                className="mr-8 text-xs font-semibold text-[#105B48] underline underline-offset-4 hover:text-[#A8DC66]"
              >
                Clear history
              </button>
            </div>
          )}
          {isError && (
            <p className="px-5 py-5 text-sm text-[#105B48]">
              The search service is unavailable. Please try again.
            </p>
          )}
          {hasQuery && !isDebouncing && !isFetching && !isError && data.length === 0 && (
            <p className="px-5 py-5 text-sm text-[#105B48]/70">No places found. Try a broader search.</p>
          )}
          {results.map((item, index) => (
            <button
              key={item.id}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={activeIndex === index}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => choose(item)}
              className={`flex w-full items-center gap-4 px-5 py-4 text-left transition ${activeIndex === index ? "bg-[#A8DC66]/30" : "hover:bg-[#A8DC66]/20"}`}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#A8DC66] text-[#105B48]">
                ⌖
              </span>
              <span>
                <span className="block font-semibold text-[#105B48]">{item.name}</span>
                <span className="block text-sm text-[#105B48]/65">
                  {[item.admin1, item.country].filter(Boolean).join(", ")}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
