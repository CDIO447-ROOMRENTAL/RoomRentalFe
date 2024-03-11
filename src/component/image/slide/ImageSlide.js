import React, { useState, useEffect } from 'react';
import "./ImageSlide.css"

function ImageSlide({ images, limit = 5 }) {
    const [indexImages, setIndexImages] = useState(0);
    const [imagesData, setImagesData] = useState([]);

    useEffect(() => {
        setImagesData(images?.map((value, index) => ({ id: index, url: value?.url })));
    }, [images]);

    console.log(images);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndexImages(prevIndex => {
                if (prevIndex < imagesData?.length - 1) {
                    return prevIndex + 1;
                } else {
                    return 0;
                }
            });
        }, 4000);
        return () => clearInterval(interval);
    }, [imagesData]);

    const handleClickImage = () => {
        setIndexImages(prevIndex => {
            if (prevIndex === 0) {
                return imagesData?.length - 1;
            } else {
                return prevIndex - 1;
            }
        });
    };

    // Tính toán startPreviewIndex và endPreviewIndex dựa trên số lượng ảnh và vị trí của ảnh hiện tại
    let startPreviewIndex, endPreviewIndex;
    if (imagesData?.length <= limit) {
        // Nếu số lượng ảnh nhỏ hơn hoặc bằng giới hạn hiển thị, hiển thị tất cả ảnh
        startPreviewIndex = 0;
        endPreviewIndex = imagesData.length - 1;
    } else {
        // Nếu số lượng ảnh lớn hơn giới hạn hiển thị, di chuyển index một cách linh hoạt
        startPreviewIndex = indexImages - Math.floor(limit / 2);
        if (startPreviewIndex < 0) {
            startPreviewIndex = 0;
        }
        endPreviewIndex = startPreviewIndex + limit - 1;
        if (endPreviewIndex >= imagesData?.length) {
            endPreviewIndex = imagesData?.length - 1;
            startPreviewIndex = endPreviewIndex - limit + 1;
        }
    }

    return (
        <div className="images-slide-container">
            <div>
                {imagesData?.length > 0 && (
                    <img className='image-slide' src={imagesData[indexImages]?.url} width={"100%"} height={"100%"} alt="slide" />
                )}
                <div className='images-slide-preview'>
                    {imagesData?.slice(startPreviewIndex, endPreviewIndex + 1)?.map((image, index) => (
                        <img key={index} className={`preview ${startPreviewIndex + index === indexImages ? 'active' : 'noactive'}`} src={image.url} onClick={handleClickImage} alt="preview" />
                    ))}
                </div>
            </div>
        </div>
    );

}

export default ImageSlide;
