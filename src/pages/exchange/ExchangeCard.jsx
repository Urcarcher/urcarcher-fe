import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ExchangeCard(props) {
    // 이전 페이지에서 보낸 버튼 정보
    const location = useLocation();
    const { btn } = location.state || {};
    // console.log("선택한 충전 버튼 종류", btn);
    
    const navi = useNavigate();

    // 사용자의 카드 목록 임시 data
    const userCard = [
        { id: 1, balance: 10000, type: "선불카드" },
        { id: 2, balance: 50000, type: "선불카드" },
        { id: 3, balance: 0, type: "신용카드" },
    ];

    const [cardList, setCardList] = useState(userCard);
    const [selectedCard, setSelectedCard] = useState(null);

    // 카드 선택
    const cardSelecthandle = (card) => {
        console.log("선택한 카드 정보", card);
        setSelectedCard(card);
    };

    // 취소 버튼
    const backHandle = () => {
        navi(-1);
    };

    // 다음 버튼 => 선택한 버튼 종류 별 페이지 이동
    const nextHandle = () => {
        if (selectedCard) {
            let nextPage = "";
            
            if (btn === "currency") {
                // 바로충전
                nextPage = "/exchange/currency";
            } else if (btn === "set") {
                // 자동충전
                nextPage = "/exchange/set";
            }
            navi(nextPage, { state: { selectedCard } });
        } else {
            alert("카드를 선택해주세요");
        }
    };

    return (
        <div>
            <h2>어떤 카드에 충전할까요?</h2>
            <div>
                {cardList.map((card) => (
                    <div key={card.id}>
                        <p>{card.type}</p>
                        <p>잔액 {card.balance.toLocaleString()}원</p>
                        <button onClick={() => cardSelecthandle(card)}>선택</button>
                    </div>
                ))}
            </div>
            
            <button onClick={backHandle}>취소</button>
            <button onClick={nextHandle}>다음</button>
        </div>
    );
}

export default ExchangeCard;