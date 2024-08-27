import { useLocation, useNavigate } from 'react-router-dom';
import 'assets/exchangeSuccess.css';
import exchangeCard from 'assets/card.png'
import exchangeMoney from 'assets/money.png'
import { useEffect, useState } from 'react';
import axios from 'axios';

function ExchangeSuccess(props) {
    const location = useLocation();

    const exchangeMsg = location.state.successMsg; // 충전 금액 메세지
    const exchangeData = location.state.successData; // 충전한 카드 정보
    const exchangeBalance = location.state.successPlus; // 충전 후 잔액

    console.log("insert 메세지", exchangeMsg);
    console.log("insert 내역", exchangeData);
    console.log("충전 후 잔액", exchangeBalance);

    const navi = useNavigate();

    const [nation, setNation] = useState(""); // 사용자 국적
    const exchangeType = [{nt: "USD", cr: "$"}, {nt: "JPY", cr: "￥"}, {nt: "CNY", cr: "Y"}]; // 통화 기호

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

    // 확인
    const homeHandle = () => {
        navi("/");
    };

    // 내역 보기
    const historyHandle = () => {
        navi("/exchange/history/card");
    }

    return (
        <div className="contents">
            <div className="ex_success_wrapper">
                <div className="ex_success_card">
                    <img src={exchangeCard} alt="카드 아이콘"/>
                </div>
                <div className="ex_success_money">
                    <img src={exchangeMoney} alt="돈 아이콘"/>
                </div>
                <div className="ex_success_title">
                    <h3>
                        <span style={{ color: "#476EFF" }}>{exchangeMsg}</span> 을
                    </h3>
                    <h3>채웠어요</h3>
                </div>
            </div>
            <div className="ex_success_rate">
                <div>
                    <p className="ex_success_left_p">적용환율</p>
                    <p className="ex_success_right_p" style={{ color: "#476EFF" }}>KRW {exchangeData.exRate} = 1 { curSymbol(nation) }</p>
                </div>
                <div>
                    <p className="ex_success_left_p">환율우대</p>
                    <p className="ex_success_right_p">90%</p>
                </div>
                <div>
                    <p className="ex_success_left_p">결제금액</p>
                    <p className="ex_success_right_p">{exchangeData.exPay} { curSymbol(nation) }</p>
                </div>
                <div>
                    <p className="ex_success_left_p">출금계좌</p>
                    <p className="ex_success_right_p">Citi Bank</p>
                </div>
                <div>
                    <p className="ex_success_left_p">KRW 잔액</p>
                    <p className="ex_success_right_p">￦ {exchangeBalance.toLocaleString()}</p>
                </div>
            </div>
            <div className="ex_success_btn_wrapper">
                <button className="success_info_btn" onClick={historyHandle}>내역보기</button>
                <button className="success_check_btn" onClick={homeHandle}>확인</button>
            </div>
        </div>
    );
}

export default ExchangeSuccess;