import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/exchangeCurrency.css';

function ExchangeCurrency(props) {
    const [exchangeCurInfo, setExchangeCurInfo] = useState({});
    const [wscData, setWscData] = useState();
    const cwsc = useRef(null);

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

    // 이전 페이지에서 보낸 선택한 카드 정보
    const location = useLocation();
    const selectedCard = { ...location.state };
    console.log("선택한 카드 정보 받기", selectedCard);

    const [currency, setCurrency] = useState(0);
    const [focused, setFocused] = useState(false);
    const [inputWidth, setInputWidth] = useState(15); // 글자 너비 기본값 (15px)

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
        // 세 자리 수 마다 콤마 찍기 위해 숫자로 변경
        const numCur = Number(inputVal.replace(/[^0-9]/g, ""));

        setCurrency(numCur.toLocaleString());
        setInputWidth(inputVal.length * 10); // 동적으로 input 길이 변경
    };

    return (
        <div>
            <h2>얼마를 충전할까요?</h2>
            <h3>대한민국 KRW</h3>
            <div className="inputDiv">
                <input
                    type="text"
                    value={currency.toLocaleString()}
                    onKeyDown={keyDownHandle}
                    onChange={numberHandle}
                    onFocus={focusHandle}
                    style={{ width: `${inputWidth}px` }}
                />원
            </div>

            <h3>미국 USD (사용자의 국적)</h3>
            {exchangeCurInfo["JPY"] ? 
            (<p>1달러 = {exchangeCurInfo["JPY"].rate}원</p>) : (<p>환율 정보를 조회하는 중입니다</p>)}

            <button>충전하기</button>
        </div>
    );
}

export default ExchangeCurrency;