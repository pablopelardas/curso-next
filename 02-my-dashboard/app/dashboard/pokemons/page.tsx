import { PokemonGrid, PokemonsResponse, SimplePokemon } from "@/pokemons";

const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const pokemonsResponse: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((res) => res.json());
  const pokemons = pokemonsResponse.results.map((pokemon) => ({
    id: pokemon.url.split("/").at(-2) as string,
    name: pokemon.name,
  }));
  // throw new Error("Esto es un error de prueba");
  return pokemons;
};

export default async function PokemonsPage() {
  const pokemons = await getPokemons(151);

  return (
    <div className="flex flex-col">
      <span className="text-6xl my-2">
        Listado de Pokemons <small>static</small>
      </span>
      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
