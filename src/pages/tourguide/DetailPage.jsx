import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CardOverlay from '../../bootstrap-template/components/cards/CardOverlay';
import { Margin } from '@mui/icons-material';
import { Button } from 'react-bootstrap';

function DetailPage() {
  const { type, id } = useParams(); // id와 type을 URL 파라미터로 받음
  const [detailData, setDetailData] = useState(null);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await axios.get('/api/tour/tour-detail', {
          params: {
            contentId: id,
            MobileOS: 'ETC',
            MobileApp: 'AppTest',
            _type: 'json'
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

  // 응답 데이터 구조에 맞게 수정 필요
  const item = detailData.response?.body?.items?.item[0];

  if (!item) {
    return <div>No detail available</div>;
  }

  return (
    <div>
      <br/>
      <br/>
      <br/>

      <CardOverlay 
                className="my-custom-class" 
                img={item.firstimage} 
                style={{
                  padding: "10px",
                  position: "absolute",
                  Margin:"0",
                  width: "100%",
                  borderRadius: "0 0 10px 10px"}}
      />
      <br/>
      <br/>
      <h1 className="display-6">{item.title}</h1> {/* 제목 */}
      <p style={{textAlign:'left', margin:'10px'}}># 안내</p>
      <p style={{textAlign:'left', margin:'10px'}}>{item.overview}</p> {/* 개요 */}
      <hr/>
      <br/>
      <br/>
      <p className="text-muted" style={{textAlign:'left', margin:'10px'}}>Address: {item.addr1}</p> {/* 주소 */}
      <p className="text-muted" style={{textAlign:'left', margin:'10px'}}>Tel: {item.tel? item.tel:'확인이 불가합니다.'}</p>
      <br/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <Button
          style={{width:'110px'}}
          onClick={() => {
            navigate(`/MapComponent/${item.addr1}`);
          }}
        >
          길찾기
        </Button>
        <Button style={{width:'110px'}}>
          예약 및 결제
        </Button>
      </div>

    </div>
  );
}

export default DetailPage;
