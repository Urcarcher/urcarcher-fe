import React, { useState, useEffect } from 'react';
import $ from 'jquery';

const TestReservation = () => {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformances = () => {
      $.ajax({
        url: '/api/reservation/reservation-info',
        method: 'GET',
        data: {
          service: process.env.REACT_APP_KOPIS_API_KEY,  // 여기에 실제 서비스 키를 입력하세요
          stdate: '20160601',
          eddate: '20160630',
          cpage: 1,
          rows: 5,
          prfstate: '02',
          signgucode: '11',
          signgucodesub: '1111',
          kidstate: 'Y',
          newsql: 'Y'
        },
        dataType: 'json',
        success: (data) => {
          console.log('API response:', data); // API 응답을 콘솔에 출력
          setPerformances(data.performances || []); // 서버의 응답 데이터 구조에 맞게 수정
          setLoading(false);
        },
        error: (xhr, status, err) => {
          console.log('API response:', err); // API 응답을 콘솔에 출력
          setError(err);
          setLoading(false);
        }
      });
    };

    fetchPerformances();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="contents">
      <h1>KOPIS Performances</h1>
      <ul>
        {performances.map((performance, index) => (
          <li key={index}>
            <h2>{performance.mt20id}</h2>
            <p>Date: {performance.date}</p>
            <p>Venue: {performance.prfpdfrom}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestReservation;
