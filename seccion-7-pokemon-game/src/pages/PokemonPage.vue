<template>
  <div class="container">
    <h1 v-if="!pokemon">Espere porfavor...</h1>
    <div v-else>
      <h1>¿Quién es este pokémon?</h1>
      <!--  -->
      <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
      <PokemonOptions :pokemons="pokemonArr" @selection-pokemon="checkAnswer" />

      <div v-if="showAnswer" class="fade-in">
        <div
          class="alert h3 mt-3"
          :class="{ 'alert-success': isCorrect, 'alert-danger': !isCorrect }"
        >
          {{ message }}
        </div>
        <button @click="newGame" class="btn btn-primary mt-1">
          Nuevo juego!
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface Pokemon {
  id: number;
  name: string;
}
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";
import { getPokemonOptions } from "@/helpers";

export default {
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokemonArr: [] as Pokemon[],
      // Le ponemos null para que solo cuando se un objeto mande la imagen
      pokemon: null as Pokemon | null,
      showPokemon: false as boolean,
      // Para decirle si esta bien o mal lo seleccionado
      showAnswer: false as boolean,
      message: "" as string,
      isCorrect: true as boolean,
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();
      // Esto imprime un objeto y la data esta en [[Target]]
      // console.log(this.pokemonArr);

      // Debemos generar un aleatorio [0,3]
      const rndInt: number = Math.floor(Math.random() * 4);

      // Y ahora obtenemos el pokemon de esa posicion
      this.pokemon = this.pokemonArr[rndInt];
    },

    checkAnswer(pokemonSelectedId: number) {
      this.showPokemon = true;
      // Cuando hagamos click recien se vera el mensaje
      this.showAnswer = true;

      // Si son iguales es porque es el correcto
      if (pokemonSelectedId === this.pokemon!.id) {
        this.message = `Correcto, ${this.pokemon!.name}`;
        this.isCorrect = true;
      } else {
        this.message = `Oops, era ${this.pokemon!.name}`;
        this.isCorrect = false;
      }
    },

    newGame() {
      // Reiniciamos todas las variables de data
      this.pokemonArr = [];
      this.pokemon = null;
      this.showPokemon = false;
      this.showAnswer = false;
      this.message = "";
      this.isCorrect = true;

      this.mixPokemonArray();
    },
  },

  // Despues de renderizar se ejecuta el mounted
  // Es parecido al useEffect
  // Ciclo de vida del componente
  mounted() {
    console.log("mounted 1");
    // Una vez montado ejecutamos el metodo
    this.mixPokemonArray();
  },
};
</script>
