<template>
  <img v-if="image" :src="image" alt="Movies" class="img-bg" />
  <div class="bg-dark"></div>
  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <input
            type="text"
            class="form-control"
            placeholder="Hazme una pregunta"
            v-model="question"
          />
          <p>Recuerda terminar con un signo de interrogación (?)</p>
          <div class="mt-5" v-if="isValidQuestion">
            <p>{{ question }}</p>
            <p class="h1">{{ answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Indecision",
  props: {},
  data() {
    return {
      question: "",
      answer: null,
      image: null,
      isValidQuestion: false,
    };
  },
  methods: {
    async getAnswer() {
      try {
        this.answer = "Pensando...";
        const res = await fetch("https://yesno.wtf/api");
        const { answer, image } = await res.json();
        this.answer = answer === "yes" ? "Si" : "No!";
        this.image = image;
      } catch (error) {
        console.log("IndecisionComponent: ", error);
        this.answer = "No se pudo cargar del API";
        this.image = null;
      }
    },
  },
  // Watch - puede estar pendiente de las propiedades de data
  // Es como un observable
  // Recibe 2 valores
  watch: {
    // La funcion recibe el nombre de la propiedad
    question(value, oldValue) {
      this.isValidQuestion = false;
      console.log({ value });
      if (!value.includes("?")) return;

      this.isValidQuestion = true;
      // TODO: Realizar peticion HTTP
      this.getAnswer();
    },
  },
};
</script>

<style lang="scss" scoped>
.img-bg {
  max-width: 100%;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  inset: 0;
  z-index: 2;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4) !important;
  position: fixed;
  inset: 0;
  z-index: 2;
}

.content {
  position: relative;
  z-index: 9;
  color: white;
}
</style>
