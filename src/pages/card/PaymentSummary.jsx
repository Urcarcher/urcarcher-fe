import Preloader from 'bootstrap-template/components/Preloader';
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #f0f4f7;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
`;

const Title = styled.h5`
  font-size: 16px;
  font-weight: bold;
`;

const Amount = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin: 0;
`;

const SubTitle = styled.p`
  color: #666;
  margin: 5px 0;
`;


const PaymentButton = styled(Button)`
  background-color: #0023fc;
  color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
`;

const RecentActivity = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #333;
`;

const ActivityDetail = styled.div`
  justify-content: flex-end;
`;

function PaymentSummary(props) {
  const [loading, setLoading] = useState(false);

  function paymentHandler(){
    // be
    setLoading(true);
    setTimeout(() => {
      // 성공 또는 실패 처리
      setLoading(false);
      alert("결제가 성공적으로 완료되었습니다.")
      props.setShowModal(false);
    }, 3000);
  }
    

  return (
    <Container>
      {loading && <Preloader type={'pulse'} variant={'primary'} center={true} />}
      <Card>
        <Title>09월 01일 결제예상금액</Title>
        <Amount>202,526원</Amount>
        <br/>
        <PaymentButton onClick={()=>{
          paymentHandler();
        }}>즉시결제</PaymentButton>
      </Card>

      <RecentActivity>
        <Title>최근 할리스 연트럴파에서 7,200원 결제하셨어요.</Title>
        <SubTitle>2024.08.19 13:53:41</SubTitle>
        <ActivityDetail>
          <Button variant="link">최근 이용내역 보러가기</Button>
        </ActivityDetail>
      </RecentActivity>
    </Container>
  );
}

export default PaymentSummary;
