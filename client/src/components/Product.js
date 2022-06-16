import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

const ProductComponent = ({ product, onclick, deleteProductFromService}) => {
console.log(product)
    const { title, price, description, _id } = product;
    
    return(
        <div className="cardProduct">
            <div onClick={onclick}>
                <h3>{title}</h3>
                <h5>Precio: $ {price}</h5>
                <p>Descripción: {description}</p>
            </div>
            <Link to={`/editar-producto/${_id}`} replace={true}>Editar</Link>
            <Button variant="link" onClick={() => deleteProductFromService(_id)}>Eliminar</Button>
        </div>
    )
} 

export default ProductComponent;