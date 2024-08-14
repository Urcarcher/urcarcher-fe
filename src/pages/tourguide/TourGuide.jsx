import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TourGuide({
  numOfRows = '10',
  pageNo = '1',
  MobileOS = 'ETC',
  MobileApp = 'AppTest',
  _type = 'json',
  listYN = 'Y',
  arrange = 'A',
  contentTypeId = '12',
  areaCode = '1', // String으로 통일
  sigunguCode,
  cat1,
  cat2,
  cat3,
  modifiedtime
}) {
  const [tourData, setTourData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/tour/tour-info', {
          params: {
            numOfRows,
            pageNo,
            MobileOS,
            MobileApp,
            _type,
            listYN,
            arrange,
            contentTypeId,
            areaCode,
            sigunguCode,
            cat1,
            cat2,
            cat3,
            modifiedtime
          }
        });
        console.log(response.data); // 응답 데이터 확인용 콘솔 로그
        setTourData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [
    numOfRows, pageNo, MobileOS, MobileApp, _type,
    listYN, arrange, contentTypeId, areaCode, sigunguCode,
    cat1, cat2, cat3, modifiedtime
  ]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tourData) {
    return <div>Loading...</div>;
  }

  // 응답 데이터 구조에 맞게 수정 필요
  const items = tourData.response?.body?.items?.item || []; // 기본값 빈 배열로 설정

  if (items.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Tour Information</h1>
      <ul>
        {items.map((item) => (
          <li key={item.contentid}> {/* 고유 ID를 사용하는 것이 좋음 */}
            <Link to={`/detail/${contentTypeId === 39 ? 'restaurant':'tour'}/${item.contentid}`}>
            <h2>{item.title}</h2> {/* 실제 데이터 구조에 맞게 수정 */}
            </Link>
            <p>Code: {item.contenttypeid}</p> {/* 실제 데이터 구조에 맞게 수정 */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TourGuide;
