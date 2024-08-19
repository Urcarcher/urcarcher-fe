import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExchangeSet(props) {
    // 이전 페이지에서 보낸 선택한 카드 정보
    const location = useLocation();
    const selectedCard = { ...location.state };

    console.log("선택한 카드 정보 받기", selectedCard);

    return (
        <div className="contents">
            <h2>원하는 환율이 되면 자동 충전돼요</h2>
        </div>
    );
}

export default ExchangeSet;