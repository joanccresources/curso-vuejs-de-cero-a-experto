import { ComponentPublicInstance } from "vue";
import { shallowMount, mount, VueWrapper } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage.vue";
import { mockPokemons } from "../mocks";
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";
interface Pokemon {
  id: number;
  name: string;
}

describe("PokemonPage Component", () => {
  let wrapper: VueWrapper<any, ComponentPublicInstance<{}, any>>;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);

    jest.clearAllMocks();
  });

  test("debe hacer match con el snapshoot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Debe de llamar mixPokemonArray al montar", () => {
    // ---Metodo de la clase
    // const mixPokemonArraySpy = jest.spyOn(
    //   PokemonPage.methods!,
    //   "mixPokemonArray"
    // );
    // expect(mixPokemonArraySpy).toHaveBeenCalled();
    // ---Este metodo no funciono y si funciono en otro
    // const mixPokemonArraySpy = jest.spyOn(wrapper.vm, "mixPokemonArray");
    // expect(mixPokemonArraySpy).toHaveBeenCalled();
    // Expected number of calls: 1
    // Received number of calls: 0
    // ---ChatGpt
    // const mixPokemonArrayMock = jest.fn();
    // const wrapper = shallowMount(PokemonPage, {
    //   methods: {
    //     mixPokemonArray: mixPokemonArrayMock,
    //   },
    // });
  });

  test("debe hacer match con el snapshot cuando cargan los pokemons", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: mockPokemons as Pokemon[],
          pokemon: mockPokemons[0] as Pokemon | null,
          showPokemon: false as boolean,
          showAnswer: false as boolean,
          message: "" as string,
          isCorrect: true as boolean,
        };
      },
    });
    const wrapper2 = mount(PokemonPage, {
      data() {
        return {
          pokemonArr: mockPokemons as Pokemon[],
          pokemon: mockPokemons[0] as Pokemon | null,
          showPokemon: false as boolean,
          showAnswer: false as boolean,
          message: "" as string,
          isCorrect: true as boolean,
        };
      },
    });
    // ---- Te imprime un pedaso nomas algo ligero
    // console.log(wrapper.html());
    //   <div class="container">
    //   <div>
    //     <h1>¿Quién es este pokémon?</h1><!--  -->
    //     <pokemon-picture-stub pokemonid="5" showpokemon="false"></pokemon-picture-stub>
    //     <pokemon-options-stub pokemons="[object Object],[object Object],[object Object],[object Object]"></pokemon-options-stub>
    //     <!--v-if-->
    //   </div>
    // </div>

    // ----Te imprime Todo
    // console.log(wrapper2.html());
    // <div class="container">
    //   <div>
    //     <h1>¿Quién es este pokémon?</h1><!--  -->
    //     <div class="pokemon-container"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg" alt="pokemon" class="img-fluid img-hidden"></div>
    //     <div class="mt-4">
    //       <ul class="list-group">
    //         <!-- Debemos ponerle su :key -->
    //         <li class="list-group-item list-group-item-action">bulbasaur</li>
    //         <li class="list-group-item list-group-item-action">ivysaur</li>
    //         <li class="list-group-item list-group-item-action">venusaur</li>
    //         <li class="list-group-item list-group-item-action">charmander</li>
    //       </ul>
    //     </div>
    //     <!--v-if-->
    //   </div>
    // </div>
    expect(wrapper.html()).toMatchSnapshot();
    // Siempre que sea posible usar el shallowMount
  });

  test("debe de mostrar los componentes de PokemonPicture y PokemonOptions", () => {
    // PokemonPicture debe de existir
    // PokemonOptions debe de existir
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: mockPokemons as Pokemon[],
          pokemon: mockPokemons[0] as Pokemon | null,
          showPokemon: false as boolean,
          showAnswer: false as boolean,
          message: "" as string,
          isCorrect: true as boolean,
        };
      },
    });
    const picture = wrapper.find("pokemon-picture-stub");
    const options = wrapper.find("pokemon-options-stub");
    expect(picture.exists()).toBeTruthy();
    expect(options.exists()).toBeTruthy();

    // PokemonPicture attribute pokemonid===5 (5 es el codigo del primero pokemon)
    // PokemonOptions attribute pokemons toBe true

    expect(picture.attributes("pokemonid")).toBe(mockPokemons[0].id.toString());
    expect(options.attributes("pokemons")).toBeTruthy();
  });

  test("pruebas con checkAnswer", async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: mockPokemons as Pokemon[],
          pokemon: mockPokemons[0] as Pokemon | null,
          showPokemon: false as boolean,
          showAnswer: false as boolean,
          message: "" as string,
          isCorrect: true as boolean,
        };
      },
    });

    // Ejecuta el metodo literalmente
    // Le mandamos el id del primer pokemon
    await wrapper.vm.checkAnswer(5);

    // Con esto validamos que cuando se ejecuta la funcion "checkAnswer"
    // entonces ".title-h2" existe
    expect(wrapper.find(".title-h2").exists()).toBeTruthy();

    // console.log(wrapper.find(".title-h2").text()); // Correcto, bulbasaur

    // Si entro a checkAnswer entonces showPokemon debe ser true
    expect(wrapper.vm.showPokemon).toBeTruthy();

    expect(wrapper.find(".title-h2").text()).toBe(
      `Correcto, ${mockPokemons[0].name}`
    );

    // Ejecuta el metodo literalmente
    // le mandamos el id del segundo pokemon
    await wrapper.vm.checkAnswer(10);
    // console.log(wrapper.vm.message);
    expect(wrapper.vm.message).toBe(`Oops, era ${mockPokemons[0].name}`);
  });
});
