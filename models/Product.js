const mongoose =require('mongoose');

const productSchema= new mongoose.Schema({
  name:{
        type: String,
        required: [true,'The product name is required.']
        },
    description: {
        type: String,
        required: true,
      },
    image: {
      type: String,
      validate: {
        validator: function (value) {
          // Expresión regular para validar URLs (http, https, con o sin www)
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/.test(value);
        },
        message: 'The image must be a valid URL ending in .png, .jpg, .jpeg, .gif, .webp, or .svg.'
      }
        
      },
      category: {
        type: String,
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
        required: true,
      },
      size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
       },
      price: {type: Number,
        required: true,
        min: [0, 'The price cannot be negative.'],
        validate: {
          validator: function (value) {
            return typeof value === 'number' && !isNaN(value);
          },
          message: 'The price must be a valid number.'
        }
    }

},{ timestamps: true });

const ProductModel =mongoose.model('Product',productSchema);

module.exports= { ProductModel, productSchema };