import { type State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length < 1) {
    console.log("Usage: explore <area-name>");
    return;
  }

  const location = args[0];
  const locationObj = await state.pokeAPI.fetchLocation(location);

  // area not found
  if (locationObj.id == -1) {
    console.log(`${location} is not an area.`);
    return;
  }

  console.log(`Exploring ${location}...`);

  const pokemonEncounters = locationObj.pokemon_encounters;
  if (pokemonEncounters.length == 0) {
    console.log("No Pokemon found.");
    return;
  }

  console.log("Found Pokemon:");
  for (const pokemonEncounter of pokemonEncounters) {
    console.log(` - ${pokemonEncounter.pokemon.name}`);
  }
}
