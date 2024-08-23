import React, { useEffect } from 'react';
import { useCardContext } from './CardContext';
import axios from 'axios';
import { Button } from '@mui/material';

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
        <div style={{ marginTop: '160px', marginBottom: '100px' }}>
            <div style={{ margin: 'auto 50px' }}>
                <h3 style={{ marginBottom: '60px' }}>카드 발급이 완료되었습니다</h3>
                <img
                    src={require(`../../assets/Card${produceCardOffer.card_type_id}.png`)}
                    alt=""
                    width={'180px'}
                    style={{
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.6), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                        borderRadius: '15px'
                    }}
                />
                {/* 카드 데이터 확인 */}
                {/* <pre>{JSON.stringify(produceCardOffer, null, 2)}</pre> */}
                <Button
                    variant="contained"
                    style={{
                        width: '50%',
                        padding: '12px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginTop: '60px'
                    }}
                >
                    홈으로
                </Button>
            </div>
        </div>
    );
}

export default Card6;
