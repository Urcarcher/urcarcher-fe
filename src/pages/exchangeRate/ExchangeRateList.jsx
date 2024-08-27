import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'pages/exchangeRate/ExchangeRateList.css';
import LoadingSpinner from "components/LoadingSpinner";
import reading from "assets/reading.png";

function ExchangeRateList(props) {
    const [exchangeRateInfos, setExchangeRateInfos] = useState({});
    const [socketData, setSocketData] = useState();
    const [loading, setLoading] = useState(true);

    const wss = useRef(null);
    const mainlist = ['USD', 'EUR', 'JPY', 'CNY']

    useEffect(() => {
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
                            <span className='mainlist-itemname'>{exchangeRateInfos[item] ? exchangeRateInfos[item].exchangeName : ''}</span>
                            <span className='mainlist-itemprice'>{exchangeRateInfos[item] ? exchangeRateInfos[item].rate : ''}</span>
                            <span className='mainlist-itemtime'>{exchangeRateInfos[item] ? exchangeRateInfos[item].date : ''}</span>
                        </li>
                        ))}
                    </ul>
                </div>
    
                <img className="reading" src={reading}/>
                <input placeholder={"국가 검색"} id="search" name="search" className="form-control" />
                <hr/>
                    
                <div className='tableArea'>
                    <table>
                        <tbody>
                            {Object.keys(exchangeRateInfos).map((item)=>(
                            <tr key={item}>
                                <td>
                                    <span className='tableName'>
                                        {exchangeRateInfos[item] ? exchangeRateInfos[item].exchangeName : ''}
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
                                            {exchangeRateInfos[item] ? `${exchangeRateInfos[item].round}회차 ${exchangeRateInfos[item].standard}` : ''}
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