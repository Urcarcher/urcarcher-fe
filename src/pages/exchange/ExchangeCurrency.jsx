import axios from 'axios';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/exchangeCurrency.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { ExchangeContext } from './exportContext';

function ExchangeCurrency(props) {
    const [exchangeCurInfo, setExchangeCurInfo] = useState({});
    const [wscData, setWscData] = useState();
    const cwsc = useRef(null);

    // 이전 페이지에서 보낸 선택한 카드 정보
    const location = useLocation();
    // const exCard = { ...location.state };
    const cardId = location.state.selectCard;
    const [exCard, setExCard] = useState(cardId);

    console.log("선택한 카드 정보 받기", exCard);
    console.log("선택한 카드 아이디 받기", exCard.id);
    console.log(typeof exCard);
    
    const [nation, setNation] = useState("USD"); // 사용자 국적 임시 data

    const [focused, setFocused] = useState(false);
    const [inputWidth, setInputWidth] = useState(15); // 글자 너비 기본값 (15px)
    const [currency, setCurrency] = useState(0); // 사용자가 입력한 KRW
    const [calculateAmount, setCalculateAmount] = useState(0); // 예상 원화

    const navi = useNavigate();

    // 처음 렌더링 될 때만 웹소켓 연결
    useEffect(()=>{
        wsConnect();
    }, []);

    // 웹소켓 연결 설정
    const wsConnect = useCallback(()=>{
        cwsc.current = new WebSocket("wss://urcarcher-local.kro.kr:8443/realtime/rate");

        cwsc.current.onmessage = (message) => {
            const rcvData = JSON.parse(message.data);
            setWscData(rcvData);
        };
    });
    // 웹소켓 연결 종료 (컴포넌트가 화면에서 사라질 때)
    //     return () => {
    //         if (socket.current) {
    //             socket.current.close();
    //         }
    //     };
    // }, []);

    useEffect(() => {
        if (wscData !== undefined) {
            const id = wscData.exchangeType;
            const updateExchangeCurInfos = { ...exchangeCurInfo, [id]: wscData };
            setExchangeCurInfo(updateExchangeCurInfos);
        }
    }, [wscData, exchangeCurInfo]);

    // input 클릭 시 초기화
    const focusHandle = () => {
        if (!focused) {
            setCurrency("");
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
        const numCur = Number(inputVal.replace(/[^0-9]/g, ""));

        setCurrency(numCur.toLocaleString());
        setInputWidth(inputVal.length * 10); // 동적으로 input 길이 변경

        if (exchangeCurInfo[nation] && exchangeCurInfo[nation].rate && exchangeCurInfo[nation].buy) {
            // 쉼표 제거 후 문자열을 숫자로 변환 (NaN 발생)
            const nationRate = parseFloat(exchangeCurInfo[nation].rate.replace(/,/g, "")); // 매매기준율
            const buyRate = parseFloat(exchangeCurInfo[nation].buy.replace(/,/g, "")); // 현찰 살 때

            // 환율 우대 90% 적용된 예상 원화 계산
            // 매매기준율 + (현찰 살 때 - 매매기준율) * (1 - 환율 우대율)
            if (!isNaN(nationRate) && !isNaN(buyRate)) {
                const discountRate = 0.9;
                const appliedRate = nationRate + (buyRate - nationRate) * (1 - discountRate);
                const calculatAmt = (numCur / appliedRate).toFixed(2); // 소수점 두 자리까지

                setCalculateAmount(calculatAmt); // 계산된 예상 원화
            } else {
                setCalculateAmount(0); // 환율 정보 없음
            }
        } else {
            setCalculateAmount(0); // 환율 정보 없음
        }
    };

    // 환율 우대 90% 적용해서 계산
    // 매매기준율 + (살 때 환율 - 매매기준율) * (1 - 환율 우대율)
    /*
    const exchangeCurHandle = (amount, rate, buy) => {
        const discountRate = 0.9;
        const exchange = rate + (buy - rate) * (1 - discountRate);
        const money = amount / exchange;

        return money.toFixed(2); // 소수점 두 자리까지
    };
    */

    // 환전 내역에 insert
    const insertHandle = () => {
        if (!currency || parseFloat(currency.replace(/,/g, "")) <= 0) {
            alert("0원 이상의 충전하실 금액을 입력해 주세요");
            return;
        }

        if (!exchangeCurInfo || !exchangeCurInfo[nation] || !exchangeCurInfo[nation].rate) {
            alert("환율 정보를 조회하는 중입니다. 다시 시도해 주세요");
            return;
        }
    
        if (!calculateAmount || parseFloat(calculateAmount) <= 0) {
            alert("예상 원화 금액을 계산할 수 없습니다. 다시 시도해 주세요");
            return;
        }

        const data = {
            cardId: exCard.id,
            exRate: parseFloat(exchangeCurInfo[nation].rate.replace(/,/g, "")), // 적용환율
            exCur: parseFloat(currency.replace(/,/g, "")), // 환전금액
            exPay: parseFloat(calculateAmount) // 결제금액
        };
    
        axios.post("https://urcarcher-local.kro.kr:8443/api/exchange/insert", data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            console.log("바로 충전 성공", response.data);
            
            setExchangeCurInfo(response.data);
            navi("/exchange/success", {
                state: {
                    successMsg: response.data,
                    successData: data,
                    successPlus: exCard.balance + (parseFloat(currency.replace(/,/g, "")))
                }
            });
        })
        .catch(error => {
            console.error("바로 충전 실패", error);
        });
    };

    return (
        <div className="contents">
            <h2>얼마를 충전할까요?</h2>
            <h3>대한민국 KRW</h3>
            <div className="inputDiv">
                <input
                    name="exCur"
                    type="text"
                    value={currency}
                    onKeyDown={keyDownHandle}
                    onChange={numberHandle}
                    onFocus={focusHandle}
                    style={{ width: `${inputWidth}px` }}
                />원
            </div>

            <h3>{nation} (사용자의 국적)</h3>
            <p>{calculateAmount}달러</p>
            {exchangeCurInfo[nation] ? 
            (<p>1달러 = {exchangeCurInfo[nation].rate}원</p>) : (<p>환율 정보를 조회하는 중입니다</p>)}

            <p>환율우대</p>
            <div>
                <span>적용환율</span>
                {exchangeCurInfo[nation] ? 
                (<span>KRW {exchangeCurInfo[nation].rate} = 1달러</span>) : (<span>환율 정보를 조회하는 중입니다</span>)}
            </div>
            <br/>
            <div>
                <span>우대사항</span>
                <span>환율우대 90%</span>
            </div>
            <br/>
            <div>
                <span>원화 예상 금액</span>
                <span>{calculateAmount}달러</span>
            </div>
            <br/>
            <button onClick={insertHandle}>충전하기</button>
        </div>
    );
}

export default ExchangeCurrency;