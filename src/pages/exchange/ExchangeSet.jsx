import { useLocation, useNavigate } from 'react-router-dom';
import 'assets/exchangeSet.css';
import ExchangeSetNull from './ExchangeSetNull';
import ExchangeSetList from './ExchangeSetList';
import { useState } from 'react';

function ExchangeSet(props) {
    // 이전 페이지에서 보낸 선택한 카드 정보
    const location = useLocation();
    const setCard = location.state.selectCard;
    const [reserveCard, setReserveCard] = useState(setCard);
    
    console.log("선택한 카드 정보 받기", setCard);
    console.log("선택한 카드 아이디 받기", reserveCard.cardId);

    const navi = useNavigate();

    // 자동 충전 설정 페이지
    const exchangeSetHandle = () => {
        navi("/exchange/setRate", { state: { reserveCard } });
    };

    return (
        <div className="contents">
            <div className="exchange_set_wrapper">
                <h3>
                    어카처에서 <span style={{ color: "#476EFF" }}>예측한 환율 시세</span>로 
                </h3>
                <h3>자동 충전해요</h3>
            </div>
            {/* 설정 없음 */}
            <ExchangeSetNull exchangeSetHandle={exchangeSetHandle}/>

            {/* 설정 있음 */}
            {/* <ExchangeSetList/> */}
        </div>
    );
}

export default ExchangeSet;