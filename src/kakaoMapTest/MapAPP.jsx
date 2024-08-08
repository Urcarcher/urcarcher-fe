import React, { useEffect } from 'react';


const {kakao} = window;

// const KEYWORD_LIST = [
//   { id: 1, value: '대형마트' },
//   { id: 2, value: '편의점' },
//   { id: 3, value: '음식점'},
// ];

function MapAPP(props) {
   console.log("MapAPP");
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=9f4cba9e7f3337a7802b85d934f4d6bd&autoload=false`;
        document.head.appendChild(script);
        
    
        script.onload = () => {

         kakao.maps.load(() => {
            const container = document.getElementById("mapContainer"); //지도를 담을 영역의 DOM
            const options = {//지도 생성시 필요한 기본 옵션
              center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
              level: 3,//지도의 레벨(확대, 축소 정도)
            };
            const map = new kakao.maps.Map(container, options); //지도 생성, 객체 리턴
            
            
            // HTML5의 geolocation으로 사용할 수 있는지 확인
            if (navigator.geolocation) {
                //GeoLocation을 이용해서 접속 위치를 얻기
                navigator.geolocation.getCurrentPosition(
                (position) => {
                  const lat = position.coords.latitude; //위도
                  const lng = position.coords.longitude; //경도
                  const currentPosition = new kakao.maps.LatLng(lat, lng);// 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성
      
                  // 현재 위치에 마커 추가
                  const marker = new kakao.maps.Marker({
                    position: currentPosition,
                  });
                  marker.setMap(map);
      
                  // 지도 중심을 현재 위치로 이동
                  map.setCenter(currentPosition);
      
                  // 마커 클릭 시 텍스트 추가
                  const infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="padding:5px;">현재 위치</div>',
                  });
                  kakao.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                  });
                });
              } else {
                    alert("geolocation을 사용할수 없어요");
              }

            });// kakao.maps.load 
          }; // script.onload
        }, []);// useEffect
    
      return(
        <div className='container'>
            <div id="mapContainer" className='mapContainer' style={{ width: "440px", height: "100vh" }}></div>
        </div>
      );
};

export default MapAPP;