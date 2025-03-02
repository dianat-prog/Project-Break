//inicio de la aplicación
const express=require('express');
require('dotenv').config();
const {dbConnection }=require('./config/db.js');
const routes=require('./routes/productRoutes.js')
const path =require('path');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');

const app=express();
const authRoutes =require('./routes/authRoutes.js')
const PORT = process.env.PORT || 3000; 


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(methodOverride('_method'));


//app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'public')));
 

app.use('/',authRoutes)
app.use('/', routes);

// Middleware para manejar rutas no encontradas (404)
app.use("*", (req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error); // Pasa el error al middleware de manejo de errores
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
});


dbConnection();


app.listen(PORT,()=>{
    console.log(`Server started on port http://localhost:${PORT}`);
})




