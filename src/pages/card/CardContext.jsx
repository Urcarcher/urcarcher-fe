import React, { createContext, useContext, useState } from 'react';

const CardContext = createContext(); // 컨텍스트 객체를 생성

//  useContext를 사용하여 CardContext의 현재 값을 반환
export const useCardContext = () => {
    return useContext(CardContext);
};

export const CardProvider = ({children}) => {
    const [produceCardOffer, setProduceCardOffer] = useState({
        "card_id":"",
        "card_account":"",
        "card_balance" : "",
        "card_number":"",
        "card_password":"",
        "card_pickup":"",
        "card_status":"",
        "cvv_code":"",
        "expiration_date":"",
        "issue_date":"",
        "payment_bank":"",
        "payment_date":"",
        "pickup_date":"",
        "transportation":"",
        "card_type_id":"",
        "member_id":""
    });

    return (
        <CardContext.Provider value={{produceCardOffer, setProduceCardOffer}}>
            {children}
        </CardContext.Provider>
    )
}