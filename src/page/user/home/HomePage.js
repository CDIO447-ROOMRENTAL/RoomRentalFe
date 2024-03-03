// HomePage.js
import React, { useState } from 'react';
import './HomePage.css';
import Logo from '../../../assets/logo/Logo';
import MapComponent from '../../../component/map/MapComponent';

function HomePage() {
  const [currentLocation, setCurrentLocation] = useState(null);

  const getCurrentLocate = (location) => {
    setCurrentLocation(location);
    console.log(location);
  }

  return (
    <div>
      <MapComponent currentLocate={getCurrentLocate} />
    </div>
  );
}


export default HomePage;
