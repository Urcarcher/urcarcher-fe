import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';


function Reservation() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [showModal, setShowModal] = useState(false);
  // 전달 받은 데이터 세팅
  const location = useLocation();
  const recv = location.state;
  console.log(recv);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
  const handlePeopleChange = (people) => {
    setSelectedPeople(people);
  };
  const handleNextClick = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  


  return (
    <div  className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
    <Container style={styles.container}>
    <h2>장소 : {recv.title}</h2>
    <br/>
      <Row className="mb-4">
        <Col>
          <h5 style={styles.header}>인원을 선택해 주세요</h5>
          <div style={styles.peopleSelect}>
            {['1명', '2명', '3명', '4명', '5명이상'].map((people, index) => (
              <Button
                key={index}
                variant={selectedPeople === people ? 'primary' : 'outline-secondary'}
                onClick={() => handlePeopleChange(people)}
                style={styles.peopleButton}
              >
                {people}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
      <hr/>
      <Row className="mb-4">
        <Col>
          <h5 style={styles.header}>날짜를 선택해 주세요</h5>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="react-calendar modern-calendar"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h5 style={styles.header}>시간을 선택해 주세요</h5>
          <div style={styles.timeSelect}>
            {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'].map((time, index) => (
              <Button
                key={index}
                variant={selectedTime === time ? 'primary' : 'outline-secondary'}
                onClick={() => handleTimeChange(time)}
                style={styles.timeButton}
              >
                {time}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
        <hr/>
          <h5 style={styles.header}>예약 시 확인해 주세요</h5>
          <p style={{margin:'0'}}>당일 취소 불가합니다. 하루전 취소 부탁드립니다.</p>
          <p>해당 가맹점 Urcarchar 카드 결제시 <span style={{color:'red'}}>10%할인</span></p>
        </Col>
      </Row>
      <Row>
        <Col style={styles.centerAlign}>
          <Button variant="primary" style={styles.nextButton} onClick={handleNextClick}>
            다음
          </Button>
        </Col>
      </Row>


      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>예약 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={styles.modalContent}>
            <div style={styles.reservationBox}>
              <h6 style={styles.reservationTitle}>{recv.title} 예약</h6>
              <p>일정: {selectedDate.toLocaleDateString()} - {selectedTime}</p>
              <p>인원: {selectedPeople}</p>
              <p>위치 : {recv.location}</p>
            </div>
            <div style={styles.infoSection}>
              <h6 style={styles.infoTitle}>예약자 정보</h6>
              <hr/>
              <p>예약자: 김주현</p>
              <p>연락처: 010-2622-4052</p>
              <p>이메일: kimjh2007kr@naver.com</p>
              <input type='text' placeholder='요청사항: 업체에 요청하실 내용을 적어주세요.' style={{width:'100%'}}/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleClose}>
            예약금 결제
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
}
const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  header: {
    marginBottom: '15px',
    fontWeight: 'bold',
    fontSize: '1.1em',
    color: '#333',
  },
  peopleSelect: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  peopleButton: {
    flex: '1 1 auto',
    marginRight: '10px',
    textAlign: 'center',
    padding: '10px 0',
    borderRadius: '20px',
    fontSize: '0.9em',
  },
  timeSelect: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  },
  timeButton: {
    textAlign: 'center',
    padding: '10px 0',
    borderRadius: '20px',
    fontSize: '0.9em',
  },
  nextButton: {
    width: '80%',
    padding: '10px 0',
    borderRadius: '20px',
    fontSize: '1em',
  },
  centerAlign: {
    display: 'flex',
    justifyContent: 'center',
  },
  modalContent: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  reservationBox: {
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
    padding: '15px',
    borderRadius: '10px',
    marginBottom: '15px',
  },
  reservationTitle: {
    fontSize: '1.1em',
    marginBottom: '10px',
  },
  infoSection: {
    backgroundColor: '#F8F9FA',
    padding: '15px',
    borderRadius: '10px',
  },
  infoTitle: {
    fontSize: '1em',
    marginBottom: '10px',
    color: '#333',
  },
};
export default Reservation;