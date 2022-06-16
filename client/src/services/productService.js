const axios = require('axios');

export const createProduct = (product) => axios.post('http://localhost:8080/api/products', {
    product 
});

export const getProducts = () => axios.get('http://localhost:8080/api/products');

export const getProduct = (id) => axios.get(`http://localhost:8080/api/products/${id}`);

export const updateProduct = (id, product) => axios.put(`http://localhost:8080/api/products/update/${id}`, {
    product 
});

export const deleteProduct = (id) => axios.delete(`http://localhost:8080/api/products/delete/${id}`);