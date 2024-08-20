import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'assets/exchangeCard.css';
import axios from 'axios';

function ExchangeCard(props) {
    // 이전 페이지에서 보낸 버튼 정보
    const location = useLocation();
    const { choiceBtn } = location.state || {};
    console.log("선택한 충전 버튼 종류", choiceBtn);
    
    const navi = useNavigate();

    // 사용자의 카드 목록 임시 data
    // const userCard = [
    //     { id: 1, balance: 10000, type: "선불카드" },
    //     { id: 2, balance: 50000, type: "선불카드" },
    //     { id: 3, balance: 0, type: "신용카드" },
    //     { id: 4, balance: 0, type: "선불카드" },
    // ];

    // const [cardList, setCardList] = useState(userCard);
    
    const [cardList, setCardList] = useState([]);
    const [selectCard, setSelectCard] = useState(null);
    
    // 카드 리스트 조회
    useEffect(() => {
        if (!cardList) {
            alert("카드를 먼저 발급받아주세요");
            return;
        }

        axios.get("https://urcarcher-local.kro.kr:8443/api/exchange/list")
            .then((response) => {
                setCardList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("카드 조회 실패", error);
            });
    }, []);

    // 카드 선택
    const cardSelectHandle = (card) => {
        console.log("선택한 카드 정보", card);
        setSelectCard(card);
    };

    // 취소 버튼
    const backHandle = () => {
        navi(-1);
    };

    // 다음 버튼 => 선택한 버튼 종류 별 페이지 이동
    const nextHandle = () => {
        if (selectCard) {
            let location = "";
            
            if (choiceBtn === "currency") {
                // 바로충전
                location = "/exchange/currency";
            } else if (choiceBtn === "set") {
                // 자동충전
                location = "/exchange/set";
            }
            navi(location, { state: { selectCard } });
        } else {
            alert("충전하실 카드를 선택해 주세요");
        }
    };

    return (
        <div className="contents">
            <div className="card_title">
                <h3>
                    어떤 카드에 <span style={{ color: "#476EFF" }}>충전</span>할까요?
                </h3>
            </div>
            <div className="card_wrapper">
                {/* null, undefined 아닌지 확인 후 id 비교 */}
                {cardList.map((card) => (
                    <div key={card.cardId}
                        className={selectCard?.cardId === card.cardId ? "choice" : "unChoice"}
                        style={{ display: card.cardUsage === "선불카드" ? "block" : "none" }}
                    >
                        <p>{card.cardUsage}</p>
                        <p className="card_balance">잔액 {card.cardBalance.toLocaleString()}원</p>
                        <p className="card_text">연결 계좌에서 바로 충전 가능!</p>
                        <button className="exCard_btn" onClick={() => cardSelectHandle(card)}>선택</button>
                    </div>
                ))}
            </div>
            <div className="btn_container">
                <button className="back_btn" onClick={backHandle}>취소</button>
                <button className="next_btn" onClick={nextHandle}>다음</button>
            </div>
        </div>
    );
}

export default ExchangeCard;