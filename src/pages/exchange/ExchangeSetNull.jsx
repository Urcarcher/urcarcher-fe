import React from 'react';
import 'assets/exchangeSetNull.css';
import chart from 'assets/chart.png'
import moneyStack from 'assets/money_stack.png'

function ExchangeSetNull(props) {
    return (
        <div className="ex_set_null_wrapper">
            <div className="ex_set_chart">
                <img src={chart} alt="그래프"/>
            </div>
            <div className="ex_set_money">
                <img src={moneyStack} alt="돈"/>
            </div>
            <div className="ex_set_null">
                <p>자동 충전 설정 내역이 없습니다</p>
            </div>
        </div>
    );
}

export default ExchangeSetNull;