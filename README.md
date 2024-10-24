# musicappback

![nodejs](https://img.shields.io/badge/nodejs-20.10.0-blue) ![express](https://img.shields.io/badge/express-4.21.1-teal) ![cors](https://img.shields.io/badge/cors-2.8.5-lightseagreen) ![node-cache](https://img.shields.io/badge/node_cache-5.1.2-darkturquoise)  

Aplicación construida con NodeJS y Express, creada para buscar canciones por artista, y marcar aquellas favoritas.

## Instalación

1. Clonar este repositorio:

    ```sh
    git clone git@github.com:Niennis/musicappback.git
    ```
2. Navegar al directorio del proyecto:
    ```sh
    cd mi-api-node
    ```
3. Instalar las dependencias:
    ```sh
    npm install
    ```


## Uso

La aplicación está configurada para iniciar en ```app/index.js``` . El servidor estará escuchando en http://localhost:3020. Para iniciar el servidor, ejecutar:

```sh
npm start
```

Adicionalmente, la aplicación se encuentra desplegada en railway [https://musicappback-production.up.railway.app/](https://musicappback-production.up.railway.app/)


## Endpoints

1. Buscar canciones por artista:

    ```sh
    GET /search_tracks
    ```

Acepta dos parámetros, ```name``` es obligatorio, y ```usuario``` es opcional. Almacena la información en cache local. 


2. Marca una canción como favorita:

    ```sh
    POST /favoritos
    ```

Recibe los parámetros obligatorios ```nombre_banda, cancion_id, usuario, ranking``` . Almacena la información en cache local. 



## License

[ISC](https://www.isc.org/licenses/)