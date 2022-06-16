import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProductComponent from "../components/Product";
import { deleteProduct, getProducts } from "../services/productService";

const Home = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const getProductsFromService = async () => {
        try {
            const ProductsFromService = await getProducts();
            console.log(ProductsFromService)
            setProducts(ProductsFromService.data.products);
        } catch(err) {
            console.log(err);
        }
    }

    const goToDetailPage = (id) => {
        console.log(id)
        navigate(`/products/${id}`, { replace: true });
    }

    const deleteProductFromService = async (id) => {
        try {
            await deleteProduct(id);
            const newProductArr = products.filter(product => product._id !== id);
            setProducts(newProductArr);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProductsFromService();
    }, []);

    return(
        <div>
            <h1>Product Manager</h1>
            {
                products.length > 0 && products.map(product => (
                    <ProductComponent product={product} key={product._id} onclick={() => goToDetailPage(product._id)} deleteProductFromService={deleteProductFromService} />
                ))
            }
        </div>

    )

}

export default Home;