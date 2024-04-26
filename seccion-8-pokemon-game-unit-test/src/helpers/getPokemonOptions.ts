import { pokemonApi } from "@/api/pokemonApi";
import { AxiosResponse } from "axios";

interface Pokemon {
  id: number;
  name: string;
}
interface PokemonResponse extends Pokemon {}

export const getPokemons = (): number[] => {
  const pokemons = Array.from(Array(650));
  return pokemons.map((_, i) => i + 1);
};

export const getPokemonNames = async ([a, b, c, d]: number[]): Promise<Pokemon[]> => {
  try {
    // Usando FETCH
    // const pokemonRequests = [a, b, c, d].map((item) =>
    //   fetch(`https://pokeapi.co/api/v2/pokemon/${item}`)
    // );
    // const results = await Promise.all(pokemonRequests);
    // const dataPokemons: PokemonResponse[] = await Promise.all(
    //   results.map((result) => result.json())
    // );
    // return dataPokemons.map((p) => ({ id: p.id, name: p.name }));

    // USANDO AXIOS
    const promiseArr = [
      pokemonApi.get(`/${a}`),
      pokemonApi.get(`/${b}`),
      pokemonApi.get(`/${c}`),
      pokemonApi.get(`/${d}`),
    ];
    // const pokemonRequests =
    const dataPokemons: AxiosResponse<PokemonResponse, any>[] =
      await Promise.all(promiseArr);

    return dataPokemons.map((p) => ({
      id: p.data.id,
      name: p.data.name,
    })) as Pokemon[];
  } catch (error) {
    console.log(error);
    return [] as Pokemon[];
  }
};

export const getPokemonOptions = async (): Promise<Pokemon[]> => {
  // Generamos aleatorios y los mezclamos
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  // Obtenemos los 4 primeros pokemons
  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));
  return pokemons;
};
