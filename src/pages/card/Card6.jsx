import React from 'react';
import { useCardContext } from './CardContext';
function Card6(props) {
    const { produceCardOffer } = useCardContext();
    return (
        <div>
            <h3>카드 발급이 완료되었습니다.</h3>
            <pre>{JSON.stringify(produceCardOffer, null, 2)}</pre> {/* 카드 데이터 확인 */}
        </div>
    );
}

export default Card6;