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
    const [selectDate, setSelectDate] = useState(null); // 선택한 그래프 예측일(월)
    const [selectRate, setSelectRate] = useState(null); // 선택한 예측 정보
    
    // DatePicker
    // const [startDate, setStartDate] = useState(new Date());
    const [cleared, setCleared] = React.useState(false);
    const [selectReserve, setSelectReserve] = useState(null); // 날짜 포맷 적용 X
    const [reserveDate, setReserveDate] = useState(""); // 예약 날짜 (날짜 포맷 적용 O)
    
    const [focused, setFocused] = useState(false);
    const [inputWidth, setInputWidth] = useState(150); // 글자 너비 기본값 (15px)
    const [selectCur, setSelectCur] = useState(0); // 사용자가 입력한 KRW
    const [selectAmount, setSelectAmount] = useState(0); // 예상 원화
    

    // 환율 예측 그래프 날짜(월) 선택
    const showRateHandle = (event) => {
        const showDate = event.currentTarget.value;
        console.log("그래프 날짜(월)", showDate);

        // 월 선택이므로 잘라서 비교
        setSelectDate(showDate.slice(0, 7));
        setIsView(!isView); // true
    };

    // 예측 정보 선택
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

    // DatePicker 선택한 날짜 포맷 변경 후 범위 확인
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

                    setCleared(false);
                    setReserveDate(""); // 선택 날짜 초기화

                    alert("추천 시작일과 종료일 사이의 날짜만 가능해요");
                }
            } else {
                setCleared(false);
                setReserveDate(""); // 선택 날짜 초기화
                
                alert("예측 정보를 선택해 주세요");
            }
        }
    };

    console.log("예약일 선택", reserveDate);

    // input 클릭 시 초기화
    const focusHandle = () => {
        if (!focused && selectRate) {
            setSelectCur("");
            setFocused(true);
        } 
    };

    // 숫자만 입력 가능
    const keyDownHandle = (event) => {
        // 숫자, 백스페이스, 삭제, 화살표 키 등만 허용
        const keys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

        // 숫자 키, 허용된 키가 아닐 경우
        if ((event.key < "0" || event.key > "9") && !keys.includes(event.key)) {
            event.preventDefault();
        }
    }

    // 입력한 값이 숫자일 때만 상태값 변경
    const numberHandle = (event) => {
        const inputVal = event.target.value;
        // 세 자리 수 마다 콤마 찍기 위해 타입 변환
        const numValue = Number(inputVal.replace(/[^0-9]/g, ""));

        setSelectCur(numValue.toLocaleString());
        setInputWidth(inputVal.length * 20); // 동적으로 input 길이 변경

        if (selectRate) {
            // 시가에 환율 우대 90% 적용
            const calculatRate = selectRate.rOpen * 0.90;

            // 예상 원화 계산
            const calculatAmt = numValue / calculatRate;
            setSelectAmount(calculatAmt);
        } 
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
                    <div className="set_rate_cur">
                        <label>
                            환전 금액
                            <input
                                type="text"
                                value={selectCur === 0 || selectCur === null ? "충전할 금액 입력" : selectCur}
                                onFocus={focusHandle}
                                onKeyDown={keyDownHandle}
                                onChange={numberHandle}
                                style={{ width: `${inputWidth}px`, color: selectCur === 0 || selectCur === null ? "#BFBFBF" : "black" }}
                                autoComplete="off"
                                disabled={!selectRate}
                            />
                        </label>
                    </div>
                    <br/>
                    <div>
                        <p>원화 예상 금액</p>
                        <p>{selectAmount}</p>
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