// MapComponent.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import LocateCurrent from './current/LocateCurrent';
import PinLocate from './pin/PinLocate';
import { MapConfig } from './config/MapConfig';

function MapComponent({ currentLocate, }) {
    const [current, setCurrent] = useState({
        lat: 40.7128,
        lng: -74.006
    });
    const [pinEnable, setPinEnable] = useState(false)

    const [map, setMap] = useState(null); // Define map state
    const [pinPosition, setPinPosition] = useState(null); // Define marker position state

    const mapStyles = {
        width: '100%',
        height: '100%'
    };

    const getLocateCurrent = (value) => {
        setCurrent(value);
        currentLocate(value);
    };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: MapConfig.apiKey
    });

    const handleMapClick = (event) => {
        if (pinEnable) {
            setPinPosition({
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            });
            console.log({
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            });
        } else {
            setPinPosition(null);
        }

    };

    const pinEnableMethod = (value) => {
        setPinEnable(!value);
    }
    return isLoaded ? (
        <div style={{ width: '100%', height: '400px' }}>
            <GoogleMap
                zoom={14}
                mapContainerStyle={mapStyles}
                center={current}
                onClick={handleMapClick} // Attach click event handler to the map
            >
                {pinEnable && (
                    <Marker
                        position={pinPosition}
                        draggable={true}
                        onDragEnd={(event) => {
                            setPinPosition({
                                lat: event.latLng.lat(),
                                lng: event.latLng.lng()
                            });
                        }}
                    />
                )}
                <Marker
                    position={current}
                    draggable={true}
                    icon={{
                        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        scaledSize: new window.google.maps.Size(40, 40),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(20, 40)
                    }}
                />

            </GoogleMap>
            <div style={{ position: "relative" }}>
                <LocateCurrent current={getLocateCurrent} />
            </div>
            <div style={{ position: "relative" }}>
                <PinLocate pinEnable={pinEnableMethod}></PinLocate>
            </div>
        </div>
    ) : null;
}

export default MapComponent;