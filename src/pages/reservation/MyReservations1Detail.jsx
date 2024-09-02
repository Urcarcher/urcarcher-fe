import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import "./myReservation.css"; // 스타일링을 위한 CSS 파일
import { useNavigate, useParams } from 'react-router-dom';

function MyReservations1Detail() {
  const { reservationId } = useParams(); // URL 파라미터에서 reservationId를 가져옵니다.
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [reservation, setReservation] = useState(null); // 단일 예약 정보를 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 오늘 날짜 계산
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 포맷

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
    if (userId === null || reservationId === undefined) return; // userId가 없거나 reservationId가 없으면 API 호출하지 않음

    // 예약 정보 가져오기
    const fetchReservation = async () => {
      try {
        const response = await Axios.get(`/api/reserve/myReservation1/detail/${reservationId}`);
        setReservation(response.data); // 단일 예약 정보를 설정
        // 예약의 memberId가 현재 userId와 다른 경우 메인 화면으로 이동
        if (response.data.memberId !== userId) {
            navigate('/'); // 메인 화면으로 이동
          } else {
            setLoading(false);
          }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReservation();
  }, [userId, reservationId]); // userId와 reservationId가 변경될 때 호출

  // 예약 삭제 핸들러
  const handleDelete = async () => {
    try {
      await Axios.put('/api/reserve/delete', { reservationId });
      setShowModal(false); // 모달 닫기
      setShowSuccessModal(true); // 성공 메시지 모달 표시
      // 일정 시간 후 페이지 이동
      setTimeout(() => {
        navigate('/myReservationList1');
      }, 2000); // 2초(2000ms) 후 이동
    } catch (error) {
      alert("예약 삭제에 오류가 발생했습니다.");
    }
  };

  // 모달 열기
  const openModal = () => {
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setShowSuccessModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

   // 예약 시간이 null 또는 undefined일 경우 기본값을 설정합니다.
   const time = reservation.reservationTime || ''; // 기본값을 빈 문자열로 설정
   const formattedTime = time.replace(':00', '');

  return (
    <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
      <div style={{ position: 'relative' }}>
        <br /><br /><br />
        {reservation ? (
          <div className="reservation-item" key={reservation.reservationId}>
            <hr />
            <p>일자: {reservation.reservationDate}</p>
            <p>시간: {formattedTime}</p>
            <p>상태: {reservation.state === 1 ? '예약완료' : reservation.state === 0 ? '예약취소' : '알 수 없음'}</p>
            <p>
                    {reservation.classification === 1 ? '공연명: ' + reservation.name : 
                     reservation.classification === 2 ? '식당명: ' + reservation.name : 
                     '명칭 없음'}
                  </p>
            <p>위치: {reservation.location}</p>
            <p>인원: {reservation.peopleNum}</p>
            <p>좌석: {reservation.seat}</p>
            <button
              className="btn btn-primary"
              onClick={openModal}
              disabled={reservation.state === 0 || (reservation.state === 1 && reservation.reservationDate <= today)}
            >
              {reservation.state === 1 && reservation.reservationDate <= today ? '기간 만료' : '예약 취소'}
            </button>
            <hr />
          </div>
        ) : (
          <p>No reservation details found.</p>
        )}
      </div>

      {/* 예약 취소 확인 모달 */}
      {showModal && (
        <div className="reservation-modal-overlay">
          <div className="reservation-modal-content">
            <h3>{reservation.name}<br />[{reservation.reservationDate}]<hr /> 예약을 취소하겠습니까?</h3>
            <button className="btn btn-primary" onClick={handleDelete}>네</button>
            <button className="btn btn-primary" onClick={closeModal}>아니오</button>
          </div>
        </div>
      )}

      {/* 예약 취소 완료 모달 */}
      {showSuccessModal && (
        <div className="reservation-modal-overlay">
          <div className="reservation-modal-content">
            <h3>예약 취소가 완료되었습니다.<br />페이지가 자동으로 이동합니다.</h3>
            <button className="btn btn-primary" onClick={closeModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyReservations1Detail;
