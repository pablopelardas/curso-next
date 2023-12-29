"use client";
import { Provider } from "react-redux";
import { store } from ".";
import { SimplePokemon } from "@/pokemons";
import { useEffect } from "react";
import { setFavoritePokemons } from "./pokemon/pokemonSlice";

interface Props {
  children: React.ReactNode;
}

const getInitialFavoritesState = (): Record<string, SimplePokemon> => {
  return JSON.parse(localStorage.getItem("favorite-pokemons") ?? "{}");
};
export const Providers = ({ children }: Readonly<Props>) => {
  useEffect(() => {
    const favorites = getInitialFavoritesState();
    store.dispatch(setFavoritePokemons(favorites));
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
