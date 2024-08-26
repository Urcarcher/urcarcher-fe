import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'assets/exchangeSetRate.css';

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import axios from 'axios';
import RateGraph from './RateGraph';
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

function ExchangeSetRate(props) {
    // 이전 페이지에서 보낸 선택한 카드 정보
    const location = useLocation();
    const setCard = location.state.reserveCard;
    const [exCard, setExCard] = useState(setCard);

    console.log("예약 카드 정보 받기", setCard);
    console.log("예약 카드 아이디 받기", exCard.cardId);

    const navi = useNavigate();
    
    const [reserveList, setReserveList] = useState([]); // 사용자 환전 예약 정보
    const [nation, setNation] = useState("USD"); // 사용자 국적 임시 data
    
    // 예측 환율 임시 data
    const rate = [
        // 예측 날짜, 시가, 여행 추천 시작일, 여행 추천 종료일 (국가 별 예측 정보가 있다고 가정)
        { rDate: "2024-08-24", rOpen: "1336.40", rStart: "2024-08-21", rEnd: "2024-08-27", rNation: "USD" },
        { rDate: "2024-08-26", rOpen: "1330.30", rStart: "2024-08-22", rEnd: "2024-08-27", rNation: "USD" }
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
    // const [inputWidth, setInputWidth] = useState(295); // 글자 너비 기본값 (15px)
    const [selectCur, setSelectCur] = useState(0); // 사용자가 입력한 KRW
    const [selectAmount, setSelectAmount] = useState(0); // 예상 원화
    

    // 환율 예측 그래프 날짜(월) 선택
    const showRateHandle = (event) => {
        const showDate = event.currentTarget.value;
        console.log("그래프 날짜(월)", showDate);
        // alert("확인");

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
    useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
                setReserveDate(null);
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
            
            const reserveDateObj = dayjs(formatDate); // 날짜 객체로 변환
            const today = dayjs().startOf("day"); // 오늘 날짜 00:00:00

            if (reserveDateObj.isSame(today, "day")) {
                setCleared(true);
                setReserveDate(null); // 선택 날짜 초기화

                alert("당일 예약은 불가능해요");
                return;
            }

            if (selectRate) {
                const startDateObj = dayjs(selectRate.rStart); // 추천 시작일
                const endDateObj = dayjs(selectRate.rEnd); // 추천 종료일

                if (reserveDateObj.isBetween(startDateObj, endDateObj, null, "[]")) {
                    console.log("범위 내에 있는 날짜");
                } else {
                    console.log("범위 밖에 있는 날짜");

                    setCleared(true);
                    setReserveDate(null); // 선택 날짜 초기화

                    alert("추천 시작일과 종료일 사이의 날짜만 가능해요");
                    return;
                }
            } else {
                setCleared(true);
                setReserveDate(null); // 선택 날짜 초기화
                
                alert("예측 정보를 먼저 선택해 주세요");
                return;
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
        // setInputWidth(inputVal.length * 20); // 동적으로 input 길이 변경

        if (selectRate) {
            // 예상 원화 계산
            const calculatAmt = (numValue / selectRate.rOpen).toFixed(2);
            setSelectAmount(calculatAmt);
        } else {
            setSelectAmount(0);
        }
    };

    // 환전 예약 isnert
    const insertHandle = () => {
        if (!selectRate) {
            alert("예측 정보 선택 후 예약 정보를 설정해 주세요");
            return;
        }
        
        if (!reserveDate) {
            alert("환전 예약일을 선택해 주세요");
            return;
        }
        
        if (!selectAmount) {
            alert("0원 이상의 충전하실 금액을 입력해 주세요");
            return;
        }

        const data = {
            cardId: exCard.cardId,
            setRate: parseFloat(selectRate.rOpen.replace(/,/g, "")), // 예약환율
            setCur: parseFloat(selectCur.replace(/,/g, "")), // 예약금액
            setPay: parseFloat(selectAmount), // 결제금액
            setDate: reserveDate, // 예약일
            setStatus: "N"
        };

        axios.post("/api/exchange/rate/insert", data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            console.log("환전 예약 성공", response.data);
            setReserveList(response.data);

            navi("/exchange/set/success", {
                state: {
                    successMsg: response.data,
                    successData: data,
                }
            });
        })
        .catch(error => {
            console.log("환전 예약 실패", error);
        });
    };

    return (
        <div className="contents">
            <div className="set_rate_wrapper">
                <h3>예약 환율 지정</h3>
                <div>
                    <RateGraph onClick={showRateHandle}/>
                    <div>
                        {/* 그래프 리스트 반복문 있다 가정하고 버튼 value 넣기 */}
                        <button value={"2024-08-01"} onClick={showRateHandle}>그래프에 있는 환율 예측일</button>
                    </div>
                </div>

                <div className="set_rate_table" style={{ height: isView === true ? "600px" : "0px"}}>
                    <h5>예약할 환율을 선택해 주세요</h5>
                    {rateList.map((rate) => (
                        <div key={rate.rDate}
                            className={selectRate?.rDate === rate.rDate ? "set_rate_list_select" : "set_rate_list"}
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
                            <button className="set_rate_btn" onClick={() => selectRateHandle(rate)}>선택</button>
                        </div>
                    ))}
                </div>

                <div>
                    <h5>설정한 예약일에 자동으로 환전해 드려요</h5>
                </div>
                <div className="set_rate_value">
                    <div className="set_rate_date_box">
                        <p className="set_rate_box_left">* 여행 추천 시작일 ~ 종료일 사이 예약일 선택</p>
                        <div className="set_rate_option">
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
                                    value={selectReserve}
                                    onChange={(date) => dateChangeHandle(date)}
                                    minDate={dayjs().add(1, "day").startOf("day")}
                                    dateFormat="YYYY-MM-DD"
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="set_rate_cur">
                        <p className="set_rate_box_left">
                            * 환전 금액
                        </p>
                        <div className="set_cur_option">
                            <input
                                type="text"
                                value={selectCur === 0 || selectCur === null ? "환율 선택 후 금액 입력 가능" : selectCur}
                                onFocus={focusHandle}
                                onKeyDown={keyDownHandle}
                                onChange={numberHandle}
                                // style={{ width: `${inputWidth}px`, color: selectCur === 0 || selectCur === null ? "#BFBFBF" : "black" }}
                                style={{ color: selectCur === 0 || selectCur === null ? "#BFBFBF" : "black" }}
                                autoComplete="off"
                                disabled={!selectRate}
                                />
                        </div>
                    </div>
                    <div className="set_rate_pay">
                        <p className="set_rate_box_left">* 예상 원화 금액
                            <span className="set_rate_pay_text">{selectAmount}</span>
                        </p>
                    </div>
                    <div className="set_rate_fix_box">
                        <button className="set_rate_fix_btn" onClick={insertHandle}>설정하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExchangeSetRate;