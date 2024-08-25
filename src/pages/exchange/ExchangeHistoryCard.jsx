import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'assets/exchangeCard.css';

function ExchangeHistoryCard(props) {
    const navi = useNavigate();

    const [cardList, setCardList] = useState([]);
    const [selectCard, setSelectCard] = useState(null);

    // 카드 리스트 조회
    useEffect(() => {
        if (!cardList) {
            alert("카드를 먼저 발급받아주세요");
            return;
        }

        // axios.get("https://urcarcher-local.kro.kr:8443/api/exchange/list")
        axios.get("/api/exchange/list")
            .then((response) => {
                setCardList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("카드 조회 실패", error);
            });
    }, []);

    // console.log("카드 리스트", cardList);

    // 카드 선택
    const cardSelectHandle = (card) => {
        console.log("선택한 카드 정보", card);
        setSelectCard(card);
    };

    // 취소 버튼
    const backHandle = () => {
        navi(-1);
    };

    const nextHandle = () => {
        if (selectCard) {
            navi("/exchange/history", { state: { selectCard } });
        } else {
            alert("조회하실 카드를 선택해 주세요");
        }
    }

    return (
        <div className="contents">
            <div className="exCard_title">
                <h3>
                    어떤 카드를 <span style={{ color: "#476EFF" }}>조회</span>할까요?
                </h3>
            </div>
            <div className="exCard_wrapper">
                {/* null, undefined 아닌지 확인 후 id 비교 */}
                {cardList.map((card) => (
                    <div key={card.cardId}
                        className={selectCard?.cardId === card.cardId ? "choice" : "unChoice"}
                        style={{ display: card.cardUsage === "선불카드" ? "block" : "none" }}
                    >
                        <p>{card.cardUsage}</p>
                        <p className="exCard_balance">잔액 {card.cardBalance.toLocaleString()}원</p>
                        <p className="exCard_text">{card.cardNumber}</p>
                        <button className="exCard_btn" onClick={() => cardSelectHandle(card)}>선택</button>
                    </div>
                ))}
            </div>
            <div className="exCard_btn_container">
                <button className="exCard_back_btn" onClick={backHandle}>취소</button>
                <button className="exCard_next_btn" onClick={nextHandle}>다음</button>
            </div>
        </div>
    );
}

export default ExchangeHistoryCard;