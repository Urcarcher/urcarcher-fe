import Axios from 'axios';
import Preloader from 'bootstrap-template/components/Preloader';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';


function PaymentSummary(props) {
  const [loading, setLoading] = useState(false);
  const [expectedAmount, setExpectedAmount ] = useState();
  const [expectedPayDate, setExpectedPayDate] = useState();

  const [recentPay, setRecentPay] = useState();
  const [recentPayDate, setRecentPayDate] = useState();
  const [recentPayLocation, setRecentPayLocation] = useState();

  function paymentHandler(){
    // be
    setLoading(true);

    Axios.post("/api/card/immediatepayment",{cardId:6})
    .then(()=>{
      setTimeout(() => {
        // 성공 처리
        setLoading(false);
        alert("즉시결제가 성공적으로 완료되었습니다.")
        props.setShowModal(false);
      }, 3000);
    })
    .catch(()=>{
      setTimeout(() => {
        // 실패 처리
        setLoading(false);
        alert("즉시결제가 실패하였습니다.")
        props.setShowModal(false);
      }, 3000);
    })
  }


  useEffect(()=>{
    Axios.get("/api/card/get/6")
    .then((response)=>{
      setExpectedAmount(response.data.cardBalance);
      setExpectedPayDate(response.data.paymentDate);
    })
    .catch((error)=>{alert('결제 예상 금액 가져오는데 문제 발생')})

    // 최근 결제 내역 확인하기 
    Axios.post("/api/payment/recentpayment",{cardId:1})
    .then((response)=>{
      setRecentPay(response.data.paymentPrice);
      setRecentPayDate(response.data.paymentDate.replace(/T/g, ' '));
      setRecentPayLocation(response.data.storeName);

      console.log(response.data.paymentPrice);
      console.log(response.data.paymentDate);
      console.log(response.data.storeName);
    })
    .catch(()=>{
    })
  },[])

  return (
    <Container>
      {loading && <Preloader type={'pulse'} variant={'primary'} center={true} />}
      <Card>
        <Title>{formatDate(expectedPayDate)}  결제예상금액</Title>
        <Amount>{Number(expectedAmount).toLocaleString()}</Amount>
        <br/>
        <PaymentButton onClick={()=>{
          paymentHandler();
        }}>즉시결제</PaymentButton>
      </Card>

      <RecentActivity>
        <p style={{marginBottom:'0px'}}>최근 <span style={{fontWeight:'bold'}}>{recentPayLocation}</span>에서 <span style={{fontWeight:'bold'}}>{Number(recentPay).toLocaleString()}</span>원 결제하셨어요.</p>
        <p style={{marginTop:'0px'}}>{recentPayDate}</p>
        <ActivityDetail>
          <a href='#' style={{textDecoration: 'underline', color: '#476EFF' }}>최근 이용내역 보러가기</a>
        </ActivityDetail>
      </RecentActivity>
    </Container>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric' }; // 'long'을 사용하면 '5월' 형식으로 표시
  return date.toLocaleDateString('ko-KR', options);
}

const Card = styled.div`
  background-color: #f0f4f7;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
`;

const Title = styled.h5`
  font-size: 20px;
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

export default PaymentSummary;
