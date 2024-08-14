import React, { useEffect, useState } from 'react';


function CategoryRankList({categoryList}) {
    
    //DB에서 가져올 많이 결제 한 카테고리 리스트 저장
    const [paymentCategoryList, setPaymentCategoryList] = useState([]);

    
    //list가 한 개씩 나타남
    useEffect(() => {
        categoryList.forEach((item, index) => {
            setTimeout(() => {
                setPaymentCategoryList(prev => [...prev, item]);
            }, index * 700); // 각 아이템이 0.2초 간격으로 나타남
        });
    }, []);


    return (
        <div className='rank-list-wrap'>
            <ul className='rank-list inner'>
                {/* 카운트 수 제일 큰 것 부터 */}
                {categoryList.map((category, index) => (
                    <li 
                        key={category.name}
                        className={`${index === 0 ? 'first' : ''} ${paymentCategoryList.some(item => item.name === category.name) ? 'show' : ''}`}
                    > 
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