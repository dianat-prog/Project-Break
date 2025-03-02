const express = require("express");
const router = express.Router();
//const Product = require("../models/Product");
const productController = require('../controllers/productController')
const checkAuth = require('../middlewares/authMiddleware')



router.get("/", (req, res) => {
    res.redirect("/products");
});
///products/:productId: Devuelve el detalle de un producto.
router.get('/products',productController.showProducts);

///Devuelve el detalle de un producto.
router.get('/products/:productId',productController.showProductById);

// Ruta: Obtener productos por categoría
router.get('/products/category/:category', productController.showProductsByCategory); //
//





//Rutas Dashboard

//Devuelve el dashboard del administrador. 
// En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
router.get('/dashboard',checkAuth, productController.showProducts);

router.get('/dashboard/new',checkAuth,  productController.showNewProduct);   //Devuelve el formulario para subir un artículo nuevo.

router.post('/dashboard', checkAuth, productController.createProduct) //Crea un nuevo producto.

router.get('/dashboard/:productId',checkAuth,  productController.showProductById); // RUTA DINÁMICA DESPUÉS

router.get('/dashboard/:productId/edit',checkAuth, productController.showEditProduct);//Devuelve el formulario para editar un producto.

router.get('/dashboard/category/:category',  checkAuth,productController.showProductsByCategory); // Ruta: Obtener productos por categoría


router.put('/dashboard/:productId',checkAuth,productController.updateProduct) // Actualiza un producto

router.delete('/dashboard/:productId/delete', checkAuth, productController.deleteProduct); //Elimina un producto.
 





module.exports = router;