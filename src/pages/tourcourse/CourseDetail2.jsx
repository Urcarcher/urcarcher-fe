import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const mapRef = useRef(null);

  useEffect(() => {
    axios.get(`/api/course/${courseId}`)
      .then((response) => {
        console.log('Course data:', response.data);
        setCourse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching course:', error);
        setLoading(false);
      });
  }, [courseId]);

  const loadMapScript = () => {
    return new Promise((resolve) => {
      if (window.google && window.google.maps) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY_2}`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.head.appendChild(script);
      }
    });
  };

  const initMap = (lat, lng) => {
    if (window.google && window.google.maps) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15
      });

      if (window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement) {
        new window.google.maps.marker.AdvancedMarkerElement({
          position: { lat, lng },
          map: map,
          title: "You are here"
        });
      } else {
        new window.google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: "You are here"
        });
      }
    } else {
      console.error('Google Maps is not loaded.');
    }
  };

  const fetchGeolocation = async () => {
    try {
      const response = await axios.post('/api/getGeolocation');
      const { lat, lng } = response.data.location;
      setCurrentLocation({ lat, lng });
      console.log('Current location from Google API:', { lat, lng });
  
      await loadMapScript();
      initMap(lat, lng);
    } catch (error) {
      console.error('Error fetching geolocation from server:', error);
      setError('Error fetching geolocation from server.');
    }
  };
  

  const openModal = () => {
    setIsModalOpen(true);
    fetchGeolocation();  // 모달이 열리면 위치 확인 및 지도 로드
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="course-detail">
      {course.map((item) => (
        <div key={item.placeId} className="course-item">
          <button onClick={openModal}>
            {item.placeName} 버튼
          </button>
          <h2>{item.placeName}</h2>
          <p>{item.address}</p>
          <p>{item.content}</p>
          <p>
            {item.latitude}, {item.longitude}
          </p>
          <img src={item.placeImg} alt={item.placeName} />
        </div>
      ))}

      <div ref={mapRef} style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div ref={mapRef} style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
            {error && <p>{error}</p>}
          </div>
        </div>
      )}

      {currentLocation && (
        <div className="current-location">
          <h2>Your Current Location:</h2>
          <p>Latitude: {currentLocation.lat}</p>
          <p>Longitude: {currentLocation.lng}</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
