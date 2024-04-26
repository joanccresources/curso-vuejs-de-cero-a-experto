import { shallowMount } from "@vue/test-utils";
import PokemonPicture from "@/components/PokemonPicture.vue";

describe("PokemonPicture", () => {
  //  npm run test:unit PokemonPicture.spec.ts -- -u
  test("debe de hacer match con el snapshoot", () => {
    // Montamos el componente y le pasamos los props
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 1,
        showPokemon: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de mostrar la imagen oculta y el pokemon 100", () => {
    const pokemonId = 100;
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId,
        showPokemon: false,
      },
    });

    const [img1, img2] = wrapper.findAll("img");
    // Si efectivamente existe la 1er imagen
    expect(img1.exists()).toBeTruthy();
    // Pasa si img2 es no definido (por las puras sabemos que hay solo uno)
    expect(img2).toBe(undefined);

    // console.log(img1.classes()); // [ 'img-fluid', 'img-hidden' ]

    // Si tiene la clase "img-hidden" pasa
    expect(img1.classes("img-hidden")).toBe(true);

    // Asi obtenemos el src de la imagen    
    expect(img1.attributes("src")).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
    );
    
  });

  test("debe de mostrar el pokemon si showPokemon:true", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: true,
      },
    });

    // Solo hay una imagen
    const img = wrapper.find("img");
    // Existe esta imagen ?
    expect(img.exists()).toBeTruthy();
    // Esta imagen tiene la clase "fade-in"?
    expect(img.classes("fade-in")).toBe(true);
  });
});
