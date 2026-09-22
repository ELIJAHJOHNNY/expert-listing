export type Location = {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  population?: number;
};

export type GeocodingResponse = { results?: Location[] };
