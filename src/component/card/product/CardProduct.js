import React from 'react'
import "./CardProduct.css"
function CardProduct({ product }) {
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <div className="card-product">
      <img src={product?.image || urlImage}></img>
      <div className='card-content-text'>
        <h3>{product?.title || "product"}</h3>
        <p><b>Price:</b> {formatNumber(product?.price?.minPrice || 0)} - {formatNumber(product?.price?.maxPrice || 0)}</p>
        <p><b>Address:</b> {product?.address || "Underfine"}</p>
      </div>
    </div>
  )
}

export default CardProduct

const urlImage = "https://cf.bstatic.com/xdata/images/hotel/max1024x768/483478916.jpg?k=9e379660faa82ce0b39e5051efe6144a1a1dc95649aea50cd5c516ce9ec2bd85&o=&hp=1"
