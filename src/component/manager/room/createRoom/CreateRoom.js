import React, { useState } from 'react';
import "./CreateRoom.css";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DropUploadImage from '../../../image/upload/DropUploadImage';
import FirebaseFileUploader from '../../../image/firebase/FirebaseFileUploader';
import { ref } from 'firebase/storage';
import { storage } from '../../../image/firebase/firebaseConfig';
import TextEditor from '../../../editor/TextEditor';
import { ToastContainer, toast } from 'react-toastify';
import { roomCreateRequest } from '../../../../store/redux/product/ProductRequest';

function CreateRoom() {
    const dispatch = useDispatch();
    const accommodationId = useParams();
    const user = useSelector((state) => state?.auth?.login?.user);
    const jwt = user?.accessToken;

    const [files, setFiles] = useState([]);
    const [formRoom, setFormRoom] = useState({
        accommodationId: accommodationId.id,
        numberRoom: null,
        floor: 1,
        price: null,
        description: "",
        images: []
    });

    const handleUploadedImages = (images) => {
        setFiles(images);
    };

    const handleInputChange = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setFormRoom({ ...formRoom, [name]: value });
        }
    };


    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormRoom({ ...formRoom, [name]: parseInt(value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const urls = await uploadImages(files, "room");
        const newUrls = urls?.map(url => ({ url }));
        const newForm = { ...formRoom, images: newUrls };
        try {
            const success = await roomCreateRequest(dispatch, jwt, newForm);
            if (success) {
                toast.success("Create new product success");
            } else {
                toast.error("Create new product failed");
            }
        } catch (error) {
            toast.error("An error occurred while creating a product");
        }
    };

    const onChangeEditor = (value) => {
        setFormRoom(prevState => ({
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
        <div className='div-room-container'>
            <ToastContainer></ToastContainer>
            <h3>Create Room</h3>
            <DropUploadImage size={5} datasCallback={handleUploadedImages} imageDatas={[]} imageDatasCallback={() => { }} />
            <form className='div-form-container' >
                <div className='div-input-container'>
                    <div style={{ width: "55%" }}>
                        <label>Number room</label>
                        <input type='number' name='numberRoom' min={1} onChange={handleInputChange} />
                    </div>
                    <div style={{ width: "40%" }}>
                        <label>Floor</label>
                        <select name='floor' onChange={handleSelectChange}>
                            {Array.from({ length: 100 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label>Price</label>
                    <input type='number' name='price' onChange={handleInputChange} />
                </div>
                <div>
                    <label>Description</label>
                    <TextEditor value={formRoom.description} onChange={onChangeEditor} />
                </div>
            </form>
            <div style={{ display: "flex" }}>
                <button type='button' onClick={handleSubmit}>Submit</button>
            </div>

        </div>
    );
}

export default CreateRoom;
