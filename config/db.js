//Configuración de la base de datos
const mongoose =require('mongoose');
require('dotenv').config();

const dbConnection =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully')
        }catch (error){
console.error(error);
throw new Error ('Error when starting the database')
    }
}

module.exports = {
    dbConnection,
};