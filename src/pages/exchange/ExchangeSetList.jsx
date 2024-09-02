import React, { useEffect, useState } from 'react';
import 'assets/exchangeSetList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';


function ExchangeSetList({ reserveInfo }) {
    const { t, i18n } = useTranslation();

    const changeLanguage = (selectedLanguage) => {
        const languageMap = {
            Korea: 'ko',
            English: 'en',
            Japan: 'jp',
            China: 'cn'
        };

        const languageCode = languageMap[selectedLanguage] 
        i18n.changeLanguage(languageCode);
    };

    const navi = useNavigate();
    
    console.log("예약 조회 페이지 data", reserveInfo);

    const [nation, setNation] = useState(""); // 사용자 국적
    const exchangeType = [{nt: "USD", cr: "$"}, {nt: "JPY", cr: "￥"}, {nt: "CNY", cr: "Y"}]; // 통화 기호

    // 로그인 유저 국적 조회
    useEffect(() => {
        const savedLanguage = Cookies.get('selectedLanguage');
        
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }

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

    // 삭제 버튼
    const deleteHandle = () => {
        axios.delete(`/api/exchange/rate/delete/${reserveInfo.setId}`)
        .then((response) => {
            navi("/exchange");
        })
        .catch(error => {
            console.log(error);
            alert(t('PleaseTryAgain'));
        });
    };

    // 홈 버튼
    const homeHandle = () => {
        navi("/exchange");
    };

    return (
        <div className="ex_set_list_wrapper">
            <div className="ex_set_list_table">
                <h5>대한민국 KRW</h5>
                {/* <div className="ex_set_list_col">
                    <p className="ex_set_list_p">{t('ReservedExchangeRate')}</p>
                    <h5>1 { curSymbol(nation) } = {reserveInfo.setRate}</h5>
                </div> */}
                <div className="ex_set_list_col">
                    <p className="ex_set_list_p">{t('ReservationDate')}</p>
                    <h5>{reserveInfo.setDate}</h5>
                </div>
                <div className="ex_set_list_col">
                    <p className="ex_set_list_p">{t('Automatically')}</p>
                    <h5>
                        <span style={{ fontFamily: "NanumSquareNeoHeavy", color: "#476EFF" }}>
                            KRW {reserveInfo.setCur.toLocaleString()}
                        </span> {t('RechargeAnd')}
                    </h5>
                </div>
                <div className="ex_set_list_col">
                    <p className="ex_set_list_p">{t('EstimatedKRW')}</p>
                    <h5>
                        <span style={{ fontFamily: "NanumSquareNeoHeavy", color: "#476EFF" }}>
                        {nation} {reserveInfo.setPay}
                        </span> {t('WillWithdraw')}
                    </h5>
                </div>
            </div>
            <div className="ex_set_list_text">
                <h4>{t('AutoRechargeSet')}</h4>
                <h4>{t('AutoRechargeOnReservationDate')}</h4>
            </div>
            <div className="ex_set_list_btn">
                <button className="set_delete_btn" onClick={deleteHandle}>{t('Delete')}</button>
                <button className="set_home_btn" onClick={homeHandle}>{t('Confrim')}</button>
            </div>
        </div>
    );
}

export default ExchangeSetList;