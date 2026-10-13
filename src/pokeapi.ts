import { Cache } from "./pokecache.js";

export class PokeAPI {
  static readonly locationLimit = 20;
  private static readonly baseURL = "https://pokeapi.co/api/v2/";
  private static readonly initialLocationPageURL = `location-area?limit=${PokeAPI.locationLimit}`;
  private static readonly cacheReapInterval = 5000;
  private cache = new Cache(PokeAPI.cacheReapInterval);

  constructor() {}

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const fullURL = PokeAPI.baseURL + `pokemon/${pokemonName}`;

    // check cache for URL and return value if found
    const cached = this.cache.get<Pokemon>(fullURL);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(fullURL);
    if (response.status === 404) {
      return {
        id: -1,
        name: "not-found",
        base_experience: 0,
        height: 0,
        is_default: false,
        order: 0,
        weight: 0,
        abilities: [],
        forms: [],
        game_indices: [],
        held_items: [],
        location_area_encounters: "",
        moves: [],
        past_types: [],
        past_abilities: [],
        past_stats: [],
        sprites: {
          front_default: "",
          front_shiny: "",
          front_female: "",
          front_shiny_female: "",
          back_default: "",
          back_female: "",
          back_shiny: "",
          back_shiny_female: "",
        },
        cries: {
          latest: "",
          legacy: "",
        },
        species: {
          name: "",
          url: "",
        },
        stats: [],
        types: [],
      };
    }

    const pokemon = await response.json();

    // put Pokemon in cache
    this.cache.add<Pokemon>(fullURL, pokemon);

    return pokemon;
  }

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
    const fullURL = PokeAPI.baseURL + `location-area/${locationName}`;

    // check cache for URL and return value if found
    const cached = this.cache.get<Location>(fullURL);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(fullURL);
    if (response.status === 404) {
      return {
        id: -1,
        name: "not-found",
        game_index: 0,
        encounter_method_rates: [],
        location: {
          name: "",
          url: "",
        },
        names: [],
        pokemon_encounters: [],
      };
    }

    const location = await response.json();

    // put location in cache
    this.cache.add<Location>(fullURL, location);

    return location;
  }
}

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  past_types: PokemonTypePast[];
  past_abilities: PokemonAbilityPast[];
  past_stats: PokemonStatPast[];
  sprites: PokemonSprites;
  cries: PokemonCries;
  species: NamedAPIResource;
  stats: PokemonStat[];
  types: PokemonType[];
};

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

type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
};

type VersionGameIndex = {
  game_index: number;
  version: NamedAPIResource;
};

type PokemonHeldItem = {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
};

type PokemonHeldItemVersion = {
  version: NamedAPIResource;
  rarity: number;
};

type PokemonMove = {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
};

type PokemonMoveVersion = {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
  order: number;
};

type PokemonTypePast = {
  generation: NamedAPIResource;
  types: PokemonType[];
};

type PokemonType = {
  slot: number;
  type: NamedAPIResource;
};

type PokemonAbilityPast = {
  generation: NamedAPIResource;
  abilities: PokemonAbility[];
};

type PokemonStatPast = {
  generation: NamedAPIResource;
  stats: PokemonStat[];
};

type PokemonStat = {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
};

type PokemonSprites = {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
};

type PokemonCries = {
  latest: string;
  legacy: string;
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
