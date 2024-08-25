import 'assets/exchangeCard.css';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'assets/exchangeHistory.css';

function ExchangeHistory(props) {
    const navi = useNavigate();
    const location = useLocation();

    const userCard = location.state.selectCard;
    const [exCard, setExCard] = useState(userCard);
    const [cardHistory, setCardHistory] = useState([]);

    console.log("유저 카드 정보", exCard);
    
    const [dateFilter, setDateFilter] = useState("all");
    const [historyFilter, setHistoryFilter] = useState(cardHistory);

    // 환전 내역 조회
    useEffect(() => {
        axios.get(`/api/exchange/list/${exCard.cardId}`)
        .then((response) => {
            setCardHistory(response.data);
            setHistoryFilter(response.data);
            console.log("환전 내역 조회", response.data);
        })
        .catch((error) => {
            console.log("환전 내역 조회 실패", error);
        });
    }, []);

    // 충전 버튼
    const exchangeHandle = () => {
        navi("/exchange");
    };

    // 전체, 최근 일주일 조회
    const typeHandle = (event) => {
        setDateFilter(event);
        dateHandle(event);
    };

    const dateHandle = (event) => {
        if (event === "week") {
            const oneWeek = dayjs().subtract(7, "day").format("YYYY-MM-DD");
            const weekFilter = cardHistory.filter(history => 
                dayjs(history.exDate).format("YYYY-MM-DD") >= oneWeek
            );
            setHistoryFilter(weekFilter);
            // alert("일주일");
        } else {
            setHistoryFilter(cardHistory);
            // alert("전체");
        }
    };    

    return (
        <div className="contents">
            <div className="ex_history_wrpper">
                <span>대한민국 KRW</span>
                <h3>￦ {exCard.cardBalance.toLocaleString()}</h3>
                <div className="ex_history_btn_wrpper">
                    <button className="ex_go_change_btn" onClick={exchangeHandle}>충전</button>
                </div>
            </div>
            <div className="ex_history_type_btn">
                {/* <button className="ex_type_un_select" onClick={() => typeHandle("all")}>전체</button> */}
                <button className={historyFilter === cardHistory ? "ex_type_select" : "ex_type_un_select"} onClick={() => typeHandle("all")}>전체</button>
                <button className={historyFilter === cardHistory ? "ex_type_un_select" : "ex_type_select"} onClick={() => typeHandle("week")}>최근 일주일</button>
            </div>
            <div className="ex_history_list">
                {historyFilter !== null ? historyFilter.map((history) => (
                    <div key={history.exId}>
                        <p className="ex_history_date">{dayjs(history.exDate).format("YYYY-MM-DD")}</p>
                        <p className="ex_history_title">
                            대한민국 KRW
                            <span style={{ fontFamily: "NanumSquareNeoBold", color: "#CCCC", marginLeft: 10 }}>
                                {history.setId === null ? "충전" : "자동충전"}
                            </span>
                        </p>
                        <p className="ex_history_cur">+ ￦ {history.exCur.toLocaleString()}</p>
                    </div>
                )) : "충전 내역이 없어요"}
            </div>
        </div>
    );
}

export default ExchangeHistory;