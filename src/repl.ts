import { initState } from "./state.js";

export function startREPL() {
  const state = initState();

  state.interface.prompt();
  state.interface.on("line", async (input: string) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      state.interface.prompt();
      return;
    }

    const commandName = words[0];
    const args = words.length > 1 ? words.slice(1) : [];

    if (commandName in state.commands) {
      try {
        // execute the command
        await state.commands[commandName].callback(state, ...args);
      } catch (err) {
        if (err instanceof Error) {
          console.log(`Error: ${err.message}`);
        }
      }
    } else {
      console.log("Unknown command");
    }

    state.interface.prompt();
  });
}

export function cleanInput(input: string): string[] {
  const trimmedAndLower = input.trim().toLowerCase();

  if (trimmedAndLower === "") {
    return [];
  }

  return trimmedAndLower.split(/\s+/g);
}
