"use client";

import { useAppSelector } from "@/store";
import { PokemonGrid } from "..";
import { IoHeartOutline } from "react-icons/io5";

export const FavoritesGrid = () => {
  const favorites = Object.values(useAppSelector((s) => s.pokemons.favorites));
  return favorites.length ? (
    <PokemonGrid pokemons={favorites} />
  ) : (
    <NoFavorites />
  );
};

export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className="mx-auto text-red-600" />
      <span>No hay favoritos</span>
    </div>
  );
};
