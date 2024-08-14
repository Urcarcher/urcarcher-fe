import React, { useState } from 'react';
// kakao- 길찾기 기능은 API제공을 안해주고 있고 URL Scheme으로 제공해줌
// kakao(URL Scheme 방식)
const MapComponent_K = () => {
  const [origin, setOrigin] = useState('37.556018,126.972631'); // 서울역
  const [destination, setDestination] = useState('35.158698,129.160384'); // 해운대 해수욕장
  const [travelMode, setTravelMode] = useState('CAR');

  const handleRoute = () => {
    const url = `kakaomap://route?sp=${origin}&ep=${destination}&by=${travelMode}`;
    const webUrl = `https://map.kakao.com/?sName=${origin}&eName=${destination}&by=${travelMode}`;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = url;
    } else {
      window.open(webUrl, '_blank');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="출발지 좌표"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px', width: '400px' }}
      />
      <input
        type="text"
        placeholder="도착지 좌표"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px', width: '400px' }}
      />
      <select
        onChange={(e) => setTravelMode(e.target.value)}
        value={travelMode}
        style={{ marginBottom: '10px', padding: '10px', width: '400px' }}
      >
        <option value="CAR">자동차</option>
        <option value="TRANSIT">대중교통</option>
      </select>
      <button
        onClick={handleRoute}
        style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        길찾기
      </button>
    </div>
  );
};

export default MapComponent_K;
