import { type State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length < 1) {
    console.log("Usage: catch <pokemon-name>");
    return;
  }

  const pokemon = args[0];
  const pokemonObj = await state.pokeAPI.fetchPokemon(pokemon);

  // Pokemon not found
  if (pokemonObj.id == -1) {
    console.log(`${pokemon} is not a Pokemon.`);
    return;
  }

  const dividend = 650;

  console.log(`Throwing a Pokeball at ${pokemon}...`);

  const rand = Math.random();
  const min = Math.sqrt(pokemonObj.base_experience / dividend);

  if (rand < min) {
    console.log(`${pokemon} escaped!`);
    return;
  }

  if (!(pokemon in state.pokedex)) {
    state.pokedex[pokemon] = pokemonObj;
  }
  console.log(`${pokemon} was caught!`);
}
