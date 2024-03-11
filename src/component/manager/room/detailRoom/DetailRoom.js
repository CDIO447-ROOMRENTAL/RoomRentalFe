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
    const user = useSelector((state) => state?.auth?.login?.user)
    const jwt = user?.accessToken;
    const [statusUpdate, setStatusUpdate] = useState(false);
    const id = useParams();
    const room = useSelector((state) => state?.products?.productById?.room?.getRoomById?.data);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({});

    useEffect(() => {
        if (!room) {
            getProductByIdRequestMethod();
        } else {
            setLoading(false);
        }
    }, [dispatch, id, room]);

    const getProductByIdRequestMethod = async () => {
        setLoading(true);
        await roomGetByIdRequest(dispatch, jwt, id.id, id.roomID);
        // await setForm(room)
        setLoading(false);
    }


    const handleUploadedImages = (images) => {
        setFiles(images);
    };

    const handleSubmit = async () => {
        try {
            if (!room?.images || !files) {
                toast.error("Error updating product: Images not defined");
                return;
            }

            const filteredImages = room.images.filter(image =>
                !files.some(file => file.name === image.name)
            );

            for (const image of filteredImages) {
                try {
                    await FirebaseFileDelete(image.url);
                } catch (error) {
                    console.error("Error deleting image:", error);
                }
            }

            const urls = await uploadImages(files, "/product");

            const newUrls = urls.map(url => ({ url }));

            const newForm = { ...form, images: newUrls };

            const success = await roomUpdateRequest(dispatch, jwt, id.roomID, newForm);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='div-room-container'>
            <ToastContainer />
            <h3>Update Room</h3>
            <DropUploadImage
                size={5}
                datasCallback={handleUploadedImages}
                disabled={!statusUpdate}
                imageDatas={room?.images || []}
                imageDatasCallback={imageDatasCallbackMethod}
            />
            <form className='div-form-container'>
                <div className='div-input-container'>
                    <div style={{ width: "55%" }}>
                        <label>Number room</label>
                        <input type='number' name='numberRoom' value={form?.numberRoom || 0} min={1} onChange={handleChangeInput} disabled={!statusUpdate} />
                    </div>
                    <div style={{ width: "40%" }}>
                        <label>Floor</label>
                        <select name='floor' onChange={handleChangeInput} value={form?.floor || ''} disabled={!statusUpdate}>
                            {Array.from({ length: 100 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label>Price</label>
                    <input type='number' name='price' onChange={handleChangeInput} value={form?.price || null} disabled={!statusUpdate} />
                </div>
                <div>
                    <label>Description</label>
                    <TextEditor value={form?.description || ""} onChange={onChangeEditor} disabled={!statusUpdate} />
                </div>
                {statusUpdate && (
                    <button
                        type='button'
                        className='cproduct-btn'
                        style={{ backgroundColor: "#0033FF", width: "100px", marginRight: "20px" }}
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                )}
            </form>
            {!statusUpdate && (
                <button
                    type='button'
                    onClick={() => setStatusUpdate(!statusUpdate)}
                    className='cproduct-btn'
                    style={{ backgroundColor: "#28a745", width: "100px", marginRight: "20px" }}
                >
                    Edit
                </button>
            )}
            {statusUpdate && (
                <button
                    type='button'
                    onClick={() => setStatusUpdate(!statusUpdate)}
                    className='cproduct-btn'
                    style={{ backgroundColor: "#dc3545", width: "100px", marginRight: "20px" }}
                >
                    Cancel
                </button>
            )}
        </div>
    );
}

export default DetailRoom;
