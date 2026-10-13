import { type State } from "./state.js";

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length < 1) {
    console.log("Usage: inspect <pokemon-name>");
    return;
  }

  const pokemonName = args[0];

  if (!(pokemonName in state.pokedex)) {
    console.log("You have not caught that Pokemon.");
    return;
  }

  const pokemon = state.pokedex[pokemonName];
  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  for (const stat of pokemon.stats) {
    console.log(`  - ${stat.stat.name}: ${stat.base_stat}`);
  }
  console.log("Types:");
  for (const type of pokemon.types) {
    console.log(`  - ${type.type.name}`);
  }
}
