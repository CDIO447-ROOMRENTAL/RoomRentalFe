import React, { useState } from 'react';
import "./CreateProduct.css";
import DropUploadImage from '../../../image/upload/DropUploadImage';

function CreateProduct() {
  const [form, setForm] = useState({
    title: null,
    description: null,
    location: null,
    category: null,
    images: [],
    categories: []
  });

  const [files, setFiles] = useState([]);

  const handleUploadedImages = (images) => {
    setFiles(images);
  };

  const handleSubmit = () => {
    console.log(form);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      // change giá trị đã tồn tại
      setForm(prevState => ({
        ...prevState,
        categories: [e.value]
      }));
    } else {
      setForm(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  return (
    <div className='create-product-container'>
      <span className='title'>Create product</span>
      <DropUploadImage size={10} datasCallback={handleUploadedImages}/>
      <form className='form-container'>
        <label htmlFor="title">Title</label>
        <input name='title' id='title' onChange={handleChangeInput}></input>
        <label htmlFor='location'>Location</label>
        <input name='location' id='location' onChange={handleChangeInput}></input>
        <label htmlFor='description'>Description</label>
        <input name='description' id='description' onChange={handleChangeInput}></input>
        <label htmlFor='category'>Category</label>
        <select className='select' name='category' onChange={handleChangeInput}>
          <option className='option' value="1">1</option>
          <option className='option' value="2">2</option>
          <option className='option' value="3">3</option>
          <option className='option' value="4">4</option>
        </select>
      </form>
      <button type='button' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateProduct;
