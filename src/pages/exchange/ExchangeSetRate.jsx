import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'assets/exchangeSetRate.css';
import DatePicker from "react-datepicker";

function ExchangeSetRate(props) {
    const location = useLocation();
    const setCard = location.state.reserveCard;
    const [exCard, setExCard] = useState(setCard);

    console.log("예약 카드 정보 받기", setCard);
    console.log("예약 카드 아이디 받기", exCard.cardId);
    
    // 예측 환율 임시 data
    const rate = [
        // 예측 날짜, 시가, 여행 추천 시작일, 여행 추천 종료일
        { rDate: "2024-08-24", rOpen: 1332.50, rStart: "2024-08-21", rEnd: "2024-08-27" },
        { rDate: "2024-08-26", rOpen: 1330.30, rStart: "2024-08-22", rEnd: "2024-08-27" }
    ];

    const [isView, setIsView] = useState(false); // toggle 효과
    const [rateList, setRateList] = useState(rate);
    const [selectDate, setSelectDate] = useState(null); // 조회중인 예측일

    // 예측일 선택
    const showRateHandle = (event) => {
        const showDate = event.currentTarget.value;
        console.log(showDate);

        // 월 선택이므로 잘라서 비교
        setSelectDate(showDate.slice(0, 7));
        setIsView(!isView); // true
    };

    return (
        <div className="contents">
            <div className="set_rate_wrapper">
                <h3>예약 환율 지정</h3>
                <div>
                    <p>환율 예측 그래프</p>
                    <div>
                        {/* 그래프 리스트 반복문 있다 가정하고 버튼 value 넣기 */}
                        <button value={"2024-08-01"} onClick={showRateHandle}>그래프에 있는 환율 예측일</button>
                    </div>
                </div>

                <div className="set_rate_table" style={{ height: isView === true ? "250px" : "0px"}}>
                    {rateList.map((rate) => (
                        <div key={rate.rDate}
                            className="set_rate_list"
                            style={{ display: rate.rDate.slice(0, 7) === selectDate && isView === true ? "block" : "none" }}
                        >
                            <p className="set_rate_left">예측일</p>
                            <p className="set_rate_right">{rate.rDate}</p>
                            <p className="set_rate_left">시가</p>
                            <p className="set_rate_right">{rate.rOpen}</p>
                            <p className="set_rate_left">여행 추천 시작일</p>
                            <p className="set_rate_right">{rate.rStart}</p>
                            <p className="set_rate_left">여행 추천 종료일</p>
                            <p className="set_rate_right">{rate.rEnd}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <h5>설정한 예약일에 자동으로 환전해 드려요</h5>
                </div>
                <div className="set_rate_value">
                    <div>
                        <p>환전 예약일</p>
                        <p>사용자가 시작일 ~ 종료일 사이 지정</p>
                    </div>
                    <br/>
                    <div>
                        <label>
                            환전 금액
                            <input placeholder="충전할 금액 입력"/>
                        </label>
                    </div>
                    <br/>
                    <div>
                        <p>원화 예상 금액</p>
                        <p>사용자가 입력한 금액 별 계산</p>
                    </div>
                    <div>
                        <button>설정하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExchangeSetRate;