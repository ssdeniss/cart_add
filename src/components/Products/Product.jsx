import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from '../Redux'
import { useParams } from 'react-router'
import { ThreeDots } from 'react-loader-spinner'
import { Link } from "react-router-dom"

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const addProduct = (product) => {
        dispatch(addCart(product))
    }
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            setProduct(await response.json())
            setLoading(false)
        }
        getProduct();
    }, [])
    const Loading = () => {
        return (
            <div className='loader'>
                <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>
        )
    }
    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6">
                    <img src={product.image} alt={product.title} height="400px" width="400px" />
                </div>
                <div className="col-md-6">
                    <h4 className='text-uppercase text-black-50'>
                        {product.category}
                    </h4>
                    <h1 className='display-5'>{product.title}</h1>
                    <p className="lead fw-bolder">
                        Rating {product.rating && product.rating.rate}
                        <i className="fa fa-star"></i>
                    </p>
                    <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
                    <p className="lead">{product.description}</p>
                    <button className="btn btn-outline-dark px-4 py-2" onClick={() => addProduct}>Add to Cart</button>
                    <Link to="/cart" className="btn btn-dark ms-2 px-3 py-2">Go to Cart</Link>
                </div>
            </>
        )
    }
    return (
        <div>
            <div className="container py-4">
                <div className="row">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    )
}

export default Product