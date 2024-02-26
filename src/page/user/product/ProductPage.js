import React, { useState } from 'react';
import MapComponent from "../../../component/map/MapComponent";
import CardProduct from '../../../component/card/product/CardProduct';
import { Link } from 'react-router-dom';
import './ProductPage.css'
import Pagination from '../../../component/pagination/Pagination';
import SearchBox from '../../../component/search/SearchBox';

function ProductPage() {

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState({});
  const totalPages = 10; // Total number of pages
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }
  const handleOnSearch = (searchForm) => {
    setSearch(searchForm);
  };
  
  return (
    <div className='product-container'>
      <SearchBox onSearch={handleOnSearch}></SearchBox>
      {/* <Link to={"/"}><CardProduct product={{image:"1", title:"1",price:"1"}}></CardProduct></Link> */}
      <div className='product-contents'>
        <Link to={"/"}><CardProduct></CardProduct></Link>
        <Link to={"/"}><CardProduct></CardProduct></Link>
        <Link to={"/"}><CardProduct></CardProduct></Link>
        <Link to={"/"}><CardProduct></CardProduct></Link>
        <Link to={"/"}><CardProduct></CardProduct></Link>
        <Link to={"/"}><CardProduct></CardProduct></Link>
        <Link to={"/"}><CardProduct></CardProduct></Link>
        <Link to={"/"}><CardProduct></CardProduct></Link>
        <Link to={"/"}><CardProduct></CardProduct></Link>
      </div>
      {totalPages !== 0 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      )}

    </div>
  );
}

export default ProductPage;
