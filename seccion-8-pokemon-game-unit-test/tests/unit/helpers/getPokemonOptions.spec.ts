import { getPokemonNames, getPokemonOptions, getPokemons } from "@/helpers";

describe("getPokemonOptions helpers", () => {
  test("debe de regresar un arreglo de numeros", () => {
    const pokemons = getPokemons();
    expect(pokemons.length).toBe(650);
    expect(pokemons[0]).toBe(1);
    expect(pokemons[500]).toBe(501);
    expect(pokemons[649]).toBe(650);
  });

  test("getPokemonNames debe retornar un arreglo de 4 elementos con nombres de pokemons", async () => {
    const expectedPokemons = [
      { id: 1, name: "bulbasaur" },
      { id: 2, name: "ivysaur" },
      { id: 3, name: "venusaur" },
      { id: 4, name: "charmander" },
    ];

    const pokemons = await getPokemonNames([1, 2, 3, 4]);
    // Debe retornar 4 elementos
    expect(pokemons.length).toBe(4);
    // Para verificar arreglos iguales usamos "toEqual" o "toStrictEqual"
    expect(pokemons).toStrictEqual(expectedPokemons);
  });

  test("getPokemonOptions debe de retornar un arreglo mezclado", async () => {
    const pokemons = await getPokemonOptions();
    expect(pokemons.length).toBe(4);
    expect(pokemons).toEqual([
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
    ]);
  });
});
