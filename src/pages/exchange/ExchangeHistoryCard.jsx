import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'assets/exchangeCard.css';

function ExchangeHistoryCard(props) {
    const navi = useNavigate();

    const [cardList, setCardList] = useState([]);
    const [selectCard, setSelectCard] = useState(null);

    const [loading, setLoading] = useState(true); // 카드 리스트 로딩 상태
    const [typeCheck, setTypeCheck] = useState(false); // 선불 카드 확인

    // 카드 리스트 조회
    useEffect(() => {
        // axios.get("https://urcarcher-local.kro.kr:8443/api/exchange/list")
        axios.get("/api/exchange/list")
            .then((response) => {
                setCardList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("카드 조회 실패", error);
            })
            .finally(() => {
                setLoading(false); // 카드 리스트 로딩 완료
            });
    }, []);

    // 선불 카드 여부 체크
    useEffect(() => {
        if (!loading) {
            const userCard = cardList.some(card => card.cardUsage.includes("선불카드"));
            setTypeCheck(userCard);

            if (cardList.length === 0 || !userCard) {
                alert("선불 카드를 먼저 신청해 주세요");
                navi("/");
            }
        }
    }, [cardList, loading]);

    // 로딩 중이거나 선불 카드가 없으면 컴포넌트 렌더링 막기
    if (loading || cardList.length === 0 || !typeCheck) {
        return null; // 아무것도 렌더링하지 않음
    }

    // 카드 선택
    const cardSelectHandle = (card) => {
        console.log("선택한 카드 정보", card);
        setSelectCard(card);
    };

    // 취소 버튼
    const backHandle = () => {
        navi(-1);
    };

    // 다음 버튼
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