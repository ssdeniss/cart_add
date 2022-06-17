import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/exports'
import { addCart } from '../Redux'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { useParams } from 'react-router'
import { ThreeDots } from 'react-loader-spinner'
const Cart = () => {
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
<div className="container">
    <div className="row">
        <div className="col-md-4">
            <img src={product.image} alt={product.title} height="200px" width="180px" />
        </div>
        <div className="col-md-4">
            <h3>{product.title}</h3>
            <p className="leaf fw-bold">
                {product.qty} X ${product.price} = $
                {product.qty * product. price}
            </p>
            <button className="btn btn-outline-dark me-4" >
                <i className="fa fa-minus"></i>
            </button>
            <button className="btn btn-outline-dark" >
                <i className="fa fa-plus"></i>
            </button>
        </div>
    </div>
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

export default Cart