import { FavoritesGrid } from "@/pokemons/components/FavoritesGrid";
import { IoHeartOutline } from "react-icons/io5";

export const metadata = {
  title: "Favoritos",
  description: "Favoritos",
};

export default async function PokemonsPage() {
  return (
    <div className="flex flex-col">
      <span className="text-6xl my-2">
        Pokemones Favoritos{" "}
        <small className="text-blue-400">Global State</small>
      </span>
      <FavoritesGrid />
    </div>
  );
}
