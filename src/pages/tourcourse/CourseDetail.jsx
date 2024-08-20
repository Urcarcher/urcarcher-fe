import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/Modal.css';
import '../../assets/CourseDetail.css';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    axios.get(`/api/course/${courseId}`)
      .then((response) => {
        const courseData = response.data.map(item => ({
          ...item,
          latitude: item.latitude.toFixed(3),
          longitude: item.longitude.toFixed(3),
        }));
        console.log('Course data:', courseData);
        setCourse(courseData);
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

  const handleButtonClick = async (targetLocation) => {
    const location = await getGeolocation();
    if (location) {
      console.log(`현재 위치: 위도 ${location.lat}, 경도 ${location.lng}`);
      console.log(`목표 위치: 위도 ${targetLocation.latitude}, 경도 ${targetLocation.longitude}`);
      compareLocation(location.lat, location.lng, targetLocation.latitude, targetLocation.longitude);
    }
  };

  useEffect(() => {
    if (mapModalOpen && latitude && longitude) {
      setTimeout(() => {
        loadKakaoMapScript();
      }, 100);
    }
  }, [mapModalOpen, latitude, longitude]);

  const closeMapModal = () => {
    setMapModalOpen(false);
  };

  const closeVerificationModal = () => {
    setVerificationModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const toRadians = (degree) => {
    return degree * (Math.PI / 180);
  }

  const compareLocation = (currentLat, currentLng, targetLat, targetLng) => {
    const R = 6371e3; // 지구의 반지름 (미터 단위)
    
    const currentLatRad = toRadians(currentLat);
    const targetLatRad = toRadians(targetLat);
    
    const deltaLat = toRadians(targetLat - currentLat);
    const deltaLng = toRadians(targetLng - currentLng);
    
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(currentLatRad) * Math.cos(targetLatRad) *
              Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    const distance = R * c; // 두 좌표 간의 거리 (미터 단위)

    console.log(`목표 위치: 위도 ${targetLat}, 경도 ${targetLng}`);
    console.log(`계산된 거리: ${distance} meters`);

    if (distance <= 500) {  // 500m 반경 내에 있는지 확인
        console.log('인증 완료되었습니다.');
        setModalMessage('인증 완료되었습니다.');
    } else {
        console.log('인증 실패했습니다.');
        setModalMessage('인증에 실패했습니다.\n다시 시도해주십시오.');



    }

    // 지도 모달 먼저 열고, 그 위에 인증 결과 모달을 오픈
    setMapModalOpen(true);
    setTimeout(() => {
      setVerificationModalOpen(true);
    }, 200);
  };

  return (
    <div className="course-detail">
      <div className="course-items-container">
        {course.map((item) => (
          <div key={item.placeId} className="course-item">
            <h2>{item.placeName}</h2>
            <button onClick={() => handleButtonClick(item)}>
              장소 인증하기
            </button>
          </div>
        ))}
      </div>

      {mapModalOpen && (
        <div className="modal map-modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <span className="close" onClick={closeMapModal}>&times;</span>
            <h2>현재 위치</h2>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
          </div>
        </div>
      )}

      {verificationModalOpen && (
        <div className="modal verification-modal" style={{ display: 'flex', zIndex: 1100 }}>
          <div className="modal-content">
            <span className="close" onClick={closeVerificationModal}>&times;</span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
