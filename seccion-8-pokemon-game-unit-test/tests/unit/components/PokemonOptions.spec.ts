import { ComponentPublicInstance } from "vue";
import { VueWrapper, shallowMount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions.vue";
import { mockPokemons } from "../mocks";

describe("PokemonOptions Component", () => {
  let wrapper: VueWrapper<any, ComponentPublicInstance<{}, any>>;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons: mockPokemons,
      },
    });
  });

  test("debe hacer match con el snapshoot", () => {
    // console.log(wrapper.html()); // renderiza el html con los mockPokemons
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de mostrar las 4 opciones correctamente", () => {
    // Debe tener 4 elementos
    const liTags = wrapper.findAll("li");
    expect(liTags.length).toBe(4);

    // Los 4 elementos deben ser igual pokemonMock
    const [li1, li2, li3, li4] = liTags;
    expect(li1.text()).toBe(mockPokemons[0].name);
    expect(li2.text()).toBe(mockPokemons[1].name);
    expect(li3.text()).toBe(mockPokemons[2].name);
    expect(li4.text()).toBe(mockPokemons[3].name);
  });

  test("debe de emitir 'selection' con sus respectivos parámetros  al hacer click", async () => {
    const [li1, li2, li3, li4] = wrapper.findAll("li");

    // No es necesario await solo para re renderizar
    // Yo igual le pongo xd
    await li1.trigger("click");
    await li2.trigger("click");
    await li3.trigger("click");
    await li4.trigger("click");

    // El 5 es poeque el primer pokemon le dimos id 5 en el mockPokemon
    // console.log(wrapper.emitted("selectionPokemon")); //  [ [ 5 ] ]

    // Se debe imprimir al menos 4 veces
    expect(wrapper.emitted("selectionPokemon")!.length).toBe(4);

    // El primer elemento que le dimos click osea "[5]" debe ser igual al valor del primer mockPokemon "5"
    // Como son arreglos usamos toEqual
    expect(wrapper.emitted("selectionPokemon")![0]).toEqual([
      mockPokemons[0].id,
    ]);
    expect(wrapper.emitted("selectionPokemon")![1]).toEqual([
      mockPokemons[1].id,
    ]);
    expect(wrapper.emitted("selectionPokemon")![2]).toEqual([
      mockPokemons[2].id,
    ]);
    expect(wrapper.emitted("selectionPokemon")![3]).toEqual([
      mockPokemons[3].id,
    ]);
  });
});
