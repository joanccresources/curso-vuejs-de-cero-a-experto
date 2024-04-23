// import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "@/components/HelloWorld.vue";

// Test Suites
describe("Example Component", () => {
  // Test
  // Tambien en vez de "test" podemos usar "it"
  test("Debe ser mayor a 10", () => {
    // Arreglar
    let value = 9;

    // Estimulo
    value += 2;

    // Observar el resultado

    // --Esto no se usa
    // if (value > 10) // TODO: todo bien!
    // else throw `${value} no es mayor a 10`

    // Utilice toBeGreaterThan para comparar los valores [received >= expected] para números o enteros grandes.
    // "expect(received).toBeGreaterThan(expected)"
    expect(value).toBeGreaterThan(10);
  });
});
