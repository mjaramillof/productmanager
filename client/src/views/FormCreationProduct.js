import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { createProduct, getProduct, updateProduct } from "../services/productService";
import { useNavigate, useParams } from "react-router-dom";

const MySwal = withReactContent(Swal)

const FormCreationProduct = () => {
    
    const { id } = useParams();
    
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: ''
    })

    const [alertMsg, setAlertMsg] = useState([])

    const signupSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, 'Nombre debe tener mínimo 3 caracteres')
            .max(20, 'Nombre no puede tener más de 20 caracteres')
            .required('Este campo es requerido'),
        price: Yup.number()
            .required('Este campo es requerido'),
        description: Yup.string()
            .min(3, 'La descripción debe tener mínimo 3 caracteres')
            .max(100, 'La descripción no puede tener más de 100 caracteres')
            .required('Este campo es requerido')
    });
    

    const handlerSubmit = async (values) => {
        try {
            id ? await updateProduct(id, values) : await createProduct(values);
            await MySwal.fire({
                title: <strong>Se ha creado/actualizado el producto de manera exitosa</strong>,
                icon: 'success'
              })
            navigate('/products', { replace: true });
            await createProduct(values)

        } catch(err) {
            console.log(err.response.data);
            Object?.entries(err.response.data.error.errors).map((e)=>{
                console.log(e[1].message);
                setAlertMsg ([...alertMsg, e[1].message]);
            })
        }
    }

    // Refactorizar función para que no esté duplicada en 2 componentes
    const getProductFromService = async () => {
        try {
            const productToUpdate = await getProduct(id);
            console.log(productToUpdate)
            setProduct(productToUpdate.data.product);

        } catch(err) {
            //Todo: Mostrar error en el front
        }
    }

    useEffect(() => {
        id && getProductFromService();
    }, [])

    return (
        <div className="form-container">
            <h1>Creación y Edición de Productos</h1>
                <Formik
                    enableReinitialize
                    initialValues={product}
                    validationSchema={signupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                        handlerSubmit(values)
                    }}
                >
                    {({ errors, touched, getFieldProps }) => (
                        <FormikForm>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label><h3>Nombre del producto</h3></Form.Label>
                                <Form.Control type="text" placeholder="Ingresar nombre" value={product.title} {...getFieldProps('title')} />
                            </Form.Group>
                            {errors.title && (
                                <div className="errors-message">
                                    <p>{errors?.title}</p>
                                </div>
                            )}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label><h3>Precio</h3></Form.Label>
                                <Form.Control type="text" placeholder="Ingresar precio" value={product.price} {...getFieldProps('price')} />
                            </Form.Group>
                            {errors.price && (
                                <div className="errors-message">
                                    <p>{errors?.price}</p>
                                </div>
                            )}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label><h3>Descripción</h3></Form.Label>
                                <Form.Control type="text" as="textarea" rows={3} placeholder="Ingresa la descripción" value={product.description} {...getFieldProps('description')}/>
                            </Form.Group>  
                            {errors.description && (
                                <div className="errors-message">
                                    <p>{errors?.description}</p>
                                </div>
                            )}    
                            <Button variant="primary" type="submit">
                                Crear
                            </Button>
                            {alertMsg?.map((e)=><p>{e}</p>)}

                        </FormikForm>
                    )}

                </Formik>
        </div>
    )
}

export default FormCreationProduct;