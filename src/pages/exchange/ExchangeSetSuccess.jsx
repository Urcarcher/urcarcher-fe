import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'assets/exchangeSetSuccess.css';
import cookie from 'react-cookies';
import axios from 'axios';
import { options_GET } from 'services/CommonService';

function ExchangeSetSuccess(props) {
    const location = useLocation();
    const navi = useNavigate();

    const settingData = location.state.successData;
    const settingCard = location.state.successCard;
    console.log("settingData", settingData);
    console.log("settingCard", settingCard);

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

    // 홈 버튼
    const homeHandle = () => {
        navi("/exchange");
    };

    // 환전 내역
    const inforListHandle = () => {
        navi("/exchange/history/card");
    };

    return (
        <div className="contents">
            <div className="ex_setting_wrapper">
                <h3>
                    <span style={{ color: "#476EFF" }}>예약 환전이</span>
                </h3>
                <h3>설정되었어요</h3>
            </div>
            <div className="ex_setting_table_box">
                <div className="ex_setting_table">
                    <h5>대한민국 KRW</h5>
                    <div className="ex_setting_col">
                        <p className="ex_setting_p">예약환율 (시가)</p>
                        <h5>1 { curSymbol(nation) } = {settingData.setRate}</h5>
                    </div>
                    <div className="ex_setting_col">
                        <p className="ex_setting_p">예약일</p>
                        <h5>{settingData.setDate}</h5>
                    </div>
                    <div className="ex_setting_col">
                        <p className="ex_setting_p">자동으로</p>
                        <h5>
                            <span style={{ fontFamily: "NanumSquareNeoHeavy", color: "#476EFF" }}>
                                KRW {settingData.setCur.toLocaleString()}
                            </span> 충전하고
                        </h5>
                    </div>
                    <div className="ex_setting_col">
                        <p className="ex_setting_p">예상 원화</p>
                        <h5>
                            <span style={{ fontFamily: "NanumSquareNeoHeavy", color: "#476EFF" }}>
                            {nation} {settingData.setPay}
                            </span> 출금할 예정이에요
                        </h5>
                    </div>
                </div>
                <div className="ex_setting_box_text">
                    <h4>자동 충전이 설정되었어요</h4>
                    <h4>예약일이 되면 자동 충전돼요</h4>
                </div>
                <div className="ex_setting_btn_box">
                <button className="set_setting_info_btn" onClick={inforListHandle}>내역보기</button>
                <button className="set_setting_home_btn" onClick={homeHandle}>확인</button>
            </div>
            </div>

        </div>
    );
}

export default ExchangeSetSuccess;