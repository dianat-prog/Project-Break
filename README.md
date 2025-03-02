"# Project-Break" 
# API de Productos
Este proyecto es una API desarrollada en Node.js con Express que gestiona productos y autenticación de usuarios utilizando Firebase Authentication. Contiene un sistema de   CRUD de productos y autenticación de usuarios.

## Tecnologías Utilizadas
- Node.js: Entorno de ejecución de JavaScript.
- Express.js: Framework para la creación de servidores en Node.js.
- MongoDB: Base de datos NoSQL utilizada para almacenar los productos.
- Mongoose: ODM para modelar datos en MongoDB.
- Firebase Authentication: Servicio de autenticación para gestionar usuarios.
- dotenv: Para manejar variables de entorno.
- cookie-parser: Para manejar cookies en las peticiones.
- smethod-override: Para soportar métodos HTTP como PUT y DELETE en formularios HTML.


---
## Instalación

### 1. Instalar Dependencias
npm install


### 2. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes configuraciones:

PORT=8081
FIREBASE_CREDENTIALS=./config/firebase.json


### 3 Iniciar el Servidor
npm start


El servidor estará disponible en `http://localhost:8081`.

---
## Endpoints de la API

### Rutas para validar el usuario administrador

- GET   /register --  Muestra el formulario de registro 
- POST /register --  Verifica y registra un usuario 
- GET /login --  Muestra el formulario de login 
- POST /login -- Verifica el token del usuario 
- GET /logout  --  Cierra la sesión del usuario 

### Rutas Productos

- GET  /products --  Muestra todos los productos 
- GET  /products/:productId --  Muestra el detalle de un producto 
- GET  /products/category/:category --  Muestra productos de una categoría 


### Rutas de Dashboard -- Requiere usuario que esté validado

- GET /dashboard  -- Muestra el panel de administración 
- GET  /dashboard/new -- Muestra formulario para un nuevo producto 
- POST /dashboard -- Crea un nuevo producto |
- GET dashboard/:productId -- Muestra el detalle de un producto en el panel 
- GET /dashboard/:productId/edit -- Muestra formulario para editar un producto 
- PUT  /dashboard/:productId -- Actualiza un producto 
- DELETE /dashboard/:productId/delete -- Elimina un producto 


---
##  Middleware
El middleware `checkAuth` protege las rutas de administración asegurando que solo los usuarios autenticados puedan acceder.

```js
const checkAuth = (req, res, next) => {
    const idTokenCookie = req.cookies.token;
    if (!idTokenCookie) return res.redirect('/login');
    auth.verifyIdToken(idTokenCookie)
        .then(decodedToken => {
            req.user = decodedToken;
            next();
        })
        .catch(error => {
            console.log(`Error verificando token: ${error}`);
            res.redirect('/login');
        });
};
```

---
##   Pruebas
Ejecutar pruebas con Jest:

-npm test






