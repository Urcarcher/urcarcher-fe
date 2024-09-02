import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import "./myReservation.css"; // 스타일링을 위한 CSS 파일
import { Link } from 'react-router-dom';

function MyReservations1() {
  const [userId, setUserId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [currentReservations, setCurrentReservations] = useState([]); // 현재 표시되는 예약 목록
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [view, setView] = useState('all'); // 현재 보이는 목록을 구분

  useEffect(() => {
    // 회원 정보 가져오기
    const fetchUserId = async () => {
      try {
        const response = await Axios.get('/api/t/test');
        setUserId(response.data.memberId);
      } catch (error) {
        alert("회원정보를 가져오는데 오류 발생");
      }
    };

    fetchUserId();
  }, []); // 빈 배열로 컴포넌트가 처음 마운트될 때 한 번만 호출

  useEffect(() => {
    if (userId === null) return; // userId가 없으면 API 호출하지 않음

    // 예약 정보 가져오기
    const fetchReservations = async () => {
      try {
        const response = await Axios.get(`/api/reserve/myReservation1/${userId}`);
        setReservations(response.data);
        setCurrentReservations(response.data); // 기본 예약 목록으로 설정
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]); // userId가 변경될 때 호출

  // 보기 전환 핸들러
  const showAllReservations = () => {
    setCurrentReservations(reservations); // 모든 예약 목록으로 설정
    setView('all');
  };

  const showPerformanceReservations = () => {
    setCurrentReservations(reservations.filter(reservation => reservation.classification === 1));
    setView('performance');
  };

  const showRestaurantReservations = () => {
    setCurrentReservations(reservations.filter(reservation => reservation.classification === 2));
    setView('restaurant');
  };

  // 컴포넌트가 렌더링될 때 currentReservations를 콘솔에 출력하여 문제를 확인합니다.
  useEffect(() => {
    console.log("Current reservations:", currentReservations);
  }, [currentReservations]);

  if (loading) return <p>Loagding...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
      <div style={{ position: 'relative' }}>
        <br /><br /><br />
        <div className='region-buttons'>
          <button className="reservationList-button" onClick={showAllReservations}>전체 목록</button>
          <button className="reservationList-button" onClick={showPerformanceReservations}>공연 목록</button>
          <button className="reservationList-button" onClick={showRestaurantReservations}>맛집 목록</button>
        </div>
        <p>해당 예약 건 클릭 시 상세 보기 가능</p>
        {currentReservations.length > 0 ? (
          <ul>
            {currentReservations.map((reservation) => {

              return (
                <li className='list-item' key={reservation.reservationId}>
                  <hr />
                  <Link to={`/myReservationList1Detail/${reservation.reservationId}`}>
                    <div className='list-up'>
                        <div className='up'>
                          <h6>{reservation.reservationDate}</h6>
                          <h3 className='right-text'>{reservation.peopleNum} 매</h3>
                        </div>
                      <div className='list-down'>
                        <div className='down'>
                          <h5>{reservation.name}</h5>
                        <h6 className='right-text'>[{reservation.state === 0 ? '예약취소' : '예약완료'}]</h6>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>예약 내역이 존재하지 않습니다.</p>
        )}
      </div>
    </div>
  );
}

export default MyReservations1;
