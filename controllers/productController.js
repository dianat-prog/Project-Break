const  { ProductModel, productSchema }= require('../models/Product')
const path = require('path');
const mongoose = require('mongoose');
const isAuthenticated = require('../middlewares/auth');  

const categories = productSchema.path('category').enumValues;


function baseHtml(content) {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Mi Tienda Online</title>
          <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
          ${content}
      </body>
      </html>
    `;
  }

// Barra de navegación con categorías y opción de subir producto si es dashboard
function getNavBar(categories, isDashboard ) {
    let  categoryLinks ='';
    if (isDashboard) {
        categoryLinks = `<li><a href="/dashboard">Productos</a></li>`
        categoryLinks += categories.map(cat => `<li><a href="/dashboard/category/${cat}">${cat}</a></li>`).join(' ');
        categoryLinks +=`<li><a href="/dashboard/new">Nuevo Producto</a></li><li><a href="/logout">Logout</a></li>`

        
 
    } else {
        categoryLinks = `<li><a href="/products">Productos</a></li>`
        categoryLinks += categories.map(cat => `<li><a href="/products/category/${cat}">${cat}</a></li>`).join(' ');
        categoryLinks +=`<li><a href="/login">Login</a></li>`
    }

   return `
      <nav>
            <div class="menu-toggle" id="menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul id="nav-menu">
                ${categoryLinks}
            </ul>
      </nav>
    `;
  }


  function  getProductCards (products,isDashboard) {
    let routeLogin ='products'
    if (isDashboard=== true) {routeLogin='dashboard'}

    let html = '';
        html += ` <div class="main-title"><h1>Productos</h1><div>`
        html += ` <div class="container-product">`
    for (let product of products) {
        let idProductoString = product._id.toString();
        html += `
        <div class="product-card">
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}">
        <a href="/${routeLogin}/${idProductoString}"><button class="login-button">Ver detalle</button></a>
        </div>
    `;
}
html += ` <div>`
return html;
}

function  getProductCardId (productId,product, isDashboard ) {
  
    let html = `
    <div class="container-productId">
        <div class="productId-card">
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <div><p>${product.description}</p></div>
            <div><p> ${product.price}€</p></div>
            <div><p>Categoria: ${product.category}</p></div>
            <div><p>Talla: ${product.size}</p></div>
          
         `;

 
    if (isDashboard) {
       
        html += `
            <div  > <button class="login-button" onclick="window.location.href='/dashboard/${productId}/edit'">Editar</button></div>
            <div>   <form action="/dashboard/${productId}/delete?_method=DELETE" method="POST">
                      <button type="submit" class="login-button">Borrar</button>
                        
                     </form></div>
        `;
    }

    html += `</div></div>`; 

return html;
}

//Html de formulario para producto
function getFormProduct (){
    let html = '';
    html +=` <div class="container">`
    html += `  <div class="main-title"><h1>Crear producto</h1><div>`
html += `      <div class="form-container">
                <form action="/dashboard" method="post">
                <!-- Nombre del producto -->
                <label for="name">Nombre del Producto:</label>
                <input type="text" id="name" name="name" placeholder="Escribe el nombre del producto" required>

                <!-- Descripción del producto -->
                <label for="description">Descripción:</label>
                <textarea id="description" name="description" placeholder="Escribe una descripción del producto" required></textarea>

                <!-- Imagen del producto -->
                <label for="image">Imagen:</label>
                <input type="text" id="image" name="image">

                <!-- Categoría -->
                <label for="category">Categoría:</label>
                <select id="category" name="category" required>
                    <option value="">Seleccionar Categoría</option>
                    <option value="Camisetas">Camisetas</option>
                    <option value="Pantalones">Pantalones</option>
                    <option value="Zapatos">Zapatos</option>
                    <option value="Accesorios">Accesorios</option>
                </select>

                <!-- Talla -->
                <label for="size">Talla:</label>
                <select id="size" name="size">
                    <option value="">Seleccionar Talla</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>

                <!-- Precio -->
                <label for="price">Precio:</label>
                <input type="number" id="price" name="price" placeholder="Introduce el precio" min="0" step="0.01" required>

                <!-- Botón de envío -->
                <button type="submit" class="login-button">Crear</button>
                </form>
            </div>
        </div>
`
return html;
}

function getFormProductEdit (idProduct,product){
    

    if (!mongoose.Types.ObjectId.isValid(idProduct)) {
        console.error("Error: ID de producto no válido en el formulario.");
    }


    const { name, description, image, category, size, price } = product;
   let html = '';
    html +=` <div class="container">`
    html += `  <div class="main-title"><h1>Editar producto</h1><div>`
html += `      <div class="form-container">
                    <form action="/dashboard/${idProduct}?_method=PUT" method="POST">
                    
                     
                    <label for="name">Nombre del Producto:</label>
                    <input type="text" id="name" name="name" value="${name}" required>

                    <label for="description">Descripción:</label>
                    <textarea id="description" name="description" required>${description}</textarea>

                    <label for="price">Precio:</label>
                    <input type="number" id="price" name="price" value="${price}" min="0" required>

                      <label for="image">Imagen:</label>
                    <input type="text" id="image" name="image" value="${image}">

                    <label for="category">Categoría:</label>
                    <select id="category" name="category" required>
                    <option value="">Seleccionar Categoría</option>
                    <option value="Camisetas" ${category === 'Camisetas' ? 'selected' : ''}>Camisetas</option>
                    <option value="Pantalones" ${category === 'Pantalones' ? 'selected' : ''}>Pantalones</option>
                    <option value="Zapatos" ${category === 'Zapatos' ? 'selected' : ''}>Zapatos</option>
                    <option value="Accesorios" ${category === 'Accesorios' ? 'selected' : ''}>Accesorios</option>
                    </select>

                    <label for="size">Talla:</label>
                    <select id="size" name="size">
                    <option value="">Seleccionar Talla</option>
                    <option value="XS" ${size === 'XS' ? 'selected' : ''}>XS</option>
                    <option value="S" ${size === 'S' ? 'selected' : ''}>S</option>
                    <option value="M" ${size === 'M' ? 'selected' : ''}>M</option>
                    <option value="L" ${size === 'L' ? 'selected' : ''}>L</option>
                    <option value="XL" ${size === 'XL' ? 'selected' : ''}>XL</option>
                    </select>

                   
                    
                    <button type="submit" class="login-button">Guardar</button>
                              
                    </form>

               
             
            </div>
        </div>
