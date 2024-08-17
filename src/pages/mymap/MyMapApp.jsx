import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './Map.css';
import Modal from './Modal';
import { Link, useLocation } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';

const { kakao } = window;

//테스트용 - DB에서 나의 결제 내역과 연결된 가맹점(카테고리) 정보 가져오기
const KEYWORD_LIST = [
  { id: 1, value: '음식점' },
  { id: 2, value: '편의점'},
  { id: 3, value: '카페' },
  { id: 4, value: '병원' }
];

//마커 커스텀 이미지
const myMapIcon = "https://urcarcher-local.kro.kr/icon/markericon.png";
const locationIcon = "https://urcarcher-local.kro.kr/icon/icon-location.png";

const MyMapApp = () => {  

  //카테고리 리스트 넘겨받기
  const location = useLocation();
  const { categoryList } = location.state || { categoryList: [] };

 // ID가 없는 경우 UUID 생성
//  const categoriesWithIds = categoryList.map(category => ({
//   ...category,
//   id: category.id || uuidv4() // 기존 ID가 없으면 새로 생성
// }));



  // 카카오 맵에 접근해 지도 상태 조작하는 상태 변수
  const [map, setMap] = useState(null); 
  
  // 검색에 사용될 키워드를 관리하는 상태 변수
  const [keyword, setKeyword] = useState('대형마트'); 
  
  // 검색 결과를 담는 상태 변수
  const [search, setSearch] = useState([]); 

  // 검색 결과의 페이지네이션 정보를 관리하는 상태 변수
  const [pagination, setPagination] = useState(null); 

  // 현재 페이지 번호를 관리하는 상태 변수 
  // 페이지네이션 기능과 연동해 어떤 페이지를 보고 있는지 나타냄
  const [currentPage, setCurrentPage] = useState(1); 
  
  // 현재 열려있는 마커의 ID를 관리하는 상태 변수
  const [openMarkerId, setOpenMarkerId] = useState(null);
  
  // 사이드바의 열림/닫힘 상태를 관리하는 상태 변수
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  
  // 모바일 환경에서 사용될 모달의 열림/닫힘 상태를 관리하는 상태 변수
  const [isModalOpen, setIsModalOpen] = useState(false); 

  //모달창 열기/닫기
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  //기본 위치 상태
  const [state, setState] = useState({
    center: { 
      lat: 37.5594538,   //학원 위치
      lng: 126.9226294 ,
    },
    errMsg: null,
    isLoading: true,
  });

  //현재 사용자 위치 state에 저장하는 함수
  //현재 위치 오류로 비동기에서 동기적 방식으로 수정 (async/await사용)
  // const getCurrentLocation = async () => {
  //     if (navigator.geolocation) {
  //       try { //오류 처리
  //         const position = await new Promise((resolve, reject) => { //위치 가져오기
  //           navigator.geolocation.getCurrentPosition(resolve, reject);
  //         });
           
  //         //현재 위치 정보 출력
  //         console.log('현재 위치:', position.coords.latitude, position.coords.longitude);

  
  //         setState((prev) => ({
  //           ...prev,
  //           center: {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           },
  //           isLoading: false,
  //         }));
  //       } catch (err) {
  //         setState((prev) => ({
  //           ...prev,
  //           errMsg: err.message,
  //           isLoading: false,
  //         }));
  //       }
  //     } else {
  //       setState((prev) => ({
  //         ...prev,
  //         errMsg: 'geolocation을 사용할 수 없어요.',
  //         isLoading: false,
  //       }));
  //     }
  //   };
  //   //처음 로딩 시 현재 위치 호출
  //   useEffect(() => {
  //     getCurrentLocation();
  //   }, []);
  //   //지도가 있는 창이 열릴 때 저장된 위도경도 값으로 지도 그리기
  //   useEffect(()=>{

  //   },[])

   // 로컬 스토리지에서 위치를 가져오는 함수
   const loadSavedLocation = () => {
    const savedLat = localStorage.getItem('savedLat');
    const savedLng = localStorage.getItem('savedLng');

    if (savedLat && savedLng) {
      return {
        lat: parseFloat(savedLat),
        lng: parseFloat(savedLng),
      };
    }

    return null;
  };

  // 현재 위치를 받아와 상태를 업데이트하고 로컬 스토리지에 저장하는 함수
  const updateCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        });

        console.log('현재 위치:', position.coords.latitude, position.coords.longitude);

        const newCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // 상태 업데이트
        setState({
          center: newCenter,
          errMsg: null,
          isLoading: false,
        });

        // 로컬 스토리지에 위치 저장
        localStorage.setItem('savedLat', newCenter.lat);
        localStorage.setItem('savedLng', newCenter.lng);

      } catch (err) {
        console.error('위치 정보를 가져오는 데 실패했습니다.', err);
        setState((prev) => ({
          ...prev,
          errMsg: err.message,
          isLoading: false,
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할 수 없어요.',
        isLoading: false,
      }));
    }
  };

  // 컴포넌트가 처음 렌더링될 때 저장된 위치로 지도 초기화
  useEffect(() => {
    const savedLocation = loadSavedLocation();

    if (savedLocation) {
      setState((prev) => ({
        ...prev,
        center: savedLocation,
        isLoading: false,
      }));
    } else {
      // 저장된 위치가 없을 경우 기본 위치 사용
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);


  //-----------------------------------------------------주변위치 카테고리로 조회

  // 카테고리 검색으로 주변 위치 검색하기
  const searchPlaces = (keyword) => {
    console.log(keyword); //편의점,음식점 .. 등 카테고리명을 받아옴
    // Places 서비스 객체 생성
    const ps = new kakao.maps.services.Places();
    // 검색 옵션 설정
    const options = {
      location: new kakao.maps.LatLng(state.center.lat, state.center.lng), 
      radius: 5000, 
      sort: kakao.maps.services.SortBy.DISTANCE,
      //page, // 현재 페이지 번호 추가
      page: currentPage,
    };
  
    // Places 서비스의 keywordSearch 메소드 호출
    ps.keywordSearch(
      keyword,
      (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log(data);
          displayPlaces(data); // 검색된 장소를 지도에 표시하는 함수 호출 
          setPagination(pagination); // 페이지네이션 정보 업데이트 
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setIsSidebarOpen(true); // 사이드바 열기
          setSearch(data);
        } else if (status === kakao.maps.services.Status.ERROR) {
          console.error('검색에 실패하였습니다.');
        }
      },
      options,
    );
  };

  //검색된 장소 표시
  const displayPlaces = (data) => {
    //map이 null일 때
    if (!map) return;

    const bounds = new kakao.maps.LatLngBounds();
    data.forEach((item) => bounds.extend(new kakao.maps.LatLng(item.y, item.x)));
    bounds.extend(new kakao.maps.LatLng(state.center.lat, state.center.lng));
    map.setBounds(bounds); //!!map null 오류(map이 null 상태일 때 displayPlaces 함수가 호출중)
    setSearch(data);
  };

 //id로 정렬한 후 상위 3개의 요소만 가져와서 버튼 생성하기
 const topKeywords = KEYWORD_LIST.sort((a, b) => a.id - b.id).slice(0, 3);


 //-------------
 // 마커의 위치로 지도의 중심 좌표 이동하기
  const moveLatLng = (data) => {
    const newLatLng = new kakao.maps.LatLng(data.y, data.x); 
    map.panTo(newLatLng); //마커의 위치 좌표 표시
  };

  // 클릭한 마커로 중심 좌표 이동 및 검색 수행 함수
  useEffect(() => {
    if (!map) return;
    setOpenMarkerId(null);
    searchPlaces(currentPage);
  }, [map, keyword, currentPage]);

  // 마커 클릭 시 CustomOverlayMap를 열고 닫는 함수
  useEffect(() => {
    if (!map) return;
    const clickListener = (e) => {
      
      setOpenMarkerId(null);
    };
    kakao.maps.event.addListener(map, 'click', clickListener);
    
    return () => {
      kakao.maps.event.removeListener(map, 'click', clickListener);
    };
  }, [map]);
  
  
  const [activeButtonId, setActiveButtonId] = useState(1); // 처음에 첫 번째 버튼을 활성화 상태로 설정
  
  const handleButtonClick = (id, value) => {
    setActiveButtonId(id); // 클릭한 버튼의 id를 활성화 상태로 설정
    searchPlaces(value);   // 버튼 클릭 시 장소 검색
  };

  return (
    <>
      <Header/>
      <div className='kakaomap-wrap contents'>
        {/* <img src={myMapIcon} alt="아이콘"></img> */}
     
        {/* 상위 3개 카테고리 버튼 */}
        <div className='cate-btn-wrap'>
          {topKeywords.map((keywordObj) => (
            <button 
              key={keywordObj.id} 
              type='button' 
              // className={keywordObj.id === 1 ? 'active' : ''} 
              className={keywordObj.id === activeButtonId ? 'active' : ''} 
              // onClick={() => searchPlaces(keywordObj.value)}
              onClick={() => handleButtonClick(keywordObj.id, keywordObj.value)}
              >
              {keywordObj.value}
            </button>
          ))}
        </div>
       
        {/* 지도 컴포넌트 */}
        <Map 
          center={state.center} 
          style={{ width: '430px', height: '750px'}} 
          level={3}
          onCreate={setMap}  // 지도 객체가 생성될 때 setMap 호출, 지도 객체 업데이트
        >
          {/* 현재 위치 마커 표시 */}
          <MapMarker
            position={state.center}
            image={{
              src: myMapIcon,
              size: {
                width: 50,
                height: 50,
              },
            }}
          >
          </MapMarker>

           {/* 검색된 장소 마커 표시 */}
           {search.map((data) => (
            <React.Fragment key={data.id}>
              <MapMarker
                key={data.id}
                position={{ lat: data.y, lng: data.x }}
                image={{
                  src: locationIcon,
                  size: {
                    width: 35,
                    height: 35,
                  },
                }}
                onClick={() => {
                  if (data.id === openMarkerId) {
                    setOpenMarkerId(null);
                  } else {
                    setOpenMarkerId(data.id);
                    moveLatLng(data);
                    setIsModalOpen(true); // 마커 클릭 시 모달 열기
                  }
                }}
              />
              {/* 해당 마커에 커스텀 오버레이 표시 */}
             
            </React.Fragment>
          ))}
          {/* 모달 표시 */}
          {isModalOpen && (
            <Modal
              search={search}
              openMarkerId={openMarkerId}
              setOpenMarkerId={setOpenMarkerId}
              isModalOpen={isModalOpen}
              moveLatLng={moveLatLng}
              pagination={pagination}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              closeModal = {closeModal}
            />
          )} 
          <div className='storeRank-link'>
              <Link to="/maphome/beststorelist">
                <img src="/icon/icon-list.png" alt="아이콘" />
              </Link>
          </div>
          <div className='current-location-btn'>
            <button onClick={updateCurrentLocation}>
              <img src='/icon/icon-my-location.png'></img>
            </button>
          </div>
        </Map>
        <Footer />
      </div>
    </>
  );
};

export default MyMapApp;