<template>
  <div class="mt-4">
    <ul class="list-group">
      <!-- Debemos ponerle su :key -->
      <li
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="list-group-item list-group-item-action"
        @click="$emit('selectionPokemon', pokemon.id)"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // pokemons=this.pokemons
    };
  },

  // Despues de renderizar se ejecuta el mounted
  // Es parecido al useEffect
  // Ciclo de vida del componente
  mounted() {
    console.log("mounted 2");
  },
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
</style>
