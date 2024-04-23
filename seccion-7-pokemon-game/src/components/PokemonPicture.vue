<template>
  <div class="pokemon-container">
    <img :src="imgSrc" alt="pokemon" class="img-fluid img-hidden" />
    <img
      v-if="showPokemon"
      :src="imgSrc"
      alt="pokemon"
      class="img-fluid fade-in"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    pokemonId: {
      type: Number,
      required: true,
    },
    showPokemon: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  data(): { id: number } {
    return {
      id: this.pokemonId,
    };
  },

  computed: {
    imgSrc(): string {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.id}.svg`;
    },
  },
});
</script>

<style lang="scss" scoped>
.pokemon-container {
  height: 200px;
}
img {
  height: 200px;
  position: absolute;
  right: 32%;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
.img-hidden {
  filter: brightness(0);
}
</style>