`

return html;
}




const productController = {
    async createProduct (req, res) {
       try {
            const { name, description, image, category, size, price } = req.body;
      
            if (!name || !description   || !category ||  !price) {
                return res.status(400).json({ error: "All fields are required." });
            }
            
            const newProduct = { name, description, image, category, size, price };
         
            const product = await ProductModel.create(newProduct);
            //res.status(201).send({ message: "Product created successfully.", product });
              // Guardar mensaje en la sesión
           // req.session.message = '¡Producto guardado exitosamente!';

           // ir a la página con todos los productos
            res.redirect('/dashboard');
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: "There was a problem trying to create a product" });
        }
    
    },

    //: Devuelve la vista con el formulario para subir un artículo nuevo.
 async showNewProduct (req, res) {
           try {
            let isLogged = isAuthenticated(req); 
         
            
           const pageContent = `
           ${getNavBar(categories, isLogged)}
           ${getFormProduct()} `;
      
           const html = baseHtml(pageContent);
           res.send(html);  
       } catch (error) {
                console.error(error);
                res
                    .status(500)
                    .send({ message: "There was a problem trying to create a product" });
            }
        
        },

 async updateProduct (req, res) {

    if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
        return res.status(400).send("ID de producto inválido");
    }

    try {
        const { name, description, image, category, size, price } = req.body;
    

        if (!name || !description || !image || !category || !size || !price) {
            return res.status(400).json({ error: "All fields are required." });
        }
        

        const product = await ProductModel.findByIdAndUpdate(
            req.params.productId,
            req.body, 
            { new: true }
           
        );

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
      
       res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ error: "Error updating product" });
    }
},

//delete 
async deleteProduct(req,res){
    try {
      
  
        const { productId } = req.params; 
      
        const product = await ProductModel.findByIdAndDelete(productId);
      

        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ error: "Error deleting product" });
    }
},

  async showProducts (req, res)  {
   
    try{
      
        let isLogged = isAuthenticated(req); 
      
        const products = await ProductModel.find();

        const pageContent = `
        ${getNavBar(categories, isLogged)}
        ${getProductCards(products,isLogged)}
      `;
       
    const html = baseHtml(pageContent);
    res.send(html);

   
    }catch (error){
        console.error(error);
        res
            .status(500)
            .send({message:'Error getting products'})

    }

  },

  async showProductsByCategory (req, res)  {
   
    try{

        console.log('Entra en showProductsByCategory ')
        let isLogged = isAuthenticated(req); 
     

        const { category } = req.params;
  
        // Validar que la categoría sea válida
        const validCategories = ['camisetas', 'pantalones', 'zapatos', 'accesorios'];
        if (!validCategories.includes(category.toLowerCase())) {
          return res.status(400).json({ message: 'Categoría no válida.' });
        }


        const products = await ProductModel.find({ 
            category: { $regex: new RegExp(`^${category}$`, 'i') }
          } );

        if (products.length === 0) {
          return res.status(404).json({ message: 'No se encontraron productos en esta categoría.' });
        }

        const pageContent = `
        ${getNavBar(categories, isLogged)}
        ${getProductCards(products,isLogged)}
      `;
       
    const html = baseHtml(pageContent);
    res.send(html);

   
    }catch (error){
        console.error(error);
        res
            .status(500)
            .send({message:'Error getting products'})

    }

  },

   
  async showProductById (req, res)  {
  
    try{
          
        let isLogged = isAuthenticated(req);
        
        const productId = req.params.productId; 
         if (!mongoose.Types.ObjectId.isValid(productId)) {
            console.error("Error: ID de producto no válido en el formulario.");
            return res.status(400).json({ error: "Invalid product ID" });

        }
        
        const product = await ProductModel.findById(productId);
      
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        console.log('Valor de log por ID',isLogged)
        const pageContent = `
        ${getNavBar(categories, isLogged)}
        ${getProductCardId(productId,product,isLogged)}
      `;
       
    const html = baseHtml(pageContent);
    res.send(html);

   
    }catch (error){
        console.error(error);
        res
            .status(500)
            .send({message:'Error searching for product'})

    }
  },


  async showEditProduct (req, res)  {
    console.log('Entra en showEditProduct ')
    try{
        let isLogged = isAuthenticated(req);
       
        const {productId} =req.params
        const product= await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
      
    const pageContent = `
    ${getNavBar(categories, isLogged)}
    ${getFormProductEdit(productId,product)} `;

    const html = baseHtml(pageContent);
    res.send(html);  

   
    }catch (error){
        console.error(error);
        res
            .status(500)
            .send({message:'Error edit for product'})

    }
  }

  
}

module.exports = productController;