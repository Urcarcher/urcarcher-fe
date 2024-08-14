import React, { useState } from 'react';
import { useCardContext } from './CardContext';
import { useNavigate } from 'react-router-dom';


function Card5(props) {
  const [accountNumber, setAccountNumber] = useState(''); // 계좌번호
  const [bank, setBank] = useState(''); // 결제은행
  const [paymentDate, setPaymentDate] = useState(''); // 결제날짜
  const [cardPassword, setCardPassword] = useState(''); // 카드 비밀번호 
  const {produceCardOffer, setProduceCardOffer} = useCardContext();

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 폼 제출 로직을 추가하세요
    console.log({
      accountNumber,
      bank,
      paymentDate,
      cardPassword,
    });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '16px' }}>
      <form onSubmit={handleSubmit}>
        <h3>결제 정보를 입력해 주세요</h3>
        <div style={{ marginBottom: '16px' }}>
          <label>
            계좌번호
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="10020634******"
              style={{ width: '100%', padding: '8px', marginTop: '8px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>
            결제은행
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '8px' }}
            >
              <option value="" disabled>선택하세요</option>
              <option value="우리은행">우리은행</option>
              <option value="국민은행">국민은행</option>
              <option value="신한은행">신한은행</option>
              <option value="하나은행">하나은행</option>
              <option value="농협은행">농협은행</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>
            결제일
            <select
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '8px' }}
            >
              <option value="" disabled>선택하세요</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day.toString().padStart(2, '0')}>
                  {day.toString().padStart(2, '0')}일
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: '16px', fontSize: '12px', color: '#888' }}>
          결제일별 이용기간 <br />
          월세/학원: 전결제일 18일 - 전결제 17일 <br />
          단기카드대출(현금서비스): 전결제 2일 - 전결제 1일
        </div>
        <h3>카드 비밀번호를 설정해 주세요</h3>
        <div style={{ marginBottom: '16px' }}>
          <label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <input
                type="password"
                value={cardPassword}
                onChange={(e) => setCardPassword(e.target.value)}
                placeholder="●●●●"
                style={{ width: '50%', padding: '8px' }}
                maxLength="4"
              />
            </div>
          </label>
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        onClick={()=>{

          setProduceCardOffer(prevState => ({
            ...prevState,
            payment_bank:bank,
            payment_date:paymentDate,
            card_account:accountNumber,
            card_password:cardPassword
        }));
        
        setTimeout(()=>navigate('/card6'),300);

        }}>
          다음
        </button>
      </form>
    </div>
  );
}

export default Card5;
