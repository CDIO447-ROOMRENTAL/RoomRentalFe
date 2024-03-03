import React, { useEffect, useState } from 'react';
import "./ListProduct.css"; // Uncomment this line to import your CSS file
import Pagination from '../../../pagination/Pagination';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productRequest } from '../../../../store/redux/product/ProductRequest';

function ListProduct() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state?.products?.products?.data);
    const user = useSelector((state) => state?.auth?.login?.user);
    const jwt = user?.accessToken;
    const [pageable, setPageable] = useState({
        number: 0
    });

    useEffect(() => {
        fetchProducts();
    }, [dispatch, pageable]);

    const fetchProducts = async () => {
        await productRequest(dispatch, jwt, pageable);
    }

    const handlePageChange = (pageNumber) => {
        setPageable(prevPageable => ({
            ...prevPageable,
            number: pageNumber
        }));
    }

    const handleInputPageFormChange = (e) => {
        const { name, value } = e.target;
        setPageable(prevPageable => ({
            ...prevPageable,
            [name]: value
        }));
    }

    return (
        <div className='list-product-container'>
            <span className='title'>List product</span>
            <div className='search-product-container'>
                <input className='search-input' placeholder='Enter search' name='search' onChange={handleInputPageFormChange}></input>
                <Link className='create-link' to='/management/product/create'>Create</Link>
            </div>
            <div className='product-table-container'>
                <table className='product-table'>
                    <thead>
                        <tr>
                            <th className='table-header'>#</th>
                            <th className='table-header'>ID</th>
                            <th className='table-header'>Title</th>
                            <th className='table-header'>Address</th>
                            <th className='table-header'>Created at</th>
                            <th className='table-header'>Description</th>
                            <th className='table-header'>Images</th>
                            <th className='table-header'>Category</th>
                            <th className='table-header'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.content?.map((product, index) => (
                            <tr key={index} className='table-row'>
                                <td className='table-data'>{index + 1}</td>
                                <td className='table-data'>{product.id}</td>
                                <td className='table-data'>{product.title}</td>
                                <td className='table-data'>{product.address}</td>
                                <td className='table-data'>{product.createdAt}</td>
                                <td className='table-data'>{product.description}</td>
                                <td className='table-data image-cell'>
                                    {product.images && product.images.map((image, imageIndex) => (
                                        <a key={imageIndex} href={image?.url} target="_blank">
                                            <img src={image?.url} alt={`image-${imageIndex + 1}`} className='product-image' />
                                        </a>
                                    ))}
                                </td>
                                <td className='table-data'>
                                    {product?.categories?.map((value, index) => (
                                        <span key={index}>{value.name}</span>
                                    ))}
                                </td>

                                <td className='table-data'>
                                    {/* Use Link to navigate to product detail page */}
                                    <Link to={`/management/product/detail/${product.id}`} className='detail-link'>Detail</Link>
                                    <Link to={`/management/product/detail/${product.id}/room`} className='detail-link'>List room</Link>
                                    <Link to={`/management/product/detail/${product.id}/room/create`} className='detail-link'>Add room</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {(products?.content?.length !== 0) ? (
                <div className='pagination-container'>
                    <Pagination totalPages={products.totalPages} currentPage={products.number} onPageChange={handlePageChange} className='pagination'></Pagination>
                </div>
            ) : (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "600" }}>Product Not Found</p>
            )}
        </div>
    )
}

export default ListProduct;
