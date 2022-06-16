import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

import ProductComponent from "../components/Product";
import { getProduct } from "../services/productService";

const Detail = () => {

    const { id } = useParams();

    const [product, setProduct] = useState();

    const getProductFromService = async () => {
        const productFromService = await getProduct(id);
        console.log(productFromService)
        setProduct(productFromService.data.product);
    }

    useEffect(() => {
        id && getProductFromService();
        console.log(id)
    }, [id])

    return(
        <>
            {product && (
                <div>
                    <Link to="/products">Volver</Link>
                    <h1>Detalle de Producto</h1>
                    <ProductComponent product={product}/>
                </div>

            )}
        </>
    )
}

export default Detail;