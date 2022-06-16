const { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');

module.exports = (app) => {
    app.get('/api/products', getAllProducts);
    app.get('/api/products/:id', getProduct);
    app.post('/api/products', createProduct);
    app.put('/api/products/update/:id', updateProduct);
    app.delete('/api/products/delete/:id', deleteProduct);
}
