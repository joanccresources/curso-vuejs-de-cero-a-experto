import { pokemonApi } from "@/api/pokemonApi";

describe("pokemonApi", () => {
  // Funciona en JAVASCRIPT XD
  test("axios debe estar configurado con el api de pokemon", () => {
    expect(pokemonApi.defaults.baseURL).toBe(
      "https://pokeapi.co/api/v2/pokemon"
    );
  });
});
