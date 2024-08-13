import React, { useState } from 'react';

function CategoryRankList(props) {
    
    //DB에서 가져올 많이 결제 한 카테고리 리스트 저장
    const [paymentCategoryList, setPaymentCategoryList] = useState([]);

    return (
        <div className='rank-list-wrap'>
            <ul className='rank-list inner'>
                {/* 카운트 수 제일 큰 것 부터 */}
                <li className='first'> 
                    <div>
                        <p>카테고리명1</p>
                        <p>0건</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>카테고리명2</p>
                        <p>0건</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>카테고리명3</p>
                        <p>0건</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>카테고리명4</p>
                        <p>0건</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>카테고리명4</p>
                        <p>0건</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>카테고리명4</p>
                        <p>0건</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default CategoryRankList;