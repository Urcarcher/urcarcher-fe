import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 37.5665,
  lng: 126.9780
};

const MapComponent = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [autocompleteStart, setAutocompleteStart] = useState(null);
  const [autocompleteEnd, setAutocompleteEnd] = useState(null);

  const handleLoad = useCallback((map) => {
    const autocompleteStart = new window.google.maps.places.Autocomplete(
      document.getElementById('start'),
      { types: ['geocode'] }
    );
    const autocompleteEnd = new window.google.maps.places.Autocomplete(
      document.getElementById('end'),
      { types: ['geocode'] }
    );

    autocompleteStart.addListener('place_changed', () => {
      setOrigin(autocompleteStart.getPlace().place_id);
    });

    autocompleteEnd.addListener('place_changed', () => {
      setDestination(autocompleteEnd.getPlace().place_id);
    });

    setAutocompleteStart(autocompleteStart);
    setAutocompleteEnd(autocompleteEnd);
  }, []);

  const handleDirectionResponse = (response) => {
    if (response.status === 'OK') {
      setDirectionsResponse(response);
    } else {
      console.error('Directions request failed due to', response.status);
      console.error('Error details:', response);
    }
  };

  const handleSubmit = () => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { placeId: origin },
          destination: { placeId: destination },
          travelMode: window.google.maps.TravelMode[travelMode],
        },
        handleDirectionResponse
      );
    } else {
      console.error('Please provide both origin and destination.');
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyB-rzhcUXcmRCulCzY1S3Hphp3BrT4NLNU"  // 여기에 발급받은 API Key를 입력합니다.
      libraries={['places']}
    >
      <div>
        <div>
          <Autocomplete
            onLoad={autocomplete => setAutocompleteStart(autocomplete)}
          >
            <input
              id="start"
              type="text"
              placeholder="출발지"
              onChange={(e) => setOrigin(e.target.value)}
            />
          </Autocomplete>
          <Autocomplete
            onLoad={autocomplete => setAutocompleteEnd(autocomplete)}
          >
            <input
              id="end"
              type="text"
              placeholder="도착지"
              onChange={(e) => setDestination(e.target.value)}
            />
          </Autocomplete>
          <select onChange={(e) => setTravelMode(e.target.value)} value={travelMode}>
            <option value="DRIVING">자동차</option>
            <option value="WALKING">도보</option>
            <option value="BICYCLING">자전거</option>
            <option value="TRANSIT">대중교통</option>
            <option value="TAXI">택시</option>
          </select>
          <button onClick={handleSubmit}>길찾기</button>
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={handleLoad}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapComponent;
