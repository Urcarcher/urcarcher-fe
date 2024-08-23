import React, { useCallback, useEffect, useRef, useState } from 'react';
import US from 'assets/icon-nation/icon-us.png';
import JP from 'assets/icon-nation/icon-jp.png';
import CN from 'assets/icon-nation/icon-cn.png';


function CurrencyRateList(props) {
    const [exchangeRateInfos, setExchangeRateInfos] = useState({});
    const [socketData, setSocketData] = useState();
    const [date, setDate] = useState();
    const [standard, setStandard] = useState();
    const [round, setRound] = useState();

    const wss = useRef(null);

    useEffect(()=>{
        wsLogin();
    }, []);

    useEffect(()=>{
        if(socketData !== undefined) {
            let id = socketData.exchangeType;
            let datas = socketData;
            exchangeRateInfos[id] = datas;
            setDate(exchangeRateInfos[id].date);
            setStandard(exchangeRateInfos[id].standard);
            setRound(exchangeRateInfos[id].round);
            setExchangeRateInfos(exchangeRateInfos);
        }
    }, [socketData]);

    const wsLogin = useCallback(()=>{
        wss.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVICE_URL);

        wss.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
        };
    });

    //환율 표시 국가
    const exchangeRates = [  // [!]소켓 연결 후 test속성 삭제
        { country: '미국', currency: 'USD', symbol: '$', flag: US },  
        { country: '일본', currency: 'JPY', symbol: '￥', flag: JP },
        { country: '중국', currency: 'CNY', symbol: 'Y', flag: CN },
      ];
    
    return (
        <div>
           <ul className='home-rate-list'>
            {exchangeRates.map((rate, index) => (
                <li key={index}>
                <div>
                    <p className='country-txt'>
                        <span className='country'>
                            <img src={rate.flag} alt={rate.country} className='countryIcon' />
                            {rate.country} {rate.currency}
                        </span>
                    </p>
                </div>
                    {/* ?. : 연산자 앞 속성 null/undefined일 경우 속성에 접근 중단, .rate : 소켓에서 받아오는 환율 값 */}
                    {/* <p>
                        KRW {exchangeCurInfo[rate.currency]?.rate || 'Loading...'} <span>=</span> 1{rate.symbol}
                    </p> */}
                    {/* 화면 테스트용 */}
                    <p className='rate-txt' >KRW {exchangeRateInfos[rate.currency]?.rate || exchangeRateInfos.rate || 'Loading...'} <span>=</span> 1{rate.symbol}</p>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default CurrencyRateList;