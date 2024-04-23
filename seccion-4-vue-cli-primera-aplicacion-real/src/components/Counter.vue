<template>
  <!-- v-bind:href="url" === :href="url" -->
  <!-- v-on:click="addToCart" === @click="addToCart" -->
  <h2>{{ customTitle }}</h2>
  <!-- Evitar poner logica en el HTML -->
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>

  <input type="number" v-model="inputValue" class="form-control" />
  <div class="mt-3">
    <button @click="changeCounter(inputValue)" class="btn btn-primary me-2">
      Increment (+{{ inputValue }})
    </button>
    <button @click="changeCounter(inputValue * -1)" class="btn btn-primary">
      Decrement (-{{ inputValue }})
    </button>
  </div>
</template>

<script>
export default {
  // props: ["title"],
  props: {
    title: String,
    start: {
      type: Number,
      default: 100, // en caso no se mande toma el 100
      // required: true,

      // Validando el valor recibido
      // En caso no cumpla recibimos un warning
      validator(value) {
        return value > 100;
      },
    },
  },
  // El "name" es para verlo en los tools de no ponerlo se muestra con el nombre del archivo
  // name: "Patito",
  data() {
    return {
      counter: this.start,
      inputValue: 1,
    };
  },
  methods: {
    // Lo llamamos en el HTML asi: {{ getSquareValue() }}
    getSquareValue() {
      console.log("methods getSquareValue");
      return this.counter ** 2;
    },
    //
    changeCounter(value) {
      this.counter = this.counter + value;
    },
  },
  // Utiliza el cache
  // Parecido al useMemo
  // Debene retornar algo
  computed: {
    // Lo llamamos en el HTML asi: {{ squareCounter }}
    // Es llamado una sola vez
    squareCounter() {
      console.log("computed squareCounter");
      return this.counter ** 2;
    },
    // El titulo no puede quedar vacio
    customTitle() {
      return this.title || "Counter";
    },
  },
};
</script>
