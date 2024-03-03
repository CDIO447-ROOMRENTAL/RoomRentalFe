import React, { useEffect, useState } from 'react';
import "./CreateProduct.css";
import DropUploadImage from '../../../image/upload/DropUploadImage';
import TextEditor from '../../../editor/TextEditor';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesRequest, createProductRequest } from '../../../../store/redux/product/ProductRequest'; // Import createProductRequest
import Select from 'react-dropdown-select';
import { ToastContainer, toast } from 'react-toastify';
import FirebaseFileUploader from '../../../image/firebase/FirebaseFileUploader'
import { storage } from '../../../image/firebase/firebaseConfig';
import { ref } from "firebase/storage";
import { type } from '@testing-library/user-event/dist/type';

const styleEditor = {
  width: "100%",
  minHeight: "250px"
};

function CreateProduct() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.products?.categories?.data);
  const user = useSelector((state) => state?.auth?.login?.user)
  const jwt = user?.accessToken;

  const [files, setFiles] = useState([]);

  useEffect(() => {
    categoriesRequestMethod();
  }, [dispatch]);

  const categoriesRequestMethod = async () => {
    categoriesRequest(dispatch)
  };

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: null,
    address: '',
    categories: [],
    images: [],
  });

  const handleUploadedImages = (images) => {
    setFiles(images);
  };

  const handleSubmit = async () => {
    const urls = await uploadImages(files, "product");
    const newUrls = urls?.map(url => ({ url }));
    const newForm = { ...form, images: newUrls };

    try {
      const success = await createProductRequest(newForm, dispatch, jwt);
      if (success) {
        toast.success("Create new product success");
      } else {
        toast.error("Create new product failed");
      }
    } catch (error) {
      toast.error("An error occurred while creating a product");
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onChangeEditor = (value) => {
    setForm(prevState => ({
      ...prevState,
      description: value
    }));
  };

  const uploadImages = async (files, folderName) => {
    const urls = [];
    for (const element of files) {
      const storageRef = ref(
        storage,
        `${folderName}/${Date.now()}_${element?.name}`
      );
      try {
        const url = await FirebaseFileUploader(element.data, storageRef);
        urls.push(url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    return urls;
  };

  return (
    <div className='create-product-container'>
      <ToastContainer></ToastContainer>
      <span className='title'>Create product</span>
      <DropUploadImage size={5} datasCallback={handleUploadedImages} imageDatas={[]} imageDatasCallback={() => { }} />
      <form className='form-container'>
        <label htmlFor="title">Title</label>
        <input name='title' id='title' onChange={handleChangeInput} value={form.title}></input>
        <label htmlFor='address'>Address</label>
        <input name='address' id='address' onChange={handleChangeInput} value={form.address}></input>
        <label htmlFor='categories'>Categories</label>
        <div style={{ marginBottom: "10px" }}>
          <Select multi options={categories || []} labelField="name" valueField="id" onChange={(values) => setForm(prevState => ({ ...prevState, categories: values }))} values={form.categories || []} />
        </div>
        <label htmlFor='description'>Description</label>
        <TextEditor value={form.description} onChange={onChangeEditor} style={styleEditor} />
      </form>
      <div className="button-container" style={{ display: "flex", justifyContent: "end" }}>
        <button type='button' onClick={handleSubmit} className='cproduct-btn'>Submit</button>
      </div>
    </div>
  );
}

export default CreateProduct;
