import Axios from 'axios';
import Preloader from 'bootstrap-template/components/Preloader';
import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


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

    Axios.post("/api/payment/immediatepayment",{
      cardId:String(props.card.cardId),
      paymentDate:String(props.card.paymentDate)
    })
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
    console.log(props.card.paymentDate);
    Axios.post('/api/payment/detailpayment',{
      cardId:String(props.card.cardId),
      paymentDate:String(props.card.paymentDate)
      })
    .then((response)=>{
      setExpectedAmount(response.data);
      setExpectedPayDate(props.card.paymentDate);
    })
    .catch((error)=>{alert('결제 예상 금액 가져오는데 문제 발생')
      console.log(error);
    })

    // 최근 결제 내역 확인하기 
    Axios.post("/api/payment/recentpayment",{cardId:String(props.card.cardId)})
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
  },[props.card]);

  return (
    <Container style={{width:'400px'}}>
      {loading && <Preloader type={'pulse'} variant={'primary'} center={true} />}
      <Card>
        <Title>{formatDate(expectedPayDate)}  결제예상금액</Title>
        <Amount>{Number(expectedAmount).toLocaleString()}원</Amount>
        <br/>
        <PaymentButton onClick={()=>{
          paymentHandler();
        }}>즉시결제</PaymentButton>
      </Card>

      <RecentActivity>
        <p style={{marginBottom:'0px'}}>최근 <span style={{fontWeight:'bold'}}>{recentPayLocation}</span>에서 <span style={{fontWeight:'bold'}}>{Number(recentPay).toLocaleString()}</span>원 결제하셨어요.</p>
        <p style={{marginTop:'0px'}}>{recentPayDate}</p>
        <ActivityDetail>
          <Link to="/chart1" style={{textDecoration: 'underline', color: '#476EFF' }}>최근 이용내역 보러가기</Link>
        </ActivityDetail>
      </RecentActivity>
    </Container>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric' };
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
