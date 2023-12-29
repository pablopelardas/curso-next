import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";

export const localStorageMiddleware = (state: MiddlewareAPI) => {
  return (next: Dispatch) => (action: Action) => {
    next(action);
    if (action.type === "Pokemons/togglePokemon") {
      const { pokemons } = state.getState();
      localStorage.setItem("favorite-pokemons", JSON.stringify(pokemons));
    }
  };
};
