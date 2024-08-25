import Axios from 'axios';
import Preloader from 'bootstrap-template/components/Preloader';
import React, { useEffect, useState } from 'react';
import { Container, Form, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';

// Styled components
const RechargeButton = styled(Button)`
  width: 70%;
  font-size: 20px;
  padding: 10px;
`;

const PaymentOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const PaymentOptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 15px;
  font-weight:bold;
  border: 2px solid #cccccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 10px;

  &:hover {
    background-color: #f1f1f1;
    border-color: #aaaaaa;
  }
`;

const PaymentOptionInput = styled(Form.Check.Input)`
  margin-right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const CustomToggleButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CustomToggleButton = styled.button`
  border-radius: 10px;
  border: 2px solid ${({ active }) => (active ? '#476EFF' : '#cccccc')};
  background-color: ${({ active }) => (active ? '#476EFF' : '#ffffff')};
  color: ${({ active }) => (active ? '#ffffff' : '#333333')};
  font-weight: bold;
  width: 80px;
  height: 50px;
  text-align: center;
  line-height: 1.5;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? '#365acb' : '#f1f1f1')};
    border-color: ${({ active }) => (active ? '#365acb' : '#aaaaaa')};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

function ChargePayment(props) {
  const [nowRemainPay, setNowRemainPay] = useState();
  const [amount, setAmount] = useState('10000');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card-simple');
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (value) => {
    if (value !== 'custom') {
      setAmount(value);
      setCustomAmount('');
    } else {
      setAmount(value);
    }
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount('custom');
  };

  const handlePaymentMethodChange = (e) => setPaymentMethod(e.currentTarget.value);

  const handleRecharge = () => {
    setLoading(true);
    Axios.post('/api/card/chargeamount', {
      cardId: props.card.cardId,
      cardBalance: amount === 'custom' ? customAmount : amount,
    })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          alert('충전이 완료되었습니다.');
          props.setShowModal(false);
        }, 3000);
      })
      .catch(() => {
        setTimeout(() => {
          setLoading(false);
          alert('충전에 실패하였습니다.');
          props.setShowModal(false);
        }, 3000);
      });
  };

  useEffect(() => {
    Axios.get(`/api/card/get/${props.card.cardId}`)
      .then((response) => {
        setNowRemainPay(response.data.cardBalance);
      })
      .catch((error) => {
        alert('사용자 잔액 불러오는데 에러발생함');
      });
  }, [props.card.cardId]);

  return (
    <Container>
      {loading && <Preloader type={'pulse'} variant={'primary'} center={true} />}
      <h5>충전 금액</h5>
      <br/>
      <CustomToggleButtonGroup>
        {['10000', '30000', '50000', '70000', '100000'].map((value) => (
          <CustomToggleButton
            key={value}
            active={amount === value}
            onClick={() => handleAmountChange(value)}
          >
            {parseInt(value, 10).toLocaleString()}원
          </CustomToggleButton>
        ))}
        <CustomToggleButton
          active={amount === 'custom'}
          onClick={() => handleAmountChange('custom')}
        >
          기타
        </CustomToggleButton>
      </CustomToggleButtonGroup>
      {amount === 'custom' && (
        <FormControl
          type="number"
          placeholder="금액을 입력하세요"
          value={customAmount}
          onChange={handleCustomAmountChange}
          className="mt-2"
        />
      )}
      <br/>
      <br/>
      <h5>결제 수단</h5>
      <PaymentOptionContainer>
        <PaymentOptionLabel>
          <PaymentOptionInput
            type="radio"
            name="paymentMethod"
            value="credit-card-simple"
            checked={paymentMethod === 'credit-card-simple'}
            onChange={handlePaymentMethodChange}
          />
          신용카드 간편결제
        </PaymentOptionLabel>
        <PaymentOptionLabel>
          <PaymentOptionInput
            type="radio"
            name="paymentMethod"
            value="credit-card-general"
            checked={paymentMethod === 'credit-card-general'}
            onChange={handlePaymentMethodChange}
          />
          신용카드 일반결제
        </PaymentOptionLabel>
        <PaymentOptionLabel>
          <PaymentOptionInput
            type="radio"
            name="paymentMethod"
            value="bank-transfer"
            checked={paymentMethod === 'bank-transfer'}
            onChange={handlePaymentMethodChange}
          />
          계좌이체
        </PaymentOptionLabel>
      </PaymentOptionContainer>

      <div className="my-3 text-muted">
        재충전 이후 거래 이력이 없는 경우, 충전일로부터 최대 7일 내 온라인에서 충전 취소가 가능합니다.
      </div>

      <h5>충전 후 예상 총 카드 잔액</h5>
      <div className="my-3">
        <h2 style={{fontWeight:'bold'}}>
          {(Number(nowRemainPay) + Number(amount === 'custom' ? customAmount : amount)).toLocaleString()}
          원
        </h2>
      </div>

      <RechargeButton onClick={handleRecharge}>충전하기</RechargeButton>
    </Container>
  );
}

export default ChargePayment;
