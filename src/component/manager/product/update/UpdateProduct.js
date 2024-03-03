import React, { useEffect, useState } from 'react';
import "./UpdateProduct.css";
import DropUploadImage from '../../../image/upload/DropUploadImage';
import TextEditor from '../../../editor/TextEditor';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesRequest, getProductByIdRequest, updateProductByIdRequest } from '../../../../store/redux/product/ProductRequest';
import Select from 'react-dropdown-select';
import { ToastContainer, toast } from 'react-toastify';
import FirebaseFileUploader from '../../../image/firebase/FirebaseFileUploader';
import { storage } from '../../../image/firebase/firebaseConfig';
import { ref } from "firebase/storage";
import { useParams } from 'react-router-dom';
import FirebaseFileDelete from '../../../image/firebase/FirebaseFileDelete';
import { useNavigate } from 'react-router-dom';

const styleEditor = {
  width: "100%",
  minHeight: "250px"
};

function UpdateProduct() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.products?.categories?.data);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.login?.user)
  const jwt = user?.accessToken;
  const [statusUpdate, setStatusUpdate] = useState(false);
  const { id } = useParams();
  const product = useSelector((state) => state?.products?.productById?.data)

  const [files, setFiles] = useState([]);

  useEffect(() => {
    categoriesRequestMethod();
    getProductByIdRequestMethod();
    setForm({...product});
  }, [dispatch]);

  const getProductByIdRequestMethod = async () => {
    await getProductByIdRequest(id || "", dispatch, jwt);
  }

  const categoriesRequestMethod = async () => {
    await categoriesRequest(dispatch);
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

    try {
      if (!product?.images || !files) {
        toast.error("Error updating product: Images not defined");
        return;
      }

      const filteredImages = product.images.filter(productImage =>
        !files.some(file => file.name === productImage.name)
      );

      for (const image of filteredImages) {
        try {
          await FirebaseFileDelete(image.url);
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      }

      const urls = await uploadImages(files, "/product");

      imageDatas?.map((value) => { urls.push(value.url) });


      const newUrls = urls.map(url => ({ url }));

      const newForm = { ...form, images: newUrls };

      const success = await updateProductByIdRequest(product.id, newForm, dispatch, jwt);

      if (success) {
        getProductByIdRequestMethod();
        toast.success("Update product success");
      } else {
        toast.error("Update product failed");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again later.");
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

  const [imageDatas, setImageDatas] = useState()
  const imageDatasCallbackMethod = (value) => {
    setImageDatas(value);
  }
  return (
    <div className='create-product-container'>
      <ToastContainer></ToastContainer>
      <span className='title'>Detail product</span>
      <DropUploadImage size={5} datasCallback={handleUploadedImages} disabled={!statusUpdate} imageDatas={product?.images || []} imageDatasCallback={imageDatasCallbackMethod} />
      <form className='form-container'>
        <label htmlFor="title">Title</label>
        <input name='title' id='title' onChange={handleChangeInput} value={form?.title || ""} disabled={!statusUpdate}></input>
        <label htmlFor='address'>Address</label>
        <input name='address' id='address' onChange={handleChangeInput} value={form?.address || ""} disabled={!statusUpdate}></input>
        <label htmlFor='categories'>Categories</label>
        <div style={{ marginBottom: "10px" }}>
          <Select multi options={categories || []} labelField="name" valueField="id" onChange={(values) => setForm(prevState => ({ ...prevState, categories: values }))} values={form?.categories || []} style={{ backgroundColor: !statusUpdate ? "#FAFAFA" : "white", opacity: !statusUpdate ? "0.5" : "1" }} disabled={!statusUpdate} />
        </div>
        <label htmlFor='description'>Description</label>
        <TextEditor value={form?.description || ""} onChange={onChangeEditor} style={styleEditor} disabled={!statusUpdate} />
      </form>
      <div className="button-container" style={{ display: "flex", justifyContent: "end" }}>
        {
          !statusUpdate && (
            <button
              type='button'
              onClick={() => {navigate(`/management/product/detail/${product.id}/room/create`)}}
              className='cproduct-btn'
              style={{ backgroundColor: "#dc3545", width: "auto", marginRight: "20px" }} // Chọn màu xanh lam cho "Edit" và đỏ cho "Cancel"
            >
              Add room
            </button>
          )
        }
        {
          !statusUpdate && (
            <button
              type='button'
              onClick={() => setStatusUpdate(!statusUpdate)}
              className='cproduct-btn'
              style={{ backgroundColor: "#28a745", width: "100px", marginRight: "20px" }} // Chọn màu xanh lam cho "Edit" và đỏ cho "Cancel"
            >
              Edit
            </button>
          )
        }
        {
          statusUpdate && (
            <button
              type='button'
              onClick={() => { setStatusUpdate(!statusUpdate); handleSubmit() }}
              className='cproduct-btn'
              style={{ backgroundColor: "#0033FF", width: "100px", marginRight: "20px" }} // Chọn màu xanh lam cho "Edit" và đỏ cho "Cancel"
            >
              Update
            </button>
          )
        }

        {
          statusUpdate && (
            <button
              type='button'
              onClick={() => setStatusUpdate(!statusUpdate)}
              className='cproduct-btn'
              style={{ backgroundColor: "#dc3545", width: "100px", marginRight: "20px" }} // Chọn màu xanh lam cho "Edit" và đỏ cho "Cancel"
            >
              Cancel
            </button>
          )
        }
      </div>
    </div >
  );
}

export default UpdateProduct;
