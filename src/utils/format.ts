export function formatPopulation(population?: number) {
  if (!population) return "Population unavailable";
  return (
    new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(population) +
    " residents"
  );
}

export function locationLabel(location: { name: string; admin1?: string; country: string }) {
  return [location.name, location.admin1, location.country].filter(Boolean).join(", ");
}
