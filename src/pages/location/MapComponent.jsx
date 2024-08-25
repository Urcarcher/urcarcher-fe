import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import LocationIcon from '../../assets/nowlocation.png'; // 이미지 경로 가져오기


const MapComponent = (props) => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY_1;
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

  const onLoadScriptHandler  = async () => {
    await getCurrentLocation();
    handleLoad();
  };

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
    <Container>
      <br/>
      <br/>
      <br/>
      <br/>
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']} onLoad={onLoadScriptHandler}>
        <div>
          <InputContainer>
            <Autocomplete>
              <Input
                id="start"
                type="text"
                placeholder="출발지"
                value={origin || ''}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </Autocomplete>
            <LocationButton onClick={async () => { await getCurrentLocation(); }}>
              <LocationImage src={LocationIcon} alt="현재 위치 설정" />
            </LocationButton>
          </InputContainer>
          <InputContainer>
            <Autocomplete>
              <Input
                id="end"
                type="text"
                placeholder="도착지"
                value={destination || ''}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Autocomplete>
          </InputContainer>
          <StyledButton onClick={handleSubmit}>
            길찾기
          </StyledButton>
        </div>
        <div  className="scrollable-content" style={{ maxHeight: '600px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
          <MapContainer>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
              onLoad={handleLoad}
            >
              {selectedRoute && <DirectionsRenderer directions={{ ...directionsResponse, routes: [selectedRoute] }} />}
            </GoogleMap>
          </MapContainer>
          <div style={{ marginTop: '20px' }}>
            {routes.map((route, index) => (
              <RouteCard key={index}>
                <h3 style={{ marginBottom: '10px' }}>경로 {index + 1}</h3>
                <Button
                  style={{ marginBottom: "12px" }}
                  onClick={() => setSelectedRoute(route)}
                >
                  이 경로 보기
                </Button>
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
              </RouteCard>
            ))}
          </div>
        </div>
      </LoadScript>
    </Container>
  );
};
const Container = styled.div`
  max-height: 800px;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
`;

const MapContainer = styled.div`
  margin-top: 20px;
  padding: 0;
  margin: 0;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  width:350px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 5px; /* 이미지를 오른쪽에 위치시키기 위해 여백 추가 */
  margin-left: 25px;
`;

const StyledButton = styled.button`
  padding: 10px 30px;
  background-color: #476EFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 10px auto;
  width: 50%;

  &:hover {
    opacity: 0.9;
  }
`;

const RouteCard = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const LocationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 5px;
`;

const LocationImage = styled.img`
  width: 24px; /* 이미지 크기 조절 */
  height: 24px;
`;

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 37.5665,
  lng: 126.9780
};
export default MapComponent;
