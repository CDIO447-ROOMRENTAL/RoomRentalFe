import React, { useEffect, useState } from 'react';
import "./Contract.css";
import PayPalButton from '../../../component/paypal/PayPalButton';
import { ExchangeRateUSDToVND } from '../../../component/exchangeRate/ExchangeRateUSDToVND';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ImageSlide from '../../../component/image/slide/ImageSlide';
import { createContractRequest } from '../../../store/redux/contract/ContractRequest';
import { useNavigate } from 'react-router-dom';

function Contract() {
  const rooms = useSelector(state => state?.products?.productById?.rooms?.data);
  const { id } = useParams();
  const [room, setRoom] = useState();
  const [paypalValue, setPaypalValue] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.login?.user)
  const jwt = user?.accessToken;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: '',
    phone: '',
    email: '',
    address: '',
    idCard: ''
  });

  const [exchangeRateUSDToVND, setExchangeRateUSDToVND] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await ExchangeRateUSDToVND();
      setExchangeRateUSDToVND(data);
    };

    fetchData();

    const foundRoom = rooms?.find(value => value.id === id);
    if (foundRoom) {
      setRoom(foundRoom);
    }
  }, [id, rooms]);
  useEffect(() => {
    if (paypalValue) { // Add a check to ensure paypalValue is not null or undefined
      const newForm = {
        ...form,
        order: JSON.stringify(paypalValue),
        roomId: id
      };
      createContractRequest(newForm, dispatch, jwt);
      navigate("/");
    }
  }, [paypalValue]);


  const handlePaymentSuccess = (value) => {

    try {
      setPaypalValue(value)
    } catch (error) {
      console.log(error);
    }
  };


  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  return (
    <div className="contract-container">
      <form className='form-container'>
        <div style={{ width: "100%", height: "200px", display: "block", overflow: "auto" }}>
          <ImageSlide images={room?.images}></ImageSlide>
        </div>
        <div>
          <label>FullName</label>
          <input name='fullname' onChange={handleOnChangeInput} value={form.fullname}></input>
        </div>
        <div>
          <label >Phone</label>
          <input name='phone' onChange={handleOnChangeInput} value={form.phone}></input>
        </div>
        <div>
          <label>Email</label>
          <input name='email' onChange={handleOnChangeInput} value={form.email}></input>
        </div>
        <div>
          <label>Address</label>
          <input name='address' onChange={handleOnChangeInput} value={form.address}></input>
        </div>
        <div>
          <label>ID Card</label>
          <input name='idCard' onChange={handleOnChangeInput} value={form.idCard}></input>
        </div>
        <div className='btn-container'>
          {exchangeRateUSDToVND && <PayPalButton onSuccess={handlePaymentSuccess} amount={(room?.price / exchangeRateUSDToVND).toFixed(2)}></PayPalButton>}
        </div>
      </form>
    </div>
  );
}

export default Contract;
