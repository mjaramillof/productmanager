const Product = require('../models/product.model');

module.exports.getAllProducts = (req, res) => {
    Product.find()
        .then(products => res.json({ products }))
        .catch(err => res.status(500).json({ error: err, msg: 'No se han encontrado su productos' }));
};

module.exports.createProduct = (req, res) => {
    console.log(req.body.product)
    Product.create(req.body.product)
        .then(newProduct => res.json({ newProduct }))
        .catch(err => res.status(500).json({ error: err, msg: 'No se ha podido crear el producto' }));
}

module.exports.getProduct = (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json({ product }))
        .catch(err => res.status(404).json({ error: err, msg: 'No hemos podido traerte la lista de productos' }));
}

module.exports.updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body.product, { new: true })
        .then(updatedProduct => res.json({ updatedProduct }))
        .catch(err => res.status(500).json({ msg: 'No hemos podido actualizar el producto', error: err }))
}

module.exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json({ deleteConfirmation }))
        .catch(err => res.status(500).json({ msg: 'UNo hemos podido borrar el producto', error: err }));
}

