import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const LocationForm = () => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [travelMode, setTravelMode] = useState('DRIVING'); // Default travel mode is DRIVING
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null);

  useEffect(() => {
    const kakaoMapsApiKey = process.env.REACT_APP_KAKAO_API_KEY;

    if (!kakaoMapsApiKey) {
      console.error("Kakao Map API key is missing");
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapsApiKey}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 7,
        });
        setMap(map);
      });
    };

    script.onerror = () => {
      console.error("Failed to load Kakao Map script");
    };

    return () => {
      script.remove();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const departureCoords = await getCoordinates(departure);
      const destinationCoords = await getCoordinates(destination);

      if (departureCoords && destinationCoords) {
        const routePath = await getRoutePath(departureCoords, destinationCoords, travelMode);
        if (routePath) {
          displayRoute(routePath);
        } else {
          console.error("Failed to get route path.");
        }
      } else {
        console.error("Failed to get coordinates for the input locations.");
      }
    } catch (error) {
      console.error("Error fetching route", error);
    }
  };

  const getCoordinates = async (address) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.addressSearch(address, (result, status) => {
        console.log("Address search result:", result, "Status:", status);
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          resolve(coords);
        } else {
          reject(new Error("Failed to get coordinates"));
        }
      });
    });
  };

  const getRoutePath = async (startCoords, endCoords, travelMode) => {
    if (travelMode === 'DRIVING') {
      return getDrivingRoute(startCoords, endCoords);
    } else if (travelMode === 'WALKING') {
      return getWalkingRoute(startCoords, endCoords);
    }
  };

  const getDrivingRoute = async (startCoords, endCoords) => {
    const kakaoNavigationApiKey = process.env.REACT_APP_KAKAO_NAVIGATION_API_KEY;
    const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${startCoords.getLng()},${startCoords.getLat()}&destination=${endCoords.getLng()},${endCoords.getLat()}&priority=FASTEST`;

    console.log("Request URL:", url);
    console.log("API Key:", kakaoNavigationApiKey);

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${kakaoNavigationApiKey}`
        }
      });

      if (response.status === 200 && response.data.routes.length > 0) {
        const route = response.data.routes[0];
        const path = route.sections[0].roads.flatMap(road => road.vertexes.map((vertex, index) => {
          return index % 2 === 0 ? new window.kakao.maps.LatLng(vertex[1], vertex[0]) : null;
        }).filter(point => point !== null));
        return path;
      }
      return null;
    } catch (error) {
      console.error("Error fetching driving route from Kakao Navi API", error);
      return null;
    }
  };

  const getWalkingRoute = async (startCoords, endCoords) => {
    const kakaoMapsApiKey = process.env.REACT_APP_KAKAO_API_KEY;
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?origin=${startCoords.getLng()},${startCoords.getLat()}&destination=${endCoords.getLng()},${endCoords.getLat()}&priority=WALKING`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${kakaoMapsApiKey}`
        }
      });
      const route = response.data.routes[0];

      if (route) {
        const path = [];
        route.sections[0].roads.forEach(road => {
          road.vertexes.forEach((vertex, index) => {
            if (index % 2 === 0) {
              path.push(new window.kakao.maps.LatLng(vertex[1], vertex[0]));
            }
          });
        });
        return path;
      }
    } catch (error) {
      console.error("Error fetching walking route from Kakao Maps API", error);
    }
    return null;
  };

  const displayRoute = (path) => {
    if (polyline) {
      polyline.setMap(null);
    }

    const newPolyline = new window.kakao.maps.Polyline({
      path: path,
      strokeWeight: 5,
      strokeColor: '#FF0000',
      strokeOpacity: 0.7,
      strokeStyle: 'solid',
    });

    newPolyline.setMap(map);
    setPolyline(newPolyline);

    const bounds = new window.kakao.maps.LatLngBounds();
    path.forEach(point => bounds.extend(point));
    map.setBounds(bounds);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          placeholder="출발지"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="도착지"
        />
        <select value={travelMode} onChange={(e) => setTravelMode(e.target.value)}>
          <option value="DRIVING">차량</option>
          <option value="WALKING">도보</option>
        </select>
        <button type="submit">경로 찾기</button>
      </form>
      <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default LocationForm;
