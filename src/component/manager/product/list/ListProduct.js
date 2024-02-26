import React from 'react'
import "./ListProduct.css"
import Pagination from '../../../pagination/Pagination'
import { Link } from 'react-router-dom'
function ListProduct() {
    return (
        <div className='list-product-container'>
            <span className='title'>List product</span>
            <div className='search-product-container'>
                <input placeholder='Enter search'></input>
                <Link to='/management/product/create'>Create</Link>
            </div>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th style={{ width: '1000px' }}>Location</th>
                            <th>Created at</th>
                            <th>Description</th>
                            <th>Images</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{index + 1}</td>
                                <td>{index + 1}</td>
                                <td>{index + 1} ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</td>
                                <td>{index + 1}</td>
                                <td>{index + 1}</td>
                                <td>{index + 1}</td>
                                <td>{index + 1}</td>
                                <td>
                                    <a style={{ textDecoration: "none", color: "black" }}>Detail</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='pagination-container'>
                <Pagination></Pagination>
            </div>
        </div>
    )
}

export default ListProduct
