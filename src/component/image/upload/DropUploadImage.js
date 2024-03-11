import React, { useState, useRef, useEffect } from 'react';
import './DropUploadImage.css'; // Import CSS for styling

function DropUploadImage({ size = 1, datasCallback, imageDatas = [], disabled = false, imageDatasCallback = [] }) {
    const [images, setImages] = useState([]);
    const [imageIdCounter, setImageIdCounter] = useState(0); // Counter to generate unique identifiers for images
    const fileInputRef = useRef(null); // Reference to the file input element
    const [imageDatasInput, setImageDatasInput] = useState(imageDatas);


    // Function to handle file drop
    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        handleFiles(files);
        resetFileInput();
    };

    // Function to handle file selection through file input
    const handleFileSelect = (e) => {
        const files = e.target.files;
        handleFiles(files);
        resetFileInput();
    };

    // Function to reset the file input field
    const resetFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the value of the file input
        }
    };

    // Function to handle files
    const handleFiles = async (files) => {
        // Create an array to store promises for each image
        const promises = [];

        // Check if adding the new images will exceed the limit of 5
        if (images.length + files.length > size) {
            alert(`You can upload a maximum of ${size} images.`);
            return;
        }

        // Iterate through each file
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file && file.type.startsWith('image/')) {
                // Check if the file already exists in the images array
                if (!images.some((image) => image.name === file.name && image.size === file.size)) {
                    // Create a new FileReader instance
                    const reader = new FileReader();

                    // Create a promise for each image
                    promises.push(
                        new Promise((resolve) => {
                            // Set up onload event handler for the FileReader
                            reader.onload = () => {
                                // Convert the data to a Blob object
                                const blob = new Blob([reader.result], { type: file.type });

                                // Resolve the promise with the Blob object
                                resolve({ id: imageIdCounter + i, data: blob, name: file.name, size: file.size }); // Assign a unique id to each image
                            };
                        })
                    );

                    // Start reading the file
                    reader.readAsArrayBuffer(file);
                }
            }
        }

        // Update imageIdCounter for the next set of images
        setImageIdCounter(imageIdCounter + files.length);

        // Wait for all promises to resolve
        Promise.all(promises).then((imageResults) => {
            // Once all promises have resolved, set the state with the array of image data
            setImages([...images, ...imageResults]);
        });
    };


    // Function to handle removing an image by its unique id
    const handleRemoveImage = (id) => {
        const newImages = images.filter((image) => image.id !== id); // Remove the image with the specified id
        setImages(newImages); // Update the images state
    };

    const handleRemoveDataRemove = (id) => {
        // Lọc ra mảng mới không bao gồm đối tượng có id tương ứng
        const newDataInput = imageDatasInput.filter((image) => image.id !== id);
        // Cập nhật lại state với mảng mới đã được lọc
        setImageDatasInput(newDataInput);
    };


    useEffect(() => {
        // Thông báo ra ngoài thông qua hàm callback được truyền từ component cha
        datasCallback(images);
    }, [images, datasCallback]);

    useEffect(() => {
        imageDatasCallback(imageDatasInput);
    }, [imageDatasInput, imageDatasCallback])

    return (
        <div className='drop-upload-container' style={{ backgroundColor: disabled ? "#FAFAFA" : "white", opacity: disabled ? "0.5" : "1", pointerEvents: disabled ? "none" : "", }}>
            <div className="drop-upload-box-container" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                {/* Input element for file selection */}
                <input type="file" accept="image/*" onChange={handleFileSelect} multiple className="file-input" id="input-image" ref={fileInputRef} />
                {/* Placeholder label for file input */}
                <label className="upload-placeholder" htmlFor="input-image">Drop images here or click to upload</label>
            </div>
            {/* Container to preview uploaded images */}
            <div className={`image-preview-container`} disabled>
                {imageDatasInput?.map((image) => (
                    <div key={image.id} className="uploaded-image-container">
                        <img src={image.url} alt={`Uploaded ${image.id}`} className="uploaded-image" />
                        <a onClick={() => handleRemoveDataRemove(image.id)} className="remove-image-button">X</a>
                    </div>
                ))}

                {images.map((image) => (
                    <div key={image.id} className="uploaded-image-container">
                        {/* Use URL.createObjectURL to generate a URL for each Blob object */}
                        <img src={URL.createObjectURL(image.data)} alt={`Uploaded ${image.id}`} className="uploaded-image" />
                        <a onClick={() => handleRemoveImage(image.id)} className="remove-image-button">X</a>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default DropUploadImage;
