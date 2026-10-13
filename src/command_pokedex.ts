import { type State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  // Pokedex is empty
  if (Object.keys(state.pokedex).length === 0) {
    console.log("Your Pokedex is empty.");
    return;
  }

  console.log("Your Pokedex:");
  for (const pokemon in state.pokedex) {
    console.log(`  - ${pokemon}`);
  }
}
