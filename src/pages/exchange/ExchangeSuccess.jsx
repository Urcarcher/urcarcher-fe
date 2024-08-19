import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

function ExchangeSuccess(props) {
    const location = useLocation();

    const exchangeMsg = location.state.successMsg; // 충전 금액 메세지
    const exchangeData = location.state.successData; // 충전한 카드 정보
    const exchangeBalance = location.state.successPlus; // 충전 후 잔액

    console.log("insert 메세지", exchangeMsg);
    console.log("insert 내역", exchangeData);
    console.log("잔액 확인", exchangeBalance);

    const navi = useNavigate();

    const homeHandle = () => {
        navi("/");
    };

    return (
        <>
            <div className="contents">
                <h2>{ exchangeMsg }</h2>
            </div>
            <div>
                <span>적용환율</span>
                <span>KRW { exchangeData.exRate } = 1달러</span>
            </div>
            <div>
                <span>환율우대</span>
                <span>90%</span>
            </div>
            <div>
                <span>결제금액</span>
                <span>{ exchangeData.exPay }달러</span>
            </div>
            <div>
                <span>출금계좌</span>
                <span>Citi Bank</span>
            </div>
            <div>
                <span>KRW 잔액</span>
                <span>￦ { exchangeBalance.toLocaleString() }</span>
            </div>
            <div>
                <button>내역보기</button>
                <button onClick={homeHandle}>확인</button>
            </div>
        </>
    );
}

export default ExchangeSuccess;