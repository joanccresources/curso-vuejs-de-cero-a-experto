<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <Counter :start="101" /> -->
  <!-- <hr />
  <Counter title="Salieron" /> -->
  <Indecision />
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import Counter from "@/components/Counter.vue";
import Indecision from "@/components/Indecision.vue";

export default defineComponent({
  name: "App",
  components: {
    // Counter,
    Indecision,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
