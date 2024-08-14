import React, { useEffect } from 'react';
import { useCardContext } from './CardContext';

function Card6(props) {
    const { produceCardOffer } = useCardContext();

     useEffect(() => {
         // 페이지 로드 시 카드 정보 출력
         console.log('Card data:', produceCardOffer);

         // 카드 데이터를 백엔드로 전송
        const sendCardData = async () => {
            try {
                const response = await fetch('/api/card/insert', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(produceCardOffer),
                });
                const result = await response.json();
                console.log('Server response:', result);
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
