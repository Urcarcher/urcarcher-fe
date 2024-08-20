import { useNavigate } from 'react-router-dom';
import 'assets/exchangeSelect.css';
import exchangeCard from 'assets/card.png'
import exchangeMoney from 'assets/money.png'
import exchangeArrow from 'assets/arrow.png'

function ExchangeSelect(props) {
    const navi = useNavigate();

    // 카드 선택 페이지로 이동
    const exchangeHandle = (event) => {
        // 카드 선택 후 버튼 종류에 따라 다른 페이지 보여주기 위해
        const selectBtn = event.target.id;
        // alert(selectBtn);

        navi("/exchange/card", { state: { selectBtn } });
    };

    return (
        <div className="contents">
            <div className="exchange_wrapper">
                <div className="exchange_title">
                    <h5>어카처에서 편하게 환전하고</h5>
                    <h5>원할 때 바로 사용하세요!</h5>
                </div>
                <div className="exchange_content">
                    <p>모바일로 편하게 환전 하고</p>
                    <p>원하는 날, 원하는 곳에서 바로 사용</p>
                </div>
                <div className="exchange_card">
                    <img src={exchangeCard} alt="카드 아이콘"/>
                </div>
                <div className="exchange_money">
                    <img src={exchangeMoney} alt="돈 아이콘"/>
                </div>
                <div className="btn_wrapper">
                    <button className="info_btn">내역보기</button>
                    <button className="exchange_btn" id="currency" onClick={exchangeHandle}>충전하기</button>
                </div>
                <div className="set_title">
                    <h5>이런 환전 방법은 어떠세요?</h5>
                </div>
                <div className="select_wrapper">
                    <button className="set_btn" id="set" onClick={exchangeHandle}>
                        <p className="set_p">목표환율 자동충전</p>
                        <img src={exchangeArrow} alt="화살표 아이콘"/>
                        <p>목표 환율 도달 시 자동 환전해줘요</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExchangeSelect;