import { React, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from 'react-loader-spinner'
import { Link } from "react-router-dom"

const Products = () => {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState(data)
    const [loading, setLoading] = useState(false)
    let componentMounted = true

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            const response = await fetch("https://fakestoreapi.com/products")
            if (componentMounted) {
                setData(await response.clone().json())
                setFilter(await response.json())
                setLoading(false)
                console.log(filter);
            }
            return () => {
                componentMounted = false
            }
        }
        getProducts()
    }, [])

    const Loading = () => {
        return (
            <div className='loader'>
                <ThreeDots color="#00BFFF" height={80} width={80} />

            </div>
        )
    }
    const filterProduct = (cat) => {
        const updatedList = data.filter((x) => x.category == cat)
        setFilter(updatedList)
    }
    const ShowProducts = () => {
        return (
            <>
                <div className="buttons mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>Men's</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>Women's</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>Jewelery</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>Electronic</button>
                </div>
                {filter.map((product) => {
                    return (
                        <>
                            <div className="card col-md-3">
                                <div className="row h-100 text-center p-4" key={product.id}>
                                    <div className="col-md-4">
                                        <img src={product.image} className="img-fluid rounded-start" alt={product.title} height="250px" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title mb-0">{product.title.substring(0, 12)}</h5>
                                            <p className="card-text lead fw-bold">${product.price}</p>
                                            <Link to={`/${product.id}`} className="btn btn-outline-dark">Buy Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )

    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-5 mt-5">
                        <h1 className='text-center display-6 fw-border'>Latest Products</h1>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    )
}

export default Products