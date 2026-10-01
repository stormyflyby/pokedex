import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>): void {
  console.log("Welcome to the Pokedex!\nUsage:\n");
  for (const name in commands) {
    const command = commands[name];
    console.log(`${command.name}: ${command.description}`);
  }
}
