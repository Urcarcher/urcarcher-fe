import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'assets/exchangeCard.css';
import axios from 'axios';
import Card1 from 'assets/Card1_.png'
import Card2 from 'assets/Card2_.png'
import Card3 from 'assets/Card3_.png'
import Card4 from 'assets/Card4_.png'
import Card5 from 'assets/Card5_.png'

function ExchangeCard(props) {
    // 이전 페이지에서 보낸 버튼 정보
    const location = useLocation();
    const choiceBtn = location.state.selectBtn;
    
    // console.log("선택한 충전 버튼 종류", choiceBtn);
    
    const navi = useNavigate();
    
    const [cardList, setCardList] = useState([]);
    const [selectCard, setSelectCard] = useState(null);

    const [loading, setLoading] = useState(true); // 카드 리스트 로딩 상태
    const [typeCheck, setTypeCheck] = useState(false); // 선불 카드 확인
    const cardImg = {1 : Card1, 2 : Card2, 3 : Card3, 4 : Card4, 5 : Card5}; // 카드 별 이미지
    
    // 카드 리스트 조회
    useEffect(() => {
        // axios.get("https://urcarcher-local.kro.kr:8443/api/exchange/list")
        axios.get("/api/exchange/list")
            .then((response) => {
                setCardList(response.data);
                console.log("카드 데이터", response.data);
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

    // 카드 별 이미지
    const imgUrl = (cardTypeId) => {
        // console.log(cardTypeId);
        return cardImg[cardTypeId];
    };

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
            <div className="exCard_title">
                <h3>
                    어떤 카드에 <span style={{ color: "#476EFF" }}>충전</span>할까요?
                </h3>
            </div>
            <div className="exCard_wrapper">
                {/* null, undefined 아닌지 확인 후 id 비교 */}
                {cardList.map((card) => (
                    <div key={card.cardId}
                        className={selectCard?.cardId === card.cardId ? "choice" : "unChoice"}
                        style={{ display: card.cardUsage === "선불카드" ? "block" : "none",
                            backgroundImage: `url(${imgUrl(card.cardTypeId)})`,
                        }}
                        onClick={() => cardSelectHandle(card)}
                    >
                        <p>{card.cardUsage}</p>
                        <p className="exCard_balance">잔액 {card.cardBalance.toLocaleString()}원</p>
                        {/* <p className="exCard_text">연결 계좌에서 바로 충전 가능!</p> */}
                        <p className="exCard_text">{card.cardNumber}</p>
                        {/* <button className="exCard_btn" onClick={() => cardSelectHandle(card)}>선택</button> */}
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

export default ExchangeCard;