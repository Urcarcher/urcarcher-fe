import React, { useCallback, useEffect, useRef, useState } from 'react';

function ExchangeRateList(props) {
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

    return (
        <div>
            <h3>{date}</h3>
            <h3>{standard}</h3>
            <h3>고시회차 {round}회</h3>
            <thead>
                <tr>
                    <th rowSpan={2}>통화명</th>
                    <th rowSpan={2}>매매기준율</th>
                    <th colSpan={2}>현찰</th>
                    <th colSpan={2}>송금</th>
                    <th rowSpan={2}>미화환산율</th>
                </tr>
                <tr>
                    <th>사실 때</th>
                    <th>파실 때</th>
                    <th>보내실 때</th>
                    <th>받으실 때</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(exchangeRateInfos).map((key)=>(
                    <tr key={key}>
                        <td>{exchangeRateInfos[key].exchangeName}</td>
                        <td>{exchangeRateInfos[key].rate}</td>
                        <td>{exchangeRateInfos[key].buy}</td>
                        <td>{exchangeRateInfos[key].sell}</td>
                        <td>{exchangeRateInfos[key].give}</td>
                        <td>{exchangeRateInfos[key].take}</td>
                        <td>{exchangeRateInfos[key].dollarIndex}</td>
                    </tr>
                ))}
            </tbody>
        </div>
    );
}

export default ExchangeRateList;