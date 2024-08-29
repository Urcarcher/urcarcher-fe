import Axios from 'axios';
import Preloader from 'bootstrap-template/components/Preloader';
import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';



function PaymentSummary(props) {

  const { t, i18n } = useTranslation();
    const changeLanguage = (selectedLanguage) => {
        
        const languageMap = {
            Korea: 'ko',
            English: 'en',
            Japan: 'jp',
            China: 'cn'
        };

        const languageCode = languageMap[selectedLanguage] 
        i18n.changeLanguage(languageCode);
       
    };


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
        alert(t('ImmediatePaymentSuccess'))
        props.setShowModal(false);
      }, 3000);
    })
    .catch(()=>{
      setTimeout(() => {
        // 실패 처리
        setLoading(false);
        alert(t('ImmediatePaymentFailure'))
        props.setShowModal(false);
      }, 3000);
    })
  }


  useEffect(()=>{

    const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


    console.log(props.card.paymentDate);
    Axios.post('/api/payment/detailpayment',{
      cardId:String(props.card.cardId),
      paymentDate:String(props.card.paymentDate)
      })
    .then((response)=>{
      setExpectedAmount(response.data);
      setExpectedPayDate(props.card.paymentDate);
    })
    .catch((error)=>{alert(t('ErrorFetchingEstimatedAmount'))
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
        <Title>{formatDate(expectedPayDate)}  {t('EstimatedPaymentAmount')}</Title>
        <Amount>{Number(expectedAmount).toLocaleString()}+" "+{t('Won')}</Amount>
        <br/>
        <PaymentButton onClick={()=>{
          paymentHandler();
        }}>{t('ImmediatePayment')}</PaymentButton>
      </Card>

      <RecentActivity>
        <p style={{marginBottom:'0px'}}>
        {recentPayLocation ? (
          <>
            {t('Recent')} <span style={{ fontWeight: 'bold' }}>{recentPayLocation}</span>{t('From')}
            <span style={{ fontWeight: 'bold' }}> {Number(recentPay).toLocaleString()} </span>{t('Won')}+" "+{t('PaymentCompleted')}
          </>
        ) : (
          ''
        )}</p>
        <p style={{marginTop:'0px'}}>{recentPayDate}</p>

        <ActivityDetail>
          <Link to="/chart1" style={{textDecoration: 'underline', color: '#476EFF' }}>{t('ViewRecentTransactions')}</Link>
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
