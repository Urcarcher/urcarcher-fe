import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ExchangeCurrency(props) {
    // 이전 페이지에서 보낸 선택한 카드 정보
    const location = useLocation();
    const selectedCard = { ...location.state };
    // console.log("선택한 카드 정보 받기", selectedCard);

    const [currency, setCurrency] = useState(0);
    const [focused, setFocused] = useState(false);
    const [inputWidth, setInputWidth] = useState(10); // 글자 너비 기본값 (16px)

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
            <input
                type="text"
                value={currency.toLocaleString()}
                onKeyDown={keyDownHandle}
                onChange={numberHandle}
                onFocus={focusHandle}
                style={{ width: `${inputWidth}px`, textAlign : "right", border : "none" }}
                placeholder="충전할 금액 입력"
            />원

            <h3>미국 UDS (사용자의 국적)</h3>
            1달러 = 1,370.90원

            <button>충전하기</button>
        </div>
    );
}

export default ExchangeCurrency;