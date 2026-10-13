import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapForward, commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description:
        "Displays the names of the next 20 location areas in the Pokemon world",
      callback: commandMapForward,
    },
    mapb: {
      name: "mapb",
      description:
        "Displays the names of the previous 20 location areas in the Pokemon world",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Displays the names of Pokemon in the specified area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Throws a Pokeball at the specified Pokemon",
      callback: commandCatch,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    // can add more commands here
  };
}
