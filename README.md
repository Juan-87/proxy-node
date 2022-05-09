# Servidor Proxy

Servidor de proxy inverso configurable desarrollado en NodeJS y con cache en Redis

## Configuración del Proxy

Para comenzar a utilizar el servidor de proxy inverso, debe configurarlo creando el archivo **index.js** dentro de la carpeta **"/config"**, utilizar **"index.example.js"** como base.

### `Methods`

Arreglo con los métodos aceptados por el proxy

### `ValidationsTypes`

Tipos de validaciones aceptadas por el proxy (Dejar tal cual el archivo de ejemplo)

### `Apis`

Configuración individual para cada API, es un objeto en el cual la llave es el **"slug"** con el cual se reconoce cada API y el valor es otro objeto en el cual se setean la configuraciones individuales para cada API.

#### path

URL de la API

#### cache

Tiempo durante el que se cachean las respuestas dadas por cada API, este parámetro es opcional

#### rate_limit

Objeto en el cual se limita el acceso a la API. Estas limitaciones se pueden configurar por: 

 - api: Accesos totales a la API
 - endpoint: Accesos totales a cada endpoint de la API
 - ip: Accesos totales por IP a la API
 - ipEndpoint: Accesos totales por IP a cada endpoint de la API

Todos estos parámetros descritos anteriormente son opcionales.

## Modo de uso

Para comenzar a utilizar el servidor, deberá tener **Docker** y **Docker Compose** instalados, clonar el repositorio y, posicionado en la carpeta root del proyecto, ejecutar el siguiente comando:  

```
docker-compose up
```

## APIs de ejemplo

Si inicia el servidor utilizando las configuraciones proporcionadas de ejemplo se consumirán las siguientes APIs de uso público: 

 - [PokéApi](https://pokeapi.co) - Ejemplo: (http://localhost:3000/pokemon/pokemon) devolverá la respuesta de (https://pokeapi.co/api/v2/pokemon)
 - [The Rick and Morty API](https://rickandmortyapi.com) - Ejemplo: (http://localhost:3000/rickandmorty/character) devolverá la respuesta de (https://rickandmortyapi.com/api/character)
 - [SWAPI](https://swapi.dev) - Ejemplo: (http://localhost:3000/starwars/people) devolverá la respuesta de (https://swapi.dev/api/people)
