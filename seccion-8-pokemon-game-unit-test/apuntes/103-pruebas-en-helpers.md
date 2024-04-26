# Funciones Helpers
- Agregamos exportaciones al archivo getPokemonOptions para poder probarlos en el test
- 

# Error de axios solucion
https://stackoverflow.com/questions/73958968/cannot-use-import-statement-outside-a-module-with-axios
  - En el archivo "jest.config.js" debe incluir lo siguiente
    //jest.config.js
    "moduleNameMapper": {
      "^axios$": "axios/dist/node/axios.cjs"
    }


# corregimos el error de la prueba anterior :)

#
