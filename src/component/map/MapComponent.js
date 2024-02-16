import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, Circle } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const MapComponent = (props) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 21.028511, lng: 105.804817 });
  const [restaurantLocations, setRestaurantLocations] = useState([]);
  const [searchAddress, setSearchAddress] = useState('');

  const haversineDistance = (coord1, coord2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
    const dLon = (coord2.lng - coord1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((coord1.lat * Math.PI) / 180) * Math.cos((coord2.lat * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  useEffect(() => {


    getCurrentLocation();

    // Example: Set restaurant locations (replace with your own data)
    setRestaurantLocations([
      { id: 1, name: 'Restaurant 1', location: { lat: 21.030, lng: 105.805 } },
      { id: 2, name: 'Restaurant 2', location: { lat: 21.025, lng: 105.810 } },
      // Add more restaurant locations as needed
    ]);



  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          watchId();
          clearWatch()
        },
        (error) => {
          console.error('Error getting current location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };


  const watchId = () => {
    return navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error watching current location:', error.message);
      }
    );
  }
  const clearWatch = () => {
    return navigator.geolocation.clearWatch(watchId);
  }

  const handleAddressChange = (address) => {
    setSearchAddress(address);
  };

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setCurrentLocation(latLng);
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
  };

  return (
    <div>
      <PlacesAutocomplete value={searchAddress} onChange={handleAddressChange} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: 'Search address...' })} />

            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => (
                <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion)}>
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <div style={{ width: '100%', height: '400px' }}>
        <Map google={props.google} zoom={12} style={{ width: '100%', height: '400px' }} center={currentLocation}>
          {/* Current Location Marker */}
          {currentLocation && (
            <Marker
              key="currentLocation"
              position={currentLocation}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                anchor: new props.google.maps.Point(32, 32),
                scaledSize: new props.google.maps.Size(64, 64),
              }}
            />
          )}

          {currentLocation && (
            <Circle
              center={currentLocation}
              radius={1000} // 1 km in meters
              options={{
                strokeColor: '#ff0000', // Red stroke color
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#ff0000', // Red fill color
                fillOpacity: 0.35,
              }}
            />
          )}

          {/* Restaurant Location Markers */}
          {restaurantLocations.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={restaurant.location}
              title={restaurant.name}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                anchor: new props.google.maps.Point(32, 32),
                scaledSize: new props.google.maps.Size(64, 64),
              }}
            />
          ))}

          {/* Example: Display distance in console */}
          {restaurantLocations.length > 0 && console.log('Distance ', restaurantLocations[0], ":", haversineDistance(currentLocation, restaurantLocations[0].location), 'km')}
          {restaurantLocations.length > 0 && console.log('Distance ', restaurantLocations[1], ":", haversineDistance(currentLocation, restaurantLocations[1].location), 'km')}
        </Map>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBQ9fSYjKHATJfJjKTALNwVs3dcH3ivxag',
})(MapComponent);
