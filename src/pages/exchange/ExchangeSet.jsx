import { useLocation } from 'react-router-dom';
import 'assets/exchangeSet.css';
import ExchangeSetNull from './ExchangeSetNull';
import ExchangeSetList from './ExchangeSetList';

function ExchangeSet(props) {
    // 이전 페이지에서 보낸 선택한 카드 정보
    const location = useLocation();
    const selectedCard = { ...location.state };

    console.log("선택한 카드 정보 받기", selectedCard);

    return (
        <div className="contents">
            <div className="exchange_set_wrapper">
                <h3>
                    <span style={{ color: "#476EFF" }}>환율 예측 시세</span>를 기반으로 
                </h3>
                <h3>자동 충전해요</h3>
            </div>
            <ExchangeSetNull/>
            {/* <ExchangeSetList/> */}
            <div className="exchange_set_btn_wrapper">
                <button className="exchange_set_btn">자동충전 설정하기</button>
            </div>
        </div>
    );
}

export default ExchangeSet;