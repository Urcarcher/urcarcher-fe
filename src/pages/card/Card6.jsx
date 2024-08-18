import React, { useEffect } from 'react';
import { useCardContext } from './CardContext';
import axios from 'axios';

function Card6(props) {
    const { produceCardOffer } = useCardContext();

    useEffect(() => {
        console.log('Card data:', produceCardOffer);
    
        const sendCardData = async () => {
            try {
                const modifiedCardOffer = {
                    cardId: produceCardOffer.card_id,
                    cardNumber: produceCardOffer.card_number,
                    cvvCode: produceCardOffer.cvv_code,
                    cardBalance: produceCardOffer.card_balance,
                    cardStatus: produceCardOffer.card_status,
                    issueDate: produceCardOffer.issue_date,
                    expirationDate: produceCardOffer.expiration_date,
                    cardPassword: produceCardOffer.card_password,
                    cardPickup: produceCardOffer.card_pickup,
                    pickupDate: produceCardOffer.pickup_date,
                    cardAccount: produceCardOffer.card_account,
                    paymentBank: produceCardOffer.payment_bank,
                    paymentDate: `2024-08-${produceCardOffer.payment_date}`,  // YYYY-MM-DD 형식으로 변환
                    transportation: produceCardOffer.transportation,
                    cardTypeId: produceCardOffer.card_type_id,
                    memberId: produceCardOffer.member_id,
                };
    
                console.log("Modified Card Offer:", modifiedCardOffer);
    
                const response = await axios.post('/api/card/insert', modifiedCardOffer, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                console.log('Server response:', response.data);
            } catch (error) {
                console.error('Error sending card data:', error);
            }
        };
    
        sendCardData();
    }, [produceCardOffer]);

    return (
        <div>
            <h3>카드 발급이 완료되었습니다.</h3>
            <pre>{JSON.stringify(produceCardOffer, null, 2)}</pre> {/* 카드 데이터 확인 */}
        </div>
    );
}

export default Card6;
