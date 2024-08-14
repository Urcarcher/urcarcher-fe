// import { useParams } from 'react-router-dom';
// import { useEffect, useState, useRef } from 'react';
// import axios from 'axios';

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [error, setError] = useState(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     axios.get(`/api/course/${courseId}`)
//       .then((response) => {
//         console.log('Course data:', response.data);
//         setCourse(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching course:', error);
//         setLoading(false);
//       });
//   }, [courseId]);

//   const loadMapScript = () => {
//     return new Promise((resolve) => {
//       if (window.google && window.google.maps) {
//         resolve();
//       } else {
//         const script = document.createElement('script');
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
//         script.async = true;
//         script.defer = true;
//         script.onload = resolve;
//         document.head.appendChild(script);
//       }
//     });
//   };

//   const initMap = (lat, lng) => {
//     if (window.google && window.google.maps) {
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: { lat, lng },
//         zoom: 15
//       });

//       // 마커 생성 방법 변경
//       new window.google.maps.marker.AdvancedMarkerElement({
//         position: { lat, lng },
//         map: map,
//         title: "You are here"
//       });
//     }
//   };

//   const fetchGeolocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentLocation({ lat: latitude, lng: longitude });
//           console.log('Current location:', { lat: latitude, lng: longitude });

//           await loadMapScript();
//           initMap(latitude, longitude);
//         },
//         (error) => {
//           switch(error.code) {
//             case error.PERMISSION_DENIED:
//               setError("사용자가 위치 정보 제공을 거부했습니다.");
//               break;
//             case error.POSITION_UNAVAILABLE:
//               setError("위치 정보를 사용할 수 없습니다.");
//               break;
//             case error.TIMEOUT:
//               setError("위치 정보를 가져오는 데 시간이 초과되었습니다.");
//               break;
//             case error.UNKNOWN_ERROR:
//               setError("알 수 없는 오류가 발생했습니다.");
//               break;
//             default:
//               setError("위치 정보를 가져오는 중 오류가 발생했습니다.");
//           }
//           console.error('Error getting geolocation:', error);
//         },
//         { enableHighAccuracy: true }
//       );
//     } else {
//       setError('이 브라우저는 Geolocation을 지원하지 않습니다.');
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!course.length) {
//     return <div>No course details found.</div>;
//   }

//   return (
//     <div className="course-detail">
//       {course.map((item) => (
//         <div key={item.placeId} className="course-item">
//           <button onClick={fetchGeolocation}>
//             {item.placeName} 버튼
//           </button>
//           <h2>{item.placeName}</h2>
//           <p>{item.address}</p>
//           <p>{item.content}</p>
//           <p>
//             {item.latitude}, {item.longitude}
//           </p>
//           <img src={item.placeImg} alt={item.placeName} />
//         </div>
//       ))}

//       <div ref={mapRef} style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>

//       {currentLocation && (
//         <div className="current-location">
//           <h2>Your Current Location:</h2>
//           <p>Latitude: {currentLocation.lat}</p>
//           <p>Longitude: {currentLocation.lng}</p>
//         </div>
//       )}

//       {error && (
//         <div className="error-message">
//           <p>{error}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseDetail;
