import React, { useState, useEffect } from 'react';
import './ProductDetail.css';
import ImageSlide from '../../../../component/image/slide/ImageSlide';
import Dialog from '../../../../component/dialog/Dialog';
import { useParams } from 'react-router-dom';
import ChooseRoom from '../../../../component/product/chooseRoom/ChooseRoom';
import { useDispatch, useSelector } from 'react-redux';
import { getPriceMinMaxRoomsByAccommodationId, getProductPublicByIdRequest } from '../../../../store/redux/product/ProductRequest';
import PayPalButton from '../../../../component/paypal/PayPalButton';

function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state?.products?.productById?.data);
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const price = await getPriceMinMaxRoomsByAccommodationId(id);
        setPrice(price);
        getProductPublicByIdRequest(id, dispatch);
      }
    };

    fetchData();
  }, [id, dispatch]);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const formatNumber = (number) => {
    if (number !== undefined && number !== null) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return ""; // Trả về một chuỗi rỗng nếu `number` không tồn tại
  }
  return (
    <div className='div-product-container'>
      <div className='div-content-1'>
        <div className='div-content-left'>
          <div className='slide-images'>
            <ImageSlide images={product?.images || []}></ImageSlide>
          </div>
        </div>
        <div className='div-content-right'>
          <h2>{product?.title || 'Loading...'}</h2>
          <p><b>Price: </b>{formatNumber(price.minPrice)} - {formatNumber(price.maxPrice)}</p>
          <p><b>Address: </b> {product?.address || 'Loading...'}</p>
          <button onClick={openDialog}>Choose room</button>
          <Dialog isOpen={isOpen} onRequestClose={closeDialog} title="Choose room">
            <ChooseRoom accommodationId={id} images={product?.id}></ChooseRoom>
          </Dialog>
        </div>
      </div>
      <div className='div-content-2'>
        <div className='div-description'>Description</div>
        <div className='div-description-content' dangerouslySetInnerHTML={{ __html: product?.description || '' }}></div>
      </div>
    </div>
  );
}

export default ProductDetail;
