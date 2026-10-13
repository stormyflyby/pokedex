import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  pokeAPI: PokeAPI;
  pokedex: Record<string, Pokemon>;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  interface: Interface;
  commands: Record<string, CLICommand>;
};

export function initState(): State {
  const options = {
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  };
  const rl = createInterface(options);

  return {
    pokeAPI: new PokeAPI(),
    pokedex: {},
    nextLocationsURL: null,
    prevLocationsURL: null,
    interface: rl,
    commands: getCommands(),
  };
}
