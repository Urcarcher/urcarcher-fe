import React from 'react';
import 'assets/exchangeSetNull.css';
import chart from 'assets/chart.png'
import moneyStack from 'assets/money_stack.png'
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';
import { useEffect, useState } from 'react';

function ExchangeSetNull({ exchangeSetHandle }) {

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
    


    useEffect(()=>{
   
        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }
    },[]);


    return (
        <div className="ex_set_null_wrapper">
            <div className="ex_set_chart">
                <img src={chart} alt="그래프"/>
            </div>
            <div className="ex_set_money">
                <img src={moneyStack} alt="돈"/>
            </div>
            <div className="ex_set_null">
                <p>{t('NoAutoRechargeSettings')}</p>
            </div>
            <div className="exchange_set_btn_wrapper">
                <button className="exchange_set_btn" onClick={exchangeSetHandle}>{t('SetAutoRecharge')}</button>
            </div>
        </div>
    );
}

export default ExchangeSetNull;