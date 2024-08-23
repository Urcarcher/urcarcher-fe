import Axios from 'axios';
import Preloader from 'bootstrap-template/components/Preloader';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, ToggleButton, ToggleButtonGroup, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const AmountButton = styled(Button)`
  width: 100%;
  margin-bottom: 10px;
`;

const RechargeButton = styled(Button)`
  width: 100%;
  font-size: 20px;
  padding: 10px;
`;

const PaymentOption = styled(Form.Check)`
  margin-bottom: 10px;
`;

function ChargePayment(props) {
  const [nowRemainPay, setNowRemainPay] = useState();
  const [amount, setAmount] = useState('10000');
  const [customAmount, setCustomAmount] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card-general');
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (value) => {
    if (value !== 'custom'){
      setAmount(value);
      setCustomAmount('');
    } else {
      setAmount(value);
    }
  }

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount('custom'); // 사용자가 입력하면 'custom' 상태를 유지
  }

  const handlePaymentMethodChange = (e) => setPaymentMethod(e.currentTarget.value);

  const handleRecharge = () => {
    setLoading(true);
    // 비동기 작업 (예: API 호출)
    Axios.post('/api/card/chargeamount',{
      cardId : 6,
      cardBalance : amount === 'custom' ? customAmount : amount
    })
    .then(()=>{
      setTimeout(() => {
        // 성공 처리
        setLoading(false);
        alert('충전이 완료되었습니다.'); 
        props.setShowModal(false);
      }, 3000);
    })
    .catch(()=>{
      setTimeout(() => {
        // 실패 처리
        setLoading(false);
        alert('충전에 실패하였습니다.'); 
        props.setShowModal(false);
      }, 3000);
    })
  };

  useEffect(()=>{
    Axios.get('/api/card/get/6')
    .then((response)=>{
      console.log(response.data.cardBalance);
      setNowRemainPay(response.data.cardBalance);
    })
    .catch((error)=>{
      alert('사용자 잔액 불러오는데 에러발생함');
    })
  },[]);

  return (
    <Container>
      {loading && <Preloader type={'pulse'} variant={'primary'} center={true} />}
      <h5>충전 금액</h5>
      <ToggleButtonGroup type="radio" name="amount" value={amount} onChange={handleAmountChange} className="mb-3">
        <ToggleButton id="tbg-radio-1" value="10000" variant={amount === '10000' ? "primary" : "outline-secondary"}>1만원</ToggleButton>
        <ToggleButton id="tbg-radio-2" value="30000" variant={amount === '30000' ? "primary" : "outline-secondary"}>3만원</ToggleButton>
        <ToggleButton id="tbg-radio-3" value="50000" variant={amount === '50000' ? "primary" : "outline-secondary"}>5만원</ToggleButton>
        <ToggleButton id="tbg-radio-4" value="70000" variant={amount === '70000' ? "primary" : "outline-secondary"}>7만원</ToggleButton>
        <ToggleButton id="tbg-radio-5" value="100000" variant={amount === '100000' ? "primary" : "outline-secondary"}>10만원</ToggleButton>
        <ToggleButton id="tbg-radio-6" value="custom" variant={amount === 'custom' ? "primary" : "outline-secondary"}>기타</ToggleButton>
      </ToggleButtonGroup>
      {amount === 'custom' && (
        <FormControl
          type="number"
          placeholder="금액을 입력하세요"
          value={customAmount}
          onChange={handleCustomAmountChange} // 별도의 핸들러 사용
          className="mt-2"
        />
      )}

      <h5>결제 수단</h5>
      <Form>
        <PaymentOption type="radio" label="신용카드 간편결제" value="credit-card-simple" checked={paymentMethod === 'credit-card-simple'} onChange={handlePaymentMethodChange} />
        <PaymentOption type="radio" label="신용카드 일반결제" value="credit-card-general" checked={paymentMethod === 'credit-card-general'} onChange={handlePaymentMethodChange} />
        <PaymentOption type="radio" label="SSGPAY" value="ssgpay" checked={paymentMethod === 'ssgpay'} onChange={handlePaymentMethodChange} />
        <PaymentOption type="radio" label="계좌이체" value="bank-transfer" checked={paymentMethod === 'bank-transfer'} onChange={handlePaymentMethodChange} />
      </Form>

      <div className="my-3 text-muted">
        재충전 이후 거래 이력이 없는 경우, 충전일로부터 최대 7일 내 온라인에서 충전 취소가 가능합니다.
      </div>

      <h5>충전 후 예상 총 카드 잔액</h5>
      <div className="my-3">
        <h2>{(Number(nowRemainPay) + Number(amount === 'custom' ? customAmount : amount)).toLocaleString()}원</h2>
      </div>

      <RechargeButton onClick={handleRecharge}>충전하기</RechargeButton>
    </Container>
  );
}

export default ChargePayment;
