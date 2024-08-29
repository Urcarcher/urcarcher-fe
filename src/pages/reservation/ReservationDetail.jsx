import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardOverlay from '../../bootstrap-template/components/cards/CardOverlay';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import leftArrow from "assets/left-arrow.png";
import rightArrow from "assets/right-arrow.png";
import logo from "assets/logo.png";

function ReservationDetail() {
  const { id } = useParams(); // mt20id를 URL 파라미터로 받음
  const [detailData, setDetailData] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 이미지 인덱스 상태 추가
  const [seatingData, setSeatingData] = useState([]); // 좌석 데이터 상태 추가
  const navigate = useNavigate();
    

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await axios.get('/api/reservation/reservation-detail', {
          params: {
            mt20id: id,
            newsql: 'Y',
          }
        });
        
        console.log(response.data); // 응답 데이터 확인용 콘솔 로그
        setDetailData(response.data);

        // item.db의 pcseguidance 데이터를 파싱하여 seatingData로 설정
        const item = response.data?.db;
        if (item) {
          setSeatingData(parseSeatingData(item.pcseguidance || ""));
        }

      } catch (err) {
        setError(err.message);
      }
    };

    fetchDetailData();
  }, [id]);

  // 좌석 데이터 파싱 함수
  const parseSeatingData = (data) => {
    if (!data) return []; // null 또는 undefined일 경우 빈 배열 반환
    
    const cleanedData = data.replace(/\s/g, '').replace(/,/g, '');
    
    return cleanedData.split('원').filter(Boolean).map((seat) => {
      const seatTypeMatch = seat.match(/(.+석)/);
      const priceMatch = seat.match(/(\d+)/);

      if (seatTypeMatch && priceMatch) {
        const seatType = seatTypeMatch[1];
        const priceString = priceMatch[1];

        return { type: seatType, price: parseInt(priceString, 10) };
      } else {
        return { type: "알 수 없는 좌석", price: 0 };
      }
    });
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!detailData) {
    return <div>Loading...</div>;
  }

  // 응답 데이터 구조에 맞게 수정
  const item = detailData && detailData.db; // db 프로퍼티 안의 데이터 사용

  if (!item) {
    return <div>No detail available</div>;
  }
  
  // item.poster를 첫 번째 이미지로 추가하고, 이후 styurl 배열의 이미지들을 추가
  console.log(typeof(item.styurls.styurl))
  if(typeof(item.styurls.styurl)!='string'){
    console.log(item.styurls.styurl.length, item.styurls.styurl) }
    else
     console.log("1개", item.styurls.styurl)

  const images = item.poster 
  ? [item.poster, ...(typeof(item.styurls.styurl)!='string')?item.styurls.styurl : [  item.styurls.styurl]] 
  : [logo, ...(item.styurls?.styurl || [])];
 console.log(images);

 // http: -> https: 변환
const secureImages = images.map((url) => {
  return url.startsWith('http:') ? url.replace('http:', 'https:') : url;
});

  // 이전 이미지로 이동
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? secureImages.length - 1 : prevIndex - 1));
  };

  // 다음 이미지로 이동
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === secureImages.length - 1 ? 0 : prevIndex + 1));
  };
  

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h2>Seating Prices</h2>
      <ul>
        {seatingData.map((seat, index) => (
          <li key={index}>
            {seat.type}: {seat.price.toLocaleString()}원
          </li>
        ))}
      </ul>
      <br />
      <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
        <div style={{ position: 'relative' }}>
          {secureImages.length > 1 &&  (
            <img
              src={leftArrow} // 좌측 화살표
              alt="Previous"
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                cursor: 'pointer',
                width: '30px', height: '30px',
                filter: 'invert(100%) sepia(100%) saturate(0%) brightness(200%) contrast(1000%)', // 흰색으로 만듦
              }}
              onClick={handlePreviousImage}
            />
          )}
          <CardOverlay
            className="my-custom-class"
            img={secureImages[currentImageIndex]} // 현재 이미지 인덱스에 해당하는 이미지 사용
            style={{
              padding: "10px",
              margin: "0",
              width: "100%",
              borderRadius: "0 0 10px 10px",
            }}
          />
          {secureImages.length > 1 && (
            <img
              src={rightArrow} // 우측 화살표
              alt="Next"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                cursor: 'pointer',
                width: '30px', height: '30px',
                filter: 'invert(100%) sepia(100%) saturate(0%) brightness(200%) contrast(1000%)', // 흰색으로 만듦
              }}
              onClick={handleNextImage}
            />
          )}
        </div>
        <br />
        <br />
        <h1 className="display-6">{item.prfnm}</h1> {/* 공연명 */}
        <p style={{ textAlign: 'left', margin: '10px' }}># 안내</p>
        <p style={{ textAlign: 'left', margin: '10px' }}>{item.prfstate}</p> {/* 공연 상태 */}
        <hr />
        <br />
        <br />
        {item.fcltynm && item.fcltynm.trim() !== "" && ( <p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>장소: {item.fcltynm}</p> )} {/* 공연 장소 */}
        {item.prfpdfrom  && item.prfpdfrom.trim() !== ""&& (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>기간: {item.prfpdfrom} ~ {item.prfpdto}</p> )} {/* 공연 기간 */}
        {item.dtguidance  && item.dtguidance.trim() !== ""&& (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>시간: {item.dtguidance}</p> )}
        {item.prfruntime && item.prfruntime.trim() !== "" && (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>런타임: {item.prfruntime}</p> )}
        {item.prfage  && item.prfage.trim() !== ""&& (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>연령: {item.prfage} </p>)}
        {item.prfcast && item.prfcast.trim() !== "" && (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>출연진: {item.prfcast}</p> )}
        {item.prfcrew  && item.prfcrew.trim() !== ""&& (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>제작진: {item.prfcrew} </p> )}
        {item.entrpsnm  && item.entrpsnm.trim() !== ""&& (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>기획제작자: {item.entrpsnm}</p> )}
        {item.entrpsnmP && item.entrpsnmP.trim() !== "" && (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>제작사: {item.entrpsnmP} </p> )}
        {item.entrpsnmA && item.entrpsnmA.trim() !== "" && (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>기획사: {item.entrpsnmA}</p> )}
        {item.pcseguidance && item.pcseguidance.trim() !== "" && (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>티켓가격: {item.pcseguidance}</p>)}
        {item.sty && item.sty.trim() !== "" && (<p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>줄거리: {item.sty}</p> )}
        <br />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Button
            style={{ width: '110px' }}
            onClick={() => {
              navigate(`/MapComponent/${item.fcltynm}`);
            }}
          >
            길찾기
          </Button>

          <Button
            style={{ width: '110px' }}
            onClick={() => {
              //navigate(`/reserve`, { state: { title: item.prfnm, location: item.fcltynm, img: item.poster || logo } });
              navigate(`/reserve`, { state: { title: item.prfnm, location: item.fcltynm, img: item.poster || logo, seatingData: seatingData  } });
            }}
          >
            예약 및 결제
          </Button>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default ReservationDetail;