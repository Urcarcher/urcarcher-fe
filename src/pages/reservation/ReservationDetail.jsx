import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardOverlay from '../../bootstrap-template/components/cards/CardOverlay';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function ReservationDetail() {
  const { id } = useParams(); // mt20id를 URL 파라미터로 받음
  const [detailData, setDetailData] = useState(null);
  const [error, setError] = useState(null);
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
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDetailData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!detailData) {
    return <div>Loading...</div>;
  }

  // 응답 데이터 구조에 맞게 수정
  const item = detailData.db; // db 프로퍼티 안의 데이터 사용

  if (!item) {
    return <div>No detail available</div>;
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
        <CardOverlay
          className="my-custom-class"
          img={item.poster || 'default-image-url.jpg'} // default-image-url.jpg는 대체 이미지 URL
          style={{
            padding: "10px",
            position: "absolute",
            margin: "0",
            width: "100%",
            borderRadius: "0 0 10px 10px"
          }}
        />
        <br />
        <br />
        <h1 className="display-6">{item.prfnm}</h1> {/* 공연명 */}
        <p style={{ textAlign: 'left', margin: '10px' }}># 안내</p>
        <p style={{ textAlign: 'left', margin: '10px' }}>{item.prfstate}</p> {/* 공연 상태 */}
        <hr />
        <br />
        <br />
        <p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>장소: {item.fcltynm}</p> {/* 공연 장소 */}
        <p className="text-muted" style={{ textAlign: 'left', margin: '10px' }}>기간: {item.prfpdfrom} ~ {item.prfpdto}</p> {/* 공연 기간 */}
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
              navigate(`/reservation1`, { state: { title: item.prfnm, location: item.fcltynm, img: item.poster || 'default-image-url.jpg' } });
            }}
          >
            예약 및 결제
          </Button>

          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default ReservationDetail;
