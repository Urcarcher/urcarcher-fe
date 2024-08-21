import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'assets/exchangeSetRate.css';

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

function ExchangeSetRate(props) {
    // 이전 페이지에서 보낸 선택한 카드 정보
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
    const [selectDate, setSelectDate] = useState(null); // 조회 할 그래프 예측일 (월)
    const [selectRate, setSelectRate] = useState(null); // 선택한 예측 정보
    const [selectCurDate, setSelectCurDate] = useState(null);

    // DatePicker
    // const [startDate, setStartDate] = useState(new Date());
    const [cleared, setCleared] = React.useState(false);
    const [selectReserve, setSelectReserve] = useState(null);
    const [reserveDate, setReserveDate] = useState("");

    // 환율 예측 그래프 날짜 선택
    const showRateHandle = (event) => {
        const showDate = event.currentTarget.value;
        console.log("그래프 month", showDate);

        // 월 선택이므로 잘라서 비교
        setSelectDate(showDate.slice(0, 7));
        setIsView(!isView); // true
    };

    // 예측일 정보 선택
    const selectRateHandle = (rate) => {
        console.log("선택한 예측 정보", rate);
        setSelectRate(rate);
    };

    // DatePicker 날짜 선택 시 지우기 버튼 생성
    React.useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
                setReserveDate("");
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => {};
    }, [cleared]);

    // DatePicker 선택한 날짜 포맷 변경
    const dateChangeHandle = (date) => {
        setSelectReserve(date);

        if (date) {
            // setReserveDate(dayjs(date).format("YYYY-MM-DD"));
            const formatDate = dayjs(date).format("YYYY-MM-DD");
            setReserveDate(formatDate);

            // 날짜 객체로 변환
            const reserveDateObj = dayjs(formatDate);

            if (selectRate) {
                const startDateObj = dayjs(selectRate.rStart); // 추천 시작일
                const endDateObj = dayjs(selectRate.rEnd); // 추천 종료일

                if (reserveDateObj.isBetween(startDateObj, endDateObj, null, "[]")) {
                    console.log("범위 내에 있는 날짜");
                } else {
                    console.log("범위 밖에 있는 날짜");
                    alert("추천 시작일과 종료일 사이의 날짜만 가능해요");

                    setCleared(false);
                    setReserveDate("");
                }
            } else {
                alert("예측 정보를 선택해 주세요");
                
                setCleared(false);
                setReserveDate("");
            }
        }
    };

    console.log("예약일 선택", reserveDate);

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
                            <button onClick={() => selectRateHandle(rate)}>선택</button>
                        </div>
                    ))}
                </div>

                <div>
                    <h5>설정한 예약일에 자동으로 환전해 드려요</h5>
                </div>
                <div className="set_rate_value">
                    <div>
                        <p>환전 예약일</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="환전 예약일 선택"
                                showDaysOutsideCurrentMonth
                                slotProps={{
                                    textField: {
                                        helperText: "당일 예약 불가",
                                        clearable: true, onClear: () => setCleared(true),
                                        size: "small"
                                    },
                                }}
                                // selected={startDate}
                                value={selectReserve}
                                onChange={(date) => dateChangeHandle(date)}
                                dateFormat="YYYY-MM-DD"
                            />
                        </LocalizationProvider>
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