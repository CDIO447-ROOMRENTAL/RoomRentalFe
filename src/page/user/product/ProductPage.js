import React from 'react';
import MapComponent from "../../../component/map/MapComponent";
import CardProduct from '../../../component/card/product/CardProduct';
import { Link } from 'react-router-dom';
import './ProductPage.css'

function ProductPage() {
  return (
    <div className='product-container'>
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
      <div className='pagination-container'>
        <button>Prev</button>
        <div>1/2</div>
        <button>Next</button>
      </div>

    </div>
  );
}

export default ProductPage;
