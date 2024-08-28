import Axios from 'axios';
import Preloader from 'bootstrap-template/components/Preloader';
import React, { useEffect, useState } from 'react';
import { Container, Form, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';


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
  font-weight: bold;
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
  border: 2px solid ${({ active }) => (active === 'true' ? '#476EFF' : '#cccccc')};
  background-color: ${({ active }) => (active === 'true' ? '#476EFF' : '#ffffff')};
  color: ${({ active }) => (active === 'true' ? '#ffffff' : '#333333')};
  font-weight: bold;
  width: 80px;
  height: 50px;
  text-align: center;
  line-height: 1.5;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active === 'true' ? '#365acb' : '#f1f1f1')};
    border-color: ${({ active }) => (active === 'true' ? '#365acb' : '#aaaaaa')};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

function ChargePayment(props) {

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


  const [nowRemainPay, setNowRemainPay] = useState(); 
  const [amount, setAmount] = useState('10000');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card-simple'); // 선택된 결제 수단 상태
  const [loading, setLoading] = useState(false);

  // 아임포트 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, []);

  // 금액 변경 핸들러
  const handleAmountChange = (value) => {
    if (value !== 'custom') {
      setAmount(value);
      setCustomAmount('');
    } else {
      setAmount(value);
    }
  };

  // 사용자 정의 금액 입력 핸들러
  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount('custom');
  };

  // 결제 수단 변경 핸들러
  const handlePaymentMethodChange = (e) => setPaymentMethod(e.currentTarget.value);

  // 충전 버튼 클릭 시 호출되는 함수
  const handleRecharge = () => {
    const IMP = window.IMP; // 아임포트 객체
    IMP.init('imp74154355'); // 아임포트 발급받은 고객사 식별코드

    const rechargeAmount = Number(amount === 'custom' ? customAmount : amount);
    let payMethod = 'card'; // 기본 결제 수단은 카드로 설정

    if (paymentMethod === 'bank-transfer') {
      payMethod = 'trans'; // 계좌이체로 설정
    } else if (paymentMethod === 'virtual-account') {
      payMethod = 'vbank'; // 가상계좌로 설정
    } else if (paymentMethod === 'credit-card-general') {
      payMethod = 'card'; // 신용카드 일반 결제
    }

    IMP.request_pay({
      pg: 'html5_inicis', // 사용 중인 PG사
      pay_method: payMethod, // 선택된 결제 수단에 따라 설정
      merchant_uid: `mid_${new Date().getTime()}`, // 가맹점에서 생성한 고유 주문 번호
      name: '어카처 선불카드 충전', // 결제명
      amount: rechargeAmount, // 결제 금액
      buyer_email: 'buyer@example.com', // 구매자 이메일
      buyer_name: '홍길동', // 구매자 이름
      buyer_tel: '010-1234-5678', // 구매자 전화번호
      buyer_addr: '서울특별시 강남구 삼성동', // 구매자 주소
      buyer_postcode: '123-456' // 구매자 우편번호
    }, function(response) {
      if (response.success) {
        // 결제 성공 시 서버에 결제 정보 전달
        Axios.post('/api/card/chargeamount', {
          cardId: String(props.card.cardId),
          cardBalance: String(rechargeAmount),
        })
          .then(() => {
            setTimeout(() => {
              setLoading(false);
              const updatedBalance = Number(nowRemainPay) + rechargeAmount;
              props.onPaymentSuccess(props.card.cardId, updatedBalance);
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
      } else {
        alert('결제에 실패하였습니다: ' + response.error_msg);
      }
    });
  };

  // 컴포넌트 마운트 시 사용자 잔액 불러오기
  useEffect(() => {

    const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


    Axios.get(`/api/card/get/${String(props.card.cardId)}`)
      .then((response) => {
        setNowRemainPay(response.data.cardBalance);
      })
      .catch((error) => {
        alert('사용자 잔액 불러오는데 에러가 발생했습니다');
      });
  }, [props.card.cardId]);

  return (
    <Container>
      {loading && <Preloader type={'pulse'} variant={'primary'} center={true} />}
      <h5>{t('RechargeAmount')}</h5>
      <br/>
      <CustomToggleButtonGroup>
        {['10000', '30000', '50000', '70000', '100000'].map((value) => (
          <CustomToggleButton
            key={value}
            active={(amount === value).toString()}  // boolean 값을 string으로 변환하여 전달
            onClick={() => handleAmountChange(value)}
          >
            {parseInt(value, 10).toLocaleString()}+ " " + {t('Won')}
          </CustomToggleButton>
        ))}
        <CustomToggleButton
          active={(amount === 'custom').toString()}  // boolean 값을 string으로 변환하여 전달
          onClick={() => handleAmountChange('custom')}
        >
          {t('EnterManually')}
        </CustomToggleButton>
      </CustomToggleButtonGroup>
      {amount === 'custom' && (
        <FormControl
          type="number"
          placeholder={t('EnterAmount')}
          value={customAmount}
          onChange={handleCustomAmountChange}
          className="mt-2"
        />
      )}
      <br/>
      <br/>
      <h5>{t('PaymentMethod')}</h5>
      <PaymentOptionContainer>
        <PaymentOptionLabel>
          <PaymentOptionInput
            type="radio"
            name="paymentMethod"
            value="credit-card-simple"
            checked={paymentMethod === 'credit-card-simple'}
            onChange={handlePaymentMethodChange}
          />
          {t('CreditCardPayment')}
        </PaymentOptionLabel>
        {/* <PaymentOptionLabel>
          <PaymentOptionInput
            type="radio"
            name="paymentMethod"
            value="credit-card-general"
            checked={paymentMethod === 'credit-card-general'}
            onChange={handlePaymentMethodChange}
          />
          어카처 카드 결제
        </PaymentOptionLabel> */}
        <PaymentOptionLabel>
          <PaymentOptionInput
            type="radio"
            name="paymentMethod"
            value="bank-transfer"
            checked={paymentMethod === 'bank-transfer'}
            onChange={handlePaymentMethodChange}
          />
          {t('BankTransfer')}
        </PaymentOptionLabel>
        <PaymentOptionLabel>
          <PaymentOptionInput
            type="radio"
            name="paymentMethod"
            value="virtual-account"
            checked={paymentMethod === 'virtual-account'}
            onChange={handlePaymentMethodChange}
          />
          {t('DirectDeposit')}
        </PaymentOptionLabel>
      </PaymentOptionContainer>

      <div className="my-3 text-muted">
      {t('CancelPayment')}
      </div>

      <h5>{t('AfterRecharge')}</h5>
      <div className="my-3">
        <h2 style={{fontWeight:'bold'}}>
          {(Number(nowRemainPay) + Number(amount === 'custom' ? customAmount : amount)).toLocaleString()}
          +" " +{t('Won')}
        </h2>
      </div>

      <RechargeButton onClick={handleRecharge}>{t('Recharge')}</RechargeButton>
    </Container>
  );
}

export default ChargePayment;
