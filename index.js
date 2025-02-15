//inicio de la aplicación
const express=require('express');
const app=express();
require('dotenv').config();

const {dbConnection }=require('./config/db.js');


const PORT = process.env.PORT || 3000; 

dbConnection();

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})


