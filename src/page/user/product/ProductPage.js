import React, { useEffect, useState } from 'react';
import MapComponent from "../../../component/map/MapComponent";
import CardProduct from '../../../component/card/product/CardProduct';
import { Link } from 'react-router-dom';
import './ProductPage.css'
import Pagination from '../../../component/pagination/Pagination';
import SearchBox from '../../../component/search/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { producPublicRequest } from '../../../store/redux/product/ProductRequest';

function ProductPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.products?.products?.data || {});

  const [pageableForm, setPageableForm] = useState({
    currentPage: 0
  });

  const [searchForm, setSearchForm] = useState({
    search: '',
    searchAddress: '',
    sortDate: '',
    category: '',
  });

  useEffect(() => {
    productRequestMethod();
  }, [dispatch, pageableForm, searchForm]);



  const handleOnSearch = (searchForm) => {
    setSearchForm(searchForm);
  };

  const productRequestMethod = () => {
    producPublicRequest(dispatch, pageableForm, searchForm);
  };

  const handlePageChange = (newPage) => {
    setPageableForm({ ...pageableForm, currentPage: newPage });
  };

  console.log(searchForm);
  return (
    <div className='product-container'>
      <SearchBox onSearch={handleOnSearch}></SearchBox>
      <div className='product-contents'>
        {products?.content && products.content.map((product, index) => (
          <Link to={`/product/detail/${product?.id}`} key={index} style={{ textDecoration: "none", textAlign: "center" }}>
            <CardProduct product={{ image: product?.images[0]?.url, title: product.title, address: product.address }} />
          </Link>
        ))}
      </div>
      {products?.totalPages !== undefined && (
        <Pagination totalPages={products.totalPages} currentPage={pageableForm.currentPage} onPageChange={handlePageChange} />
      )}
    </div>
  );
}

export default ProductPage;
