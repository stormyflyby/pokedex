import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapForward, commandMapBack } from "./command_map.js";
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
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    // can add more commands here
  };
}
