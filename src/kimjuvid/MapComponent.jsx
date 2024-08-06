import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    const ps = new window.kakao.maps.services.Places(); 
    const directionsService = new window.kakao.maps.services.Directions();

    const searchPlaces = (start, end) => {
      ps.keywordSearch(start, (startResult) => {
        if (startResult.length > 0) {
          ps.keywordSearch(end, (endResult) => {
            if (endResult.length > 0) {
              const startCoords = new window.kakao.maps.LatLng(startResult[0].y, startResult[0].x);
              const endCoords = new window.kakao.maps.LatLng(endResult[0].y, endResult[0].x);

              directionsService.route({
                origin: startCoords,
                destination: endCoords,
                travelMode: window.kakao.maps.services.TravelMode.DRIVING
              }, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const linePath = result.routes[0].legs[0].steps.map(step => new window.kakao.maps.LatLng(step.end_location.lat, step.end_location.lng));

                  const polyline = new window.kakao.maps.Polyline({
                    path: linePath,
                    strokeWeight: 5,
                    strokeColor: '#FFAE00',
                    strokeOpacity: 0.8,
                    strokeStyle: 'solid'
                  });

                  polyline.setMap(map);
                }
              });
            }
          });
        }
      });
    };

    searchPlaces('출발지 주소', '도착지 주소');
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default MapComponent;
