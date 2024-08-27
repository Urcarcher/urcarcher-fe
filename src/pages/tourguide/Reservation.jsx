import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Reservation() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [reservePerson, setReservePerson] = useState(null);
  const location = useLocation();
  const recv = location.state;
  let navigate = useNavigate();

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

  useEffect(()=>{

    Axios.get("/api/t/test").then((response)=>{
      setReservePerson(response.data);
      console.log(reservePerson)
    })
  },[reservePerson])


  return (
    <ScrollableContainer>
      <br/>
      <br/>
      <br/>
      <br/>
      <StyledContainer style={{fontFamily: 'NanumSquareNeo'}}>
        <h3 style={{marginBottom: '30px'}}> {recv.title}</h3>
        <StyledRow>
          <StyledCol>
            <Header style={{textAlign: 'left'}}>인원을 선택해 주세요</Header>
            <PeopleSelect>
              {['1명', '2명', '3명', '4명', '5명이상'].map((people, index) => (
                <CustomButton
                  key={index}
                  active={selectedPeople === people}
                  onClick={() => handlePeopleChange(people)}
                >
                  {people}
                </CustomButton>
              ))}
            </PeopleSelect>
          </StyledCol>
        </StyledRow>
        <Divider />
        <StyledRow>
          <StyledCol>
            <Header style={{textAlign: 'left'}}>날짜를 선택해 주세요</Header>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="react-calendar modern-calendar"
            />
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol>
            <Header style={{textAlign: 'left'}}>시간을 선택해 주세요</Header>
            <TimeSelect>
              {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'].map((time, index) => (
                <CustomButton
                  key={index}
                  active={selectedTime === time}
                  onClick={() => handleTimeChange(time)}
                >
                  {time}
                </CustomButton>
              ))}
            </TimeSelect>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol>
            <Divider />
            <Header>※ 예약 시 확인해 주세요</Header>
            <Notice>당일 취소 불가합니다. 하루전 전화 취소 부탁드립니다.</Notice>
            <Notice>
              해당 가맹점 Urcarchar 카드 결제시 <Discount>10%할인</Discount>
            </Notice>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <CenteredCol>
            <StyledNextButton variant="primary" onClick={handleNextClick}>
              다음
            </StyledNextButton>
          </CenteredCol>
        </StyledRow>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>예약 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalContent>
              <ReservationBox>
                <ReservationTitle>{recv.title} 예약</ReservationTitle>
                <hr/>
                <p style={{textAlign: 'left'}}>일정: {selectedDate.toLocaleDateString()} - {selectedTime}</p>
                <p style={{textAlign: 'left'}}>인원: {selectedPeople}</p>
                <p style={{textAlign: 'left', color:'red'}}>
                  예약금: {(parseInt(selectedPeople, 10) * 10000).toLocaleString()}원
                </p>
                <p style={{textAlign: 'left'}}>위치 : {recv.location}</p>
              </ReservationBox>
              <InfoSection>
                <InfoTitle>예약자 정보</InfoTitle>
                <hr />
                {reservePerson ? (
                  <>
                    <p style={{textAlign: 'left'}}>예약자: {reservePerson.name}</p>
                    <p style={{textAlign: 'left'}}>연락처: {reservePerson.phoneNumber}</p>
                    <p style={{textAlign: 'left'}}>이메일: {reservePerson.email}</p>
                    <Input placeholder="요청사항: 업체에 요청하실 내용을 적어주세요." />
                  </>
                ) : (
                  <p style={{textAlign: 'left', color: 'red'}}>예약자 정보를 불러오는 중입니다...</p>
                )}
                
              </InfoSection>
            </ModalContent>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary"
          onClick={()=>{
            navigate('/paymentpage', {
              state: {
                  img: recv.img,
                  title: recv.title,
                  price: parseInt(selectedPeople, 10) * 10000
              }
          });
          }}>예약금 결제</Button>
            
            
            <CancelButton onClick={handleClose}>
              취소
            </CancelButton>
          </Modal.Footer>
        </Modal>
      </StyledContainer>
    </ScrollableContainer>
  );
}

const ScrollableContainer = styled.div`
  max-height: 800px;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
`;

const StyledContainer = styled(Container)`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const StyledRow = styled(Row)`
  margin-bottom: 20px;
`;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h5`
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 1.1em;
  color: #333;
`;

const PeopleSelect = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CustomButton = styled.button.attrs(props => ({
  active: props.active ? 'true' : undefined,
}))`
  flex: 1 1 auto;
  margin-right: 10px;
  text-align: center;
  padding: 10px 0;
  border-radius: 20px;
  font-size: 0.9em;
  border: 2px solid ${(props) => (props.active === 'true' ? '#007bff' : '#cccccc')};
  background-color: ${(props) => (props.active === 'true' ? '#007bff' : '#ffffff')};
  color: ${(props) => (props.active === 'true' ? '#ffffff' : '#333')};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
  }

  &:last-child {
    margin-right: 0;
  }
`;


const TimeSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Divider = styled.hr`
  border-top: 1px solid #ccc;
`;

const Notice = styled.p`
  margin: 0;
`;

const Discount = styled.span`
  color: red;
  font-weight: bold;
`;

const CenteredCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

const StyledNextButton = styled(Button)`
  width: 80%;
  padding: 10px 0;
  font-size: 1em;
`;

const CancelButton = styled(Button)`
  background-color: #cccccc !important;
  color: #333 !important;
  border: none;
  
  &:hover {
    background-color: #aaaaaa !important;
    color: white !important;
  }
`;

const ModalContent = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const ReservationBox = styled.div`
  background-color: #E5EAFF;
  color: black;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const ReservationTitle = styled.h6`
  font-size: 1.1em;
  margin-bottom: 10px;
`;

const InfoSection = styled.div`
  background-color: #EDF0F7;
  padding: 15px;
  border-radius: 10px;
`;

const InfoTitle = styled.h6`
  font-size: 1em;
  margin-bottom: 10px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 0.9em;
`;

export default Reservation;
