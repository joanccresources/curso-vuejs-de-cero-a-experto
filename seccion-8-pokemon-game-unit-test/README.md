# seccion-7-pokemon-game

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

# Instalamos Axios
npm install axios

# v-model arguments
https://vuejs.org/guide/components/events.html
https://vuejs.org/guide/components/v-model.html#v-model-arguments

<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
<!-- OR -->
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}

<!-- Como lo captura el padre? -->
<!-- Hijo -->
  <button @click="$emit('increaseBy', 1)">
    Increase by 1
  </button>
<!-- Padre -->
  <!-- Desde el mismo componente -->
  <MyButton @increase-by="(n) => count += n" />
  <!-- O con un metodo -->
  <MyButton @increase-by="increaseCount" />
  methods: {
    increaseCount(n) {
      this.count += n
    }
  }
