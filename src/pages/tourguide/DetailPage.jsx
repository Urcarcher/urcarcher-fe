import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function DetailPage() {
  const { type, id } = useParams(); // id와 type을 URL 파라미터로 받음
  const [detailData, setDetailData] = useState(null);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // test
    //console.log(id);
    //console.log(type);
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
      <h1>{item.title}</h1> {/* 제목 */}
      <p>{item.overview}</p> {/* 개요 */}
      <img src={item.firstimage} alt={item.title} /> {/* 대표 이미지 */}
      <p>Address: {item.addr1}</p> {/* 주소 */}
      <p>Tel: {item.tel}</p> {/* 전화번호 */}
      <button onClick={()=>{
        navigate(`/MapComponent_G/${item.addr1}`)
        // <Link to={`/MapComponent_G/${address}`}/>
      }}>길찾기</button>
      {/* {type === 'restaurant' && (
        <p>Menu: {item.menu}</p> // 메뉴 정보가 있을 경우 표시
      )} */}
    </div>
  );
}

export default DetailPage;
