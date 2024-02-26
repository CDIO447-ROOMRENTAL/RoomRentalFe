import React from 'react'
import "./CardProduct.css"
function CardProduct({product}) {
  return (
    <div className="card-product">
      <img src={product?.image||urlImage}></img>
      <div className='card-content-text'>
        <h3>{product?.title||"product"}</h3>
        <p>price: {product?.price||"1000000"}</p>
      </div>
    </div>
  )
}

export default CardProduct

const urlImage= "https://cf.bstatic.com/xdata/images/hotel/max1024x768/483478916.jpg?k=9e379660faa82ce0b39e5051efe6144a1a1dc95649aea50cd5c516ce9ec2bd85&o=&hp=1"
