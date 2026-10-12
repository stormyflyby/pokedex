import { Cache } from "./pokecache.js";

export class PokeAPI {
  static readonly locationLimit = 20;
  private static readonly baseURL = "https://pokeapi.co/api/v2/";
  private static readonly initialLocationPageURL = `location-area?limit=${PokeAPI.locationLimit}`;
  private static readonly cacheReapInterval = 5000;
  private cache = new Cache(PokeAPI.cacheReapInterval);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullURL = pageURL || PokeAPI.baseURL + PokeAPI.initialLocationPageURL;

    // check cache for URL and return value if found
    const cached = this.cache.get<ShallowLocations>(fullURL);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(fullURL);
    const locations = await response.json();

    // put locations in cache
    this.cache.add<ShallowLocations>(fullURL, locations);

    return locations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    // check cache for URL and return value if found
    const cached = this.cache.get<Location>(locationName);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(
      PokeAPI.baseURL + `location-area/${locationName}`,
    );
    const location = await response.json();

    // put location in cache
    this.cache.add<Location>(locationName, location);

    return location;
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRate[];
  location: NamedAPIResource;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
};

type NamedAPIResource = {
  name: string;
  url: string;
};

type EncounterMethodRate = {
  encounter_method: NamedAPIResource;
  version_details: EncounterVersionDetails[];
};

type EncounterVersionDetails = {
  rate: number;
  version: NamedAPIResource;
};

type Name = {
  name: string;
  language: NamedAPIResource;
};

type Encounter = {
  min_level: number;
  max_level: number;
  condition_values: NamedAPIResource;
  chance: number;
  method: NamedAPIResource;
};

type VersionEncounterDetail = {
  version: NamedAPIResource;
  max_chance: number;
  encounter_details: Encounter[];
};

type PokemonEncounter = {
  pokemon: NamedAPIResource;
  version_details: VersionEncounterDetail[];
};
