import { MapConfig } from "../config/MapConfig";

export const convertAddressToLatLng = (address) => {
    const apiKey = MapConfig.apiKey;
    return new Promise((resolve, reject) => {
        if (!apiKey) {
            reject("API Key is missing.");
            return;
        }

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address, key: apiKey }, (results, status) => {
            if (status === 'OK') {
                if (results && results.length > 0) {
                    const { lat, lng } = results[0].geometry.location;
                    resolve({ lat, lng });
                } else {
                    reject("No results found for the address.");
                }
            } else {
                console.error('Geocode was not successful for the following reason:', status);
                reject("Geocode was not successful. Status: " + status);
            }
        });
    });
};
