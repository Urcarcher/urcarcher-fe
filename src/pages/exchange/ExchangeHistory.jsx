import 'assets/exchangeCard.css';
import 'assets/exchangeHistory.css';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ExchangeHistory(props) {
    const navi = useNavigate();
    const location = useLocation();

    const userCard = location.state.selectCard;
    const [exCard, setExCard] = useState(userCard);
    const [cardHistory, setCardHistory] = useState([]);
    const [loading, setLoading] = useState(true); // 환전 내역 로딩 상태

    console.log("유저 카드 정보", exCard);
    
    const [dateFilter, setDateFilter] = useState("all");
    const [historyFilter, setHistoryFilter] = useState(cardHistory);

    // 환전 내역 전체 조회
    useEffect(() => {
        axios.get(`/api/exchange/list/${exCard.cardId}`)
        .then((response) => {
            setCardHistory(response.data);
            setHistoryFilter(response.data);
            console.log("환전 내역 조회", response.data);
        })
        .catch((error) => {
            console.log("환전 내역 조회 실패", error);
        })
        .finally(() => {
            setLoading(false); // 환전 내역 로딩 완료
        });
    }, []);

    // 환전 내역 없으면 뒤로가기
    useEffect(() => {
        if(!loading && cardHistory.length === 0) {
            alert("환전 내역이 없어요! 충전 후 확인해 주세요");
            navi(-1);
            return;
        }
    }, [cardHistory, loading]);

    // 로딩 중이거나 카드가 없으면 컴포넌트 렌더링 막기
    if (loading || cardHistory.length === 0) {
        return null; // 아무것도 렌더링하지 않음
    }

    // 충전 버튼
    const exchangeHandle = () => {
        navi("/exchange");
    };

    // 전체, 최근 일주일 조회
    const typeHandle = (event) => {
        setDateFilter(event);
        dateHandle(event);
    };

    // 버튼 타입으로 데이터 필터링
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

    // 환전 내역 상세 조회
    const detailHandle = (exId) => {
        navi("/exchange/history/detail", { state: { exId } });
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
                <button className={historyFilter === cardHistory ? "ex_type_select" : "ex_type_un_select"} onClick={() => typeHandle("all")}>전체</button>
                <button className={historyFilter === cardHistory ? "ex_type_un_select" : "ex_type_select"} onClick={() => typeHandle("week")}>최근 일주일</button>
            </div>
            <div className="ex_history_list">
                {historyFilter !== null ? historyFilter.map((history) => (
                    <div key={history.exId} onClick={() => detailHandle(history.exId)}>
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