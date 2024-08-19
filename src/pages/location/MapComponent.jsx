import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';

const containerStyle = {
  width: '430px',
  height: '500px'
};

const center = {
  lat: 37.5665,
  lng: 126.9780
};

const MapComponent = (props) => {
  const { detailDestination } = useParams();
  
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState(detailDestination || '');
  const [selectedRoute, setSelectedRoute] = useState(null);

  const travelMode = 'TRANSIT';

  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new window.google.maps.Geocoder();
          const latLng = new window.google.maps.LatLng(latitude, longitude);

          geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === 'OK') {
              setOrigin(results[0].formatted_address);
              resolve(results[0].formatted_address);
            } else {
              console.error('Geocoder failed due to: ' + status);
              reject(status);
            }
          });
        }, (error) => {
          console.error('Error Code = ' + error.code + ' - ' + error.message);
          reject(error);
        }, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      } else {
        reject("Geolocation not supported");
      }
    });
  };

  // 마운트된 이후에 useEffect코드가 실행되지만 이것도 비동기 방식으로 실행되기때문에 해당 에러가 발생하는 듯 
  // useEffect(() => {
    
  //   getCurrentLocation();
  // }, []);

  // 수정 test
  const onLoadScriptHandler  = async() => {
    await getCurrentLocation();
    handleLoad();
  }

  const handleLoad = useCallback(() => {
    const autocompleteStart = new window.google.maps.places.Autocomplete(
      document.getElementById('start'),
      { types: ['geocode'] }
    );
    const autocompleteEnd = new window.google.maps.places.Autocomplete(
      document.getElementById('end'),
      { types: ['geocode'] }
    );

    autocompleteStart.addListener('place_changed', () => {
      const place = autocompleteStart.getPlace();
      if (place && place.geometry) {
        setOrigin(place.formatted_address);
      }
    });

    autocompleteEnd.addListener('place_changed', () => {
      const place = autocompleteEnd.getPlace();
      if (place && place.geometry) {
        setDestination(place.formatted_address);
      }
    });
  }, []);

  const getCoordinates = (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  };

  const handleDirectionResponse = (response) => {
    if (response.status === 'OK') {
      const uniqueRoutes = response.routes.filter((route, index, self) =>
        index === self.findIndex((r) => (
          r.summary === route.summary && r.legs[0].distance.text === route.legs[0].distance.text
        ))
      );
      const limitedRoutes = uniqueRoutes.slice(0, 3);
      setDirectionsResponse(response);
      setRoutes(limitedRoutes);

    } else {
      console.error('Directions request failed due to', response.status);
      console.error('Error details:', response);
    }
  };

  const handleSubmit = async () => {
    try {
      if (origin && destination) {
        const originCoordinates = await getCoordinates(origin);
        const destinationCoordinates = await getCoordinates(destination);

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: originCoordinates,
            destination: destinationCoordinates,
            travelMode: window.google.maps.TravelMode[travelMode],
            provideRouteAlternatives: true,
          },
          (response) => {
            handleDirectionResponse(response)
           // 첫 번째 경로를 자동으로 선택
           if (response.routes && response.routes.length > 0) {
            setSelectedRoute(response.routes[0]);
          }
          }
        );
      } else {
        console.error('Please provide both origin and destination.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyB-rzhcUXcmRCulCzY1S3Hphp3BrT4NLNU" libraries={['places']}  onLoad={onLoadScriptHandler}>
      <div>
        <div>
          <Autocomplete>
            <input
              id="start"
              type="text"
              placeholder="출발지"
              value={origin || ''}
              onChange={(e) => setOrigin(e.target.value)}
              style={{ marginBottom: '10px', padding: '10px', width: '400px' }}
            />
          </Autocomplete>
          <Autocomplete>
            <input
              id="end"
              type="text"
              placeholder="도착지"
              value={destination || ''}
              onChange={(e) => setDestination(e.target.value)}
              style={{ marginBottom: '10px', padding: '10px', width: '400px' }}
            />
          </Autocomplete>

          <button
            onClick={async () => {
              await getCurrentLocation();   // 현재 위치 설정될때 까지 대기
            }}
            style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            현재 위치로 출발지 설정
          </button>

          <button
            onClick={handleSubmit}
            style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            길찾기
          </button>
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={handleLoad}
        >
          {selectedRoute && <DirectionsRenderer directions={{ ...directionsResponse, routes: [selectedRoute] }} />}
        </GoogleMap>
        <div style={{ marginTop: '20px' }}>
          {routes.map((route, index) => (
            <div key={index} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ marginBottom: '10px' }}>경로 {index + 1}</h3>
              <button onClick={() => setSelectedRoute(route)}>
                이 경로 보기
              </button>
              {route.legs.map((leg, legIndex) => (
                <div key={legIndex}>
                  <p><strong>출발지:</strong> {leg.start_address}</p>
                  <p><strong>도착지:</strong> {leg.end_address}</p>
                  <p><strong>거리:</strong> {leg.distance.text}</p>
                  <p><strong>소요 시간:</strong> {leg.duration.text}</p>
                  {leg.steps.map((step, stepIndex) => (
                    <div key={stepIndex} style={{ marginBottom: '10px', paddingLeft: '10px', borderLeft: '2px solid #4CAF50' }}>
                      <p dangerouslySetInnerHTML={{ __html: step.instructions }} style={{ margin: '5px 0' }}></p>
                      <p style={{ margin: '5px 0' }}><strong>거리:</strong> {step.distance.text}</p>
                      <p style={{ margin: '5px 0' }}><strong>소요 시간:</strong> {step.duration.text}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </LoadScript>
  );
};

export default MapComponent;
