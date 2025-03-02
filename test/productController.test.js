/*const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');  // Ajusta la ruta a tu archivo principal de la app
const { ProductModel } = require('../models/Product');

// Conectarse a la base de datos en memoria de MongoDB
beforeAll(async () => {
  const url = 'mongodb://127.0.0.1/your-database-name-test';  // Cambia según tu configuración
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Limpiar la base de datos después de cada prueba
afterEach(async () => {
  await ProductModel.deleteMany({});
});

// Desconectarse de la base de datos después de todas las pruebas
afterAll(async () => {
  await mongoose.connection.close();
});

// Test de la ruta "createProduct"
describe('POST /dashboard', () => {
  it('debería crear un nuevo producto', async () => {
    const productData = {
      name: 'Camiseta de prueba',
      description: 'Descripción de prueba',
      image: 'https://example.com/image.webp',
      category: 'Camisetas',
      size: 'M',
      price: 19.99,
    };

    const response = await request(app)
      .post('/dashboard')  // Asegúrate de que la ruta es la correcta
      .send(productData);

    expect(response.status).toBe(302);  // El redireccionamiento a '/dashboard'
    expect(response.headers.location).toBe('/dashboard');  // Asegúrate de que el redirect es correcto

    const createdProduct = await ProductModel.findOne({ name: 'Camiseta de prueba' });
    expect(createdProduct).toBeDefined();
    expect(createdProduct.price).toBe(19.99);
  });

  it('debería devolver un error si los datos no son completos', async () => {
    const productData = {
      name: 'Camiseta sin precio',
      description: 'Falta el precio',
      image: 'https://example.com/image.webp',
      category: 'Camisetas',
      size: 'M',
    };

    const response = await request(app)
      .post('/dashboard')
      .send(productData);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('All fields are required.');
  });
});

// Test de la ruta "showProducts"
describe('GET /products', () => {
  it('debería mostrar productos', async () => {
    const productData = {
      name: 'Camiseta de prueba',
      description: 'Descripción de prueba',
      image: 'https://example.com/image.webp',
      category: 'Camisetas',
      size: 'M',
      price: 19.99,
    };
    await ProductModel.create(productData);

    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Camiseta de prueba');
  });
});*/

