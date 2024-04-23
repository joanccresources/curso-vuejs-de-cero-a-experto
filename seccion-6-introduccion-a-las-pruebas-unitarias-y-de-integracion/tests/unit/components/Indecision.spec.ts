import { VueWrapper, shallowMount } from "@vue/test-utils";
import { ComponentPublicInstance } from "vue";
import Indecision from "@/components/Indecision.vue";

describe("Indecision Component", () => {
  let wrapper: VueWrapper<any, ComponentPublicInstance<{}, any>>,
    cslSpy: jest.SpyInstance<void, any[]>;

  // solucion a error con el fetch
  // Recuerda poner en tsconfig "node"
  // "types": ["node", "webpack-env", "jest"],
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: "yes",
          forced: false,
          image: "https://yesno.wtf/assets/yes/2.gif",
        }),
    })
  ) as jest.Mock;

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    // Quiero espiar o "hacer un mok" a console.log
    cslSpy = jest.spyOn(console, "log");

    // Para limpiar los moks
    jest.clearAllMocks();
  });

  test("debe hacer match con el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("escribir en el input no debe disparar nada (console.log)", async () => {
    // Para llegar al metodo getAnswer necesitamos "wrapper.vm"
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");

    const input = wrapper.find("input");
    // Escribimos en en el input "Hola Mundo"
    await input.setValue("Hola Mundo");

    // Queremos que el console.log halla sido llamado
    // expect(cslSpy).toHaveBeenCalled();

    // Tambien para ver que funcione deberia llamarse solo una vez
    expect(cslSpy).toHaveBeenCalledTimes(1);

    // Se debio llamar 0 veces ya que no tiene "?"
    expect(getAnswerSpy).toHaveBeenCalledTimes(0);

    // opcional a ⬆️ tambien seria valido - No fue llamado
    // expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test("escribir el simbolo '?' debe disparar el getAnswer", async () => {
    // Espiamos la el method "getAnswer"
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");

    // Le agregamos al input "?"
    const input = wrapper.find("input");
    await input.setValue("eres?");

    expect(cslSpy).toHaveBeenCalledTimes(1);
    // Deberia ejecutarse al menos 1 vez ya que tiene "?"
    expect(getAnswerSpy).toHaveBeenCalledTimes(1);
  });

  test(`pruebas en getAnswer`, async () => {
    // Esperamos por ser asincrona
    await wrapper.vm.getAnswer();

    console.log(wrapper.vm.image); // https://yesno.wtf/assets/yes/2.gif
    console.log(wrapper.vm.answer); // Si

    // Entonces compruebo que la imagen existe
    const img = wrapper.find("img");
    expect(img.exists()).toBeTruthy();
    // El valor de la imagen debe ser "https://yesno.wtf/assets/yes/2.gif"
    // porque asi lo pusimos
    expect(wrapper.vm.image).toBe("https://yesno.wtf/assets/yes/2.gif");
    // Lo mismo para el answer
    expect(wrapper.vm.answer).toBe("Si");
  });

  test(`pruebas en getAnswer - Fallo en el API`, async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject("Api is down")
    );
    
    // Entonces
    await wrapper.vm.getAnswer();
    const img = wrapper.find("img");
    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe("No se pudo cargar del API");
  });
});
