const mongoose =require('mongoose');

const productSchema= new mongoose.Schema({
    nombre:{
        type: String,
        required: [true,'The product name is required.']
        },
    descripcion: {
        type: String,
        required: true,
      },
    Imagen: {
        type: String,
        required: true,
      },
    Categoría: {
        type: String,
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
        required: true,
      },
    Talla: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
        required: true,
      },
    Precio: {type: Number,
        required: true,
        min: [0, 'The price cannot be negative.'],
    }

},{ timestamps: true });

const Product =mongoose.model('Product',productSchema);

module.exports={Product};