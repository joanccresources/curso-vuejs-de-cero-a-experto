import { VueWrapper, shallowMount } from "@vue/test-utils";
import { ComponentPublicInstance } from "vue";
import Counter from "@/components/Counter.vue";

// Test Suites
describe("Counter Component", () => {
  let wrapper: VueWrapper<any, ComponentPublicInstance<{}, any>>;
  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  // test("Debe hacer match con el snapshot", () => {
  //   const wrapper = shallowMount(Counter);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });
  test('h2 debe de tener el valor por defecto "Counter"', () => {
    // const wrapper = shallowMount(Counter);

    // Regresa el primer h2 que encuentre en el HTML
    // Es un elemento de tipo DOMWrapper
    const h2 = wrapper.find("h2");
    expect(h2.exists()).toBeTruthy();

    console.log(h2.text()); // Debe ser Counter
    expect(h2.text()).toBe("Counter");
  });

  test("el valor por defecto debe ser 100 en el p", () => {
    // *** Wrapper
    // const wrapper = shallowMount(Counter);

    // *** pTags
    // const pTags = wrapper.findAll("p");
    // expect(pTags[1].exists()).toBeTruthy();

    // ⬆️ funciona pero ahora usaermos el data
    const p = wrapper.find(`[data-testid="counter"]`);
    expect(p.exists()).toBeTruthy();

    // *** expect segundo p === 100
    // toContain es como include
    // expect(pTags[1].text()).toContain("100");

    // ⬆️
    expect(p.text()).toBe("100");
  });

  test("Debe incrementar y decrementar en 1 el valor del contador", async () => {
    // const wrapper = shallowMount(Counter);

    // Lo mejor para los botones seria
    const [increaseBtn, decreaseBtn] = wrapper.findAll("button");

    // Existen?
    expect(increaseBtn.exists()).toBeTruthy();
    expect(decreaseBtn.exists()).toBeTruthy();

    // Click en +1
    await increaseBtn.trigger("click");
    // Click en -1
    await decreaseBtn.trigger("click");
    await decreaseBtn.trigger("click");

    // Validamos el valor
    const p = wrapper.find(`[data-testid="counter"]`).text();
    expect(p).toBe("99");
  });

  test("debe establecer el valor por defecto", () => {
    const { start } = wrapper.props() as { start: number };

    const p = wrapper.find(`[data-testid="counter"]`).text();

    expect(Number(p)).toBe(start);
  });

  test("debe de mostrar la prop title", () => {
    // Como voy a enviar props es peligroso para mis otras pruebas
    // ya que tambien las recibiran, por eso creamos un nuevo wrapper
    const title = "Hola mundo :v";
    const wrapper = shallowMount(Counter, {
      props: {
        title,
      },
    });
    expect(wrapper.find("h2").text()).toBe(title);
  });
});
