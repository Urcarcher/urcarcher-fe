import React, { useState } from 'react';

const categoryList = [
    { name: "카테고리명1", count: "0" },
    { name: "카테고리명2", count: "0" },
    { name: "카테고리명3", count: "0" },
    { name: "카테고리명4", count: "0" },
    { name: "카테고리명5", count: "0" },
];

function CategoryRankList(props) {
    
    //DB에서 가져올 많이 결제 한 카테고리 리스트 저장
    //const [paymentCategoryList, setPaymentCategoryList] = useState([]);

    return (
        <div className='rank-list-wrap'>
            <ul className='rank-list inner'>
                {/* 카운트 수 제일 큰 것 부터 */}
                {categoryList.map((category, index) => (
                    <li className={index === 0 ? 'first' : ''} key={category.name}> 
                        <div>
                            <p>{category.name}</p>
                            <p>{category.count}</p>
                        </div>
                    </li>
                ))}
               
            </ul>
        </div>
    );
}

export default CategoryRankList;