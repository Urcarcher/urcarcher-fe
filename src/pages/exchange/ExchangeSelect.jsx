import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExchangeSelect(props) {
    const navi = useNavigate();

    // 카드 선택 페이지로 이동
    const exchangeHandle = (event) => {
        // 카드 선택 후 버튼 종류에 따라 다른 페이지 보여주기 위해
        const btn = event.target.id;
       // console.log("충전 버튼 종류", btn);

        navi("/exchange/card", { state: { btn } });
    };

    return (
        <>
            <Header/>
            <div className="contents">
                <h2>어카처에서 편하게 환전하고 원할 때 바로 사용하세요!</h2>
                <button id="currency" onClick={exchangeHandle}>충전하기</button>

                <h2>이런 환전 방법은 어떠세요?</h2>
                <button id="set" onClick={exchangeHandle}>목표환율 자동충전</button>
            </div>
            <Footer/>
        </>
    );
}

export default ExchangeSelect;