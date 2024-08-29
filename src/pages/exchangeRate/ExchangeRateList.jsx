import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'pages/exchangeRate/ExchangeRateList.css';
import LoadingSpinner from "components/LoadingSpinner";
import reading from "assets/reading.png";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';



function ExchangeRateList(props) {

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


    const [exchangeRateInfos, setExchangeRateInfos] = useState({});
    const [socketData, setSocketData] = useState();
    const [loading, setLoading] = useState(true);

    const wss = useRef(null);
    const mainlist = ['USD', 'EUR', 'JPY', 'CNY']

    useEffect(() => {

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }

        wsLogin();
    }, []);

    useEffect(() => {
        if (socketData !== undefined) {
            let id = socketData.exchangeType;
            let datas = socketData;
            exchangeRateInfos[id] = datas;
            setExchangeRateInfos(exchangeRateInfos);
            
            if(Object.keys(exchangeRateInfos).length == 58) {
                setLoading(false);
            }
        }
    }, [socketData]);

    const wsLogin = useCallback(() => {
        wss.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVICE_URL);

        wss.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
        };
    });
   
    if(loading) return <LoadingSpinner />;

    return (
        <div className='contents'>
            <div className='realtime'>
                <div className='mainlist-article'>
                    <ul className='mainlist-list'>
                        {mainlist.map((item, index)=>(
                        <li key={index}>
                            <span className='mainlist-itemname'>{exchangeRateInfos[item] ? 
                `${t(exchangeRateInfos[item].country)} ${exchangeRateInfos[item].exchangeType}` : 
                ''
            }</span>
                            <span className='mainlist-itemprice'>{exchangeRateInfos[item] ? exchangeRateInfos[item].rate : ''}</span>
                            <span className='mainlist-itemtime'>{exchangeRateInfos[item] ? exchangeRateInfos[item].date : ''}</span>
                        </li>
                        ))}
                    </ul>
                </div>
    
                <div className="mainlist-search-box">
                    <img className="reading" src={reading}/>
                    <input placeholder={"국가 검색"} id="search" name="search" autoComplete="off" className='mainlist-text-box' />
                </div>
                <hr/>
                    
                <div className='tableArea'>
                    <table>
                        <tbody>
                            {Object.keys(exchangeRateInfos).map((item)=>(
                            <tr key={item}>
                                <td>
                                    <span className='tableName'>
                                    {exchangeRateInfos[item] ? 
                `${t(exchangeRateInfos[item].country)} ${exchangeRateInfos[item].exchangeType}` : 
                ''
            }
                                    </span>
    
                                    <span className='tableTime'>
                                        {exchangeRateInfos[item] ? exchangeRateInfos[item].date : ''}
                                    </span>
                                </td>
    
                                <td>
                                    {exchangeRateInfos[item] ? exchangeRateInfos[item].rate : ''}
                                </td>
    
                                <td>
                                    <div className='standard-round'>
                                        <span className='standard-round-box'>
                                            {exchangeRateInfos[item] ? `${exchangeRateInfos[item].round}차 ${exchangeRateInfos[item].standard}` : ''}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default ExchangeRateList;