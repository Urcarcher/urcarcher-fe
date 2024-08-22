import React, { useCallback, useEffect, useRef, useState } from 'react';
import US from 'assets/icon-nation/icon-us.png';
import JP from 'assets/icon-nation/icon-jp.png';
import CN from 'assets/icon-nation/icon-cn.png';


function CurrencyRateList(props) {
   
    const [exchangeCurInfo, setExchangeCurInfo] = useState({});
    const [wscData, setWscData] = useState();
    const cwsc = useRef(null);

    // 처음 렌더링 될 때만 웹소켓 연결
    // useEffect(()=>{
    //     wsConnect();
    // }, []);

    // // 웹소켓 연결 설정
    // const wsConnect = useCallback(()=>{
    //     cwsc.current = new WebSocket("wss://urcarcher-local.kro.kr:8443/realtime/rate");

    //     cwsc.current.onmessage = (message) => {
    //         const rcvData = JSON.parse(message.data);
    //         setWscData(rcvData);
    //     };
    // });
    // 웹소켓 연결 종료 (컴포넌트가 화면에서 사라질 때)
    //     return () => {
    //         if (socket.current) {
    //             socket.current.close();
    //         }
    //     };
    // }, []);

    // useEffect(() => {
    //     if (wscData !== undefined) {
    //         const id = wscData.exchangeType;
    //         const updateExchangeCurInfos = { ...exchangeCurInfo, [id]: wscData };
    //         setExchangeCurInfo(updateExchangeCurInfos);
    //     }
    // }, [wscData, exchangeCurInfo]);

    //환율 표시 국가
    const exchangeRates = [  // [!]소켓 연결 후 test속성 삭제
        { country: '미국', currency: 'USD', symbol: '$', flag: US , test: '1,336.10' },  
        { country: '일본', currency: 'JPY', symbol: '￥', flag: JP , test: '9.02' },
        { country: '중국', currency: 'CNY', symbol: 'Y', flag: CN  , test: '178.03'},
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
                    <p className='rate-txt' >KRW {exchangeCurInfo[rate.currency]?.rate || rate.test || 'Loading...'} <span>=</span> 1{rate.symbol}</p>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default CurrencyRateList;