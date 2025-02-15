"# Project-Break" 
## Paso 1. Crear un Servidor Express

Inicializamos Node. Luego instalamos express para crear el servidor, mongoose para la conexión a la base de datos y dotenv las variables de entorno.

npm init -y
npm i express mongoose dotenv

Añado archivos en .gitignore para que no se añadan en el repositorio en Got

## Paso 2. Crear base de datos en Mongo Atlas
Creamos la base de datos en MongoDB Atlas. Instalamos mongodb

npm install mongodb

En el archivo .env añadimos la variable de entorno MONGO_URI y guardamos la conexión a la base de datos
En el archivo /config/db.js añadimos el código para la conexión a la base de datos.

pruebo la conexión a la base de datos y funciona!!!.

## Paso 3 Creación del modelo 

