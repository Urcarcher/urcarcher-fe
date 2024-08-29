import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import "./myReservation.css"; // 스타일링을 위한 CSS 파일

function MyReservations1() {
  const [userId, setUserId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

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
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]); // userId가 변경될 때 호출

  // 예약 삭제 핸들러
  const handleDelete = async () => {
    try {
      await Axios.put('/api/reserve/delete', { reservationId: selectedReservation.reservationId });
      // 삭제 후 예약 목록 갱신
      setReservations(reservations.filter(reservation => reservation.reservationId !== selectedReservation.reservationId));
      setShowModal(false); // 모달 닫기
    } catch (error) {
      alert("예약 삭제에 오류가 발생했습니다.");
    }
  };

  // 모달 열기
  const openModal = (reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setSelectedReservation(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
      <div style={{ position: 'relative' }}>
        <h2>My Reservations</h2>
        {reservations.length > 0 ? (
          <ul>
            {reservations.map((reservation) => (
              <li className="reservation-item" key={reservation.reservationId}>
                <hr></hr>
                <h3>{reservation.title}</h3>
                <p>일자: {reservation.reservationDate}</p>
                <p>상태: {reservation.state === 1 ? '예약완료' : reservation.state === 0 ? '예약취소' : '알 수 없음'}</p>
                <p>공연명: {reservation.name}</p>
                <p>위치: {reservation.location}</p>
                <p>인원: {reservation.peopleNum}</p>
                <p>좌석: {reservation.seat}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => openModal(reservation)}
                  disabled={reservation.state === 0} // 예약 상태가 0이면 비활성화
                >
                  {reservation.state === 0 ? '취소 완료' : '예약 취소'}
                </button>
                <hr></hr>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reservations found.</p>
        )}
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="reservation-modal-overlay">
          <div className="reservation-modal-content">
            <h3> {selectedReservation.name}<br></br> [{selectedReservation.reservationDate}]<hr/> 예약을 취소하겠습니까?</h3>
            <button className="btn btn-primary" onClick={handleDelete}>네</button>
            <button className="btn btn-primary" onClick={closeModal}>아니오</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyReservations1;
