import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextEditor from '../../../editor/TextEditor';
import DropUploadImage from '../../../image/upload/DropUploadImage';
import FirebaseFileUploader from '../../../image/firebase/FirebaseFileUploader';
import { storage } from '../../../image/firebase/firebaseConfig';
import { ref } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import { roomGetByIdRequest, roomUpdateRequest } from '../../../../store/redux/product/ProductRequest';
import FirebaseFileDelete from '../../../image/firebase/FirebaseFileDelete';

function DetailRoom() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.auth?.login?.user);
    const jwt = user?.accessToken;
    const room = useSelector((state) => state?.products?.productById?.rooms?.getRoomById?.data);
    const id = useParams();
    const [statusUpdate, setStatusUpdate] = useState(false);
    const [files, setFiles] = useState([]);
    const [formRoom, setFormRoom] = useState({});

    useEffect(() => {
        getRoomByIdMethod();
    }, [dispatch, id, jwt]);

    useEffect(() => {
        setFormRoom(room);
    }, [room]);

    const getRoomByIdMethod = () => {
        roomGetByIdRequest(dispatch, jwt, id.id, id.roomID);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormRoom({ ...formRoom, [name]: value });
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormRoom({ ...formRoom, [name]: parseInt(value) });
    };

    const handleSubmit = async () => {
        try {
            if (!room?.images || !files) {
                toast.error("Error updating product: Images not defined");
                return;
            }

            const filteredImages = room.images.filter(productImage =>
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

            const newForm = { ...formRoom, images: newUrls };

            const success = await roomUpdateRequest(dispatch, jwt, id.roomID, newForm);

            if (success) {
                getRoomByIdMethod();
                toast.success("Update product success");
            } else {
                toast.error("Update product failed");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Error updating product. Please try again later.");
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

    const [imageDatas, setImageDatas] = useState();

    const imageDatasCallbackMethod = (value) => {
        console.log(value);
        setImageDatas(value);
    };
    const handleUploadedImages = (images) => {
        setFiles(images);
    };

    return (
        <div className='div-room-container'>
            <ToastContainer></ToastContainer>
            <h3>Update Room</h3>
            <DropUploadImage size={5} datasCallback={handleUploadedImages} disabled={!statusUpdate} imageDatas={room?.images || []} imageDatasCallback={imageDatasCallbackMethod} />
            <form className='div-form-container' onSubmit={handleSubmit}>
                <div className='div-input-container'>
                    <div style={{ width: "55%" }}>
                        <label>Number room</label>
                        <input type='number' name='numberRoom' value={formRoom?.numberRoom || 0} min={1} onChange={handleInputChange} />
                    </div>
                    <div style={{ width: "40%" }}>
                        <label>Floor</label>
                        <select name='floor' onChange={handleSelectChange} value={formRoom?.floor}>
                            {Array.from({ length: 100 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label>Price</label>
                    <input type='number' name='price' onChange={handleInputChange} value={formRoom?.price || null} />
                </div>
                <div>
                    <label>Description</label>
                    <TextEditor value={formRoom?.description || ""} onChange={onChangeEditor} />
                </div>
            </form>
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
    );
}

export default DetailRoom;
