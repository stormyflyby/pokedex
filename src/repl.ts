import readline from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./commands.js";

export function startREPL() {
  const options = {
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  };
  const rl = readline.createInterface(options);

  rl.prompt();
  rl.on("line", (input: string) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const command = words[0];
    const availableCommands = getCommands();

    if (command in availableCommands) {
      try {
        availableCommands[command].callback({});
      } catch (err) {
        if (err instanceof Error) {
          console.log(`Error: ${err.message}`);
        }
      }
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}

export function cleanInput(input: string): string[] {
  const trimmedAndLower = input.trim().toLowerCase();

  if (trimmedAndLower === "") {
    return [];
  }

  return trimmedAndLower.split(/\s+/g);
}
