import { type State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("Welcome to the Pokedex!\nUsage:\n");
  for (const name in state.commands) {
    const command = state.commands[name];
    console.log(`${command.name}: ${command.description}`);
  }
}
