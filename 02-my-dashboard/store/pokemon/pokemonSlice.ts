import { SimplePokemon } from "@/pokemons";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PokemonsState {
  favorites: Record<string, SimplePokemon>;
}



const initialState: PokemonsState = {
  favorites: {},
};

export const PokemonsSlice = createSlice({
  name: "Pokemons",
  initialState,
  reducers: {
    setFavoritePokemons: (
      state,
      action: PayloadAction<Record<string, SimplePokemon>>
    ) => {
      state.favorites = action.payload;
    },
    togglePokemon: (state, action: PayloadAction<SimplePokemon>) => {
      const { id } = action.payload;
      if (state.favorites[id]) {
        delete state.favorites[id];
      } else {
        state.favorites[id] = action.payload;
      }
      localStorage.setItem(
        "favorite-pokemons",
        JSON.stringify(state.favorites)
      );
    },
  },
});

export const { togglePokemon, setFavoritePokemons } = PokemonsSlice.actions;

export default PokemonsSlice.reducer;
