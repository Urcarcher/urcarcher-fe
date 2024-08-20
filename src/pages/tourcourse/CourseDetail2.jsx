import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/Modal.css';
import '../../assets/CourseDetail.css';
const CourseDetail = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null); // 현재 위치 정보 저장
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 정보 저장
  const [verificationResult, setVerificationResult] = useState(null); // 인증 결과 저장

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

  const getGeolocation = async () => {
    try {
      const response = await axios.post('/api/course/geolocation');
      const { location } = response.data;
      console.log('Geolocation API 결과:', location);

      setLatitude(location.lat);
      setLongitude(location.lng);

      return { lat: location.lat, lng: location.lng };

    } catch (error) {
      console.error('Geolocation API 요청 중 오류 발생:', error);
    }
  };
  

  const loadKakaoMapScript = () => {
    if (document.getElementById('kakao-map-script')) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_APP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    };
  };

  const initializeMap = () => {
    if (latitude && longitude) {
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error('mapContainer가 존재하지 않습니다.');
        return;
      }

      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });

      marker.setMap(map);
      console.log('카카오맵 초기화 완료');
    }
  };

  const handleButtonClick = async () => {
    const location = await getGeolocation();
    if (location) {
      setModalOpen(true);
      console.log(`현재 위치: 위도 ${location.lat}, 경도 ${location.lng}`);
    }
  };

  useEffect(() => {
    if (modalOpen && latitude && longitude) {
      setTimeout(() => {
        loadKakaoMapScript();
      }, 100);
    }
  }, [modalOpen, latitude, longitude]);

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="course-detail">
      <div className="course-items-container">
        {course.map((item) => (
          <div key={item.placeId} className="course-item">
            <h2>{item.placeName}</h2>
            <button onClick={handleButtonClick}>
              장소 인증하기
            </button>
      
          </div>
        ))}
      </div>
    
    

      {modalOpen && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>현재 위치</h2>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
