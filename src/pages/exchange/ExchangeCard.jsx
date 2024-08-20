import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/exchangeCard.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

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
        { id: 4, balance: 0, type: "선불카드" },
    ];

    const [cardList, setCardList] = useState(userCard);
    const [selectCard, setSelectCard] = useState(null);

    // 카드 리스트 조회
    // const [cardList, setCardList] = useState([]);

    /*
    useEffect(() => {
        axios.get("https://urcarcher-local.kro.kr:8443/api/exchange/list")
            .then((response) => {
                setCardList(response.data);
            })
            .catch((error) => {
                console.error("카드 조회 실패", error);
            });
    }, []);
    */

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
            
            if (btn === "currency") {
                // 바로충전
                location = "/exchange/currency";
            } else if (btn === "set") {
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
            <h2>어떤 카드에 충전할까요?</h2>
            <div>
                {/* null, undefined 아닌지 확인 후 id 비교 */}
                {cardList.map((card) => (
                    <div key={card.id} 
                        className={selectCard?.id === card.id ? "choice" : "unChoice"}
                        style={{ display: card.type === "선불카드" ? "block" : "none" }}
                    >
                        <p>{card.type}</p>
                        <p>잔액 {card.balance.toLocaleString()}원</p>
                        <button onClick={() => cardSelectHandle(card)}>선택</button>
                    </div>
                ))}
            </div>
            <button onClick={backHandle}>취소</button>
            <button onClick={nextHandle}>다음</button>
        </div>
    );
}

export default ExchangeCard;