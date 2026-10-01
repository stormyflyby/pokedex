import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
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
    interface: rl,
    commands: getCommands(),
  };
}
