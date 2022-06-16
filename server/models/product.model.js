const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Debe tener un nombre válido'],
        minlength: [3, 'Debe tener un nombre con mínimo 3 caracteres']
    },
    price: {
        type: Number,
        required: [true, 'Debe definir un precio']
    },
    description: {
        type: String,
        required: [true, 'Debe tener una descripción'],
        minlength: [10, 'Debe tener un nombre con mínimo 10 caracteres'],
        maxlength: [100, 'Descripción máxima de 100 caracteres']
    }    
})

const Product = model('Product', productSchema);

module.exports = Product;