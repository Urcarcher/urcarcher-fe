import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'assets/exchangeHistory.css';
import dayjs from 'dayjs';

function ExchangeHistoryDetail(props) {
    const navi = useNavigate();
    const location = useLocation();
    const historyNo = location.state.exId;
    const [detailHistory, setDetailHistory] = useState({});

    console.log("상세 조회 아이디", historyNo);

    const [nation, setNation] = useState(""); // 사용자 국적
    const exchangeType = [{nt: "USD", cr: "$"}, {nt: "JPY", cr: "￥"}, {nt: "CNY", cr: "Y"}]; // 통화 기호

    // 환전 내역 상세 조회
    useEffect(() => {
        axios.get(`/api/exchange/detail/${historyNo}`)
        .then((response) => {
            setDetailHistory(response.data);
            console.log("상세 조회 데이터", response.data);
        })
        .catch((error) => {
            console.log("상세 조회 실패", error);
        });
    }, []);

    // 로그인 유저 국적 조회
    useEffect(() => {
        axios.get("/api/exchange/find")
        .then((response) => {
            console.log(response.data);
            setNation(response.data);
        })
        .catch((error) => {
            console.log("국적 조회 실패", error);
        });
    }, []);

    // 국적 별 통화 기호
    const curSymbol = (nation) => {
        const foundCur = exchangeType.find(cur => cur.nt === nation);
        // 배열에 유저의 국적과 일치하는 국적이 없으면 $ 보이도록
        return foundCur ? foundCur.cr : "$";
    };

    // 충전 버튼
    const exchangeHandle = () => {
        navi("/exchange");
    };

    // 목록 버튼
    const backHandle = () => {
        navi(-1);
    };

    return (
        <div className="contents">
            <div className="ex_history_wrpper">
                <span>대한민국 KRW</span>
                <h3>￦ {Number(detailHistory.cardBalance).toLocaleString()}</h3>
                <div className="ex_history_btn_wrpper">
                    <button className="ex_go_change_btn" onClick={exchangeHandle}>충전</button>
                </div>
            </div>
            <div className="ex_history_detail_container">
                <h4>{detailHistory.setId === null ? "🪙 금액을 충전했어요" : "🪙 예약환율 자동충전에 성공했어요"}</h4>
            </div>
            <div className="ex_history_detail_content">
                <div>
                    <p className="ex_history_detail_left">충전일시</p>
                    <p className="ex_history_detail_right">{dayjs(detailHistory.exDate).format("YYYY-MM-DD")}</p>
                </div>
                <div>
                    <p className="ex_history_detail_left">충전금액</p>
                    <p className="ex_history_detail_right">￦ {Number(detailHistory.exCur).toLocaleString()}</p>
                </div>
                <div>
                    <p className="ex_history_detail_left">원화금액</p>
                    <p className="ex_history_detail_right">{ curSymbol(nation) } {detailHistory.exPay}</p>
                </div>
                <div>
                    <p className="ex_history_detail_left">충전 시 환율</p>
                    <p className="ex_history_detail_right">KRW {detailHistory.exRate} = 1 { curSymbol(nation) }</p>
                </div>
                <div>
                    <p className="ex_history_detail_left">총 결제 금액</p>
                    <p className="ex_history_detail_right">{ curSymbol(nation) } {detailHistory.exPay}</p>
                </div>
                <div>
                    <p className="ex_history_detail_left">출금계좌</p>
                    <p className="ex_history_detail_right">Citi Bank</p>
                </div>
                <div>
                    <p className="ex_history_detail_left">충전상세</p>
                    <p className="ex_history_detail_right">{detailHistory.setId === null ? "바로충전" : "자동충전"}</p>
                </div>
            </div>
            <div className="ex_history_detail_btn">
                <button onClick={backHandle} className="ex_history_go_btn">목록보기</button>
            </div>
        </div>
    );
}

export default ExchangeHistoryDetail;