# Pruebas unitarias
Ejemplo: Hacer prueba en una llanta
  - Que gire
  - Que tenga la rotacion deseada

# Pruebas de Integracion
Agarramos 4 llantas y al colocarlo al 
carro asegurarnos que funcione

# Caracteristicas
- Fáciles de escribir
- Fáciles de leer
- Confiables
- Rápidas
- Principalmente

# Concepto AAA para realizar una prueba
- Arrange (Arreglar)
  - Preparamos el estado inicial
    - Inicializamos variables
    - Importaciones necesarias
- Act     (Actuar)
  - Aplicamos acciones o estimulos
    - Llamar metodos
    - Simular Clicks
    - Realizar acciones sobre el paso anterior
- Assert  (Afirmar)
  - Observar el comportamiento resultante
    - Son resultados esperados
    - Ej: Que algo cambie, algo incremente o bien que nada suceda

# Mitos
  - Hacen que mi aplicacion no tenga errores
  - Las pruebas no pueden fallar
  - Hacen mas lenta mi aplicación
  - Es una perdida de tiempo
  - Hay que probar todo
* Lo que se hace es probar la ruta critica

# npm run test:unit

# Para que vuelva a crear los snapshots
https://jestjs.io/docs/cli#using-with-package-manager
npm run test:unit -- -u

# si por ejemplo solo quiero evaluar el test de Counter
npm run test:unit Counter

# Configuración repetida
https://jestjs.io/docs/setup-teardown#repeating-setup
https://jestjs.io/docs/setup-teardown#scoping

<!-- Normalmente su usan para hacer limpieza en cada prueba -->

<!-- Se ejecuta antes de todos los Test Suites  -->
beforeAll(() => console.log('1 - beforeAll'));
<!-- Se ejecuta despues de todos los Test Suites  -->
afterAll(() => console.log('1 - afterAll'));
<!-- Se ejecuta antes de cada una de las pruebas -->
beforeEach(() => console.log('1 - beforeEach'));
<!-- Se ejecuta despues de cada una de las pruebas -->
afterEach(() => console.log('1 - afterEach'));

test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));

  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll

# Informacion del wrapper 
https://test-utils.vuejs.org/api/#Wrapper-properties
vm: ComponentPublicInstance

# Para arreglar el error del global
https://stackoverflow.com/questions/45445976/tsc-cannot-find-name-of-global-object
##Debe ir "node" en types
{
  "compilerOptions": {
    ...
    "types": ["node", "webpack-env", "jest"],

##Luego para el mok del fetch 
https://stackoverflow.com/questions/73725134/mock-global-fetch-with-typescript-getting-error-is-not-assignable-to-type
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({....}),
  }),
) as jest.Mock;  // <-- adding this solved the issue