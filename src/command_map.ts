import { type State } from "./state.js";

export async function commandMapForward(state: State): Promise<void> {
  if (!state.nextLocationsURL) {
    await commandMap(state);
  } else {
    await commandMap(state, state.nextLocationsURL);
  }
}

export async function commandMapBack(state: State): Promise<void> {
  if (!state.prevLocationsURL) {
    console.log("You're on the first page.");
  } else {
    await commandMap(state, state.prevLocationsURL);
  }
}

async function commandMap(state: State, locationURL?: string): Promise<void> {
  let locationsObj;

  if (!locationURL) {
    locationsObj = await state.pokeAPI.fetchLocations();
  } else {
    locationsObj = await state.pokeAPI.fetchLocations(locationURL);
  }

  state.nextLocationsURL = locationsObj.next;
  state.prevLocationsURL = locationsObj.previous;

  for (const location of locationsObj.results) {
    console.log(location.name);
  }
}
