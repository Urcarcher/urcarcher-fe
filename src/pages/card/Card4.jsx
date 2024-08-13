import React, { useState } from 'react';

const CardForm = () => {
  const [address, setAddress] = useState('');

  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 폼 제출 로직을 추가하세요
    console.log({
      address,
      date,
    });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
      <h3>카드 수령정보를 입력해주세요.</h3>
        <div style={{ marginBottom: '16px' }}>
          <label>
            카드 수령처
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="주소 검색"
              style={{ width: '100%', padding: '8px', marginTop: '8px' }}
            />
          </label>
          <p style={{ fontSize: '12px', color: '#888' }}>
            ※ 학교 또는 학원에서는 카드를 받을 수 없습니다. 반드시 집 주소로 입력해 주세요.
          </p>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>
            날짜 선택
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '8px' }}
            />
          </label>
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px' }}>
          다음
        </button>
      </form>
    </div>
  );
};

export default CardForm;
