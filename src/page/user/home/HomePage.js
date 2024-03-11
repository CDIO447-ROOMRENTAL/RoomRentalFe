// HomePage.js
import React, { useState } from 'react';
import './HomePage.css';
import Logo from '../../../assets/logo/Logo';
import MapComponent from '../../../component/map/MapComponent';
import ImageSlide from '../../../component/image/slide/ImageSlide';
import About from '../../../component/about/About';

function HomePage() {
  // const [currentLocation, setCurrentLocation] = useState(null);

  // const getCurrentLocate = (location) => {
  //   setCurrentLocation(location);
  //   console.log(location);
  // }

  return (
    <div className='homepage-container'>
      <div className='images-container'>
        <ImageSlide images={images}></ImageSlide>
      </div>
      <div>
        <About></About>
      </div>
    </div>
  );
}


export default HomePage;
const images = [
  { 
    url: "https://cdn.tgdd.vn/Files/2021/06/12/1359712/huong-dan-chi-tiet-thu-tuc-mua-nha-o-xa-hoi-moi-nhat-2021-202106121612115411.jpg" 
  },
  {
    url: "https://entercons.vn/upload/images/nh%C3%A0%20t%C3%A1ch%20bi%E1%BB%87t%20d%C3%A0nh%20cho%201%20gia%20%C4%91%C3%ACnh.jpg",
  }
]