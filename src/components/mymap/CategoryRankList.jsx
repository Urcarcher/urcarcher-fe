import React, { useEffect, useState } from 'react';


function CategoryRankList({categoryList}) {

    //리스트 개별적으로 저장
    const [paymentCategoryList, setPaymentCategoryList] = useState([]);

    //리스트 한 개씩 나타내기 효과
    useEffect(() => {
        categoryList.forEach((item, index) => {
            setTimeout(() => {
                setPaymentCategoryList(prev => [...prev, item]);
            }, index * 700); 
        });
    }, [categoryList]); //categoryList가 변돌될 때 실행
    
    console.log(paymentCategoryList);

    return (
        <div className='rank-list-wrap'>
            <ul className='rank-list inner'>
                {/* paymentCategoryList로 각 항목을 렌더링 */}
                {paymentCategoryList.map((category, index) => (
                    <li 
                        key={index}
                        className={`${index === 0 ? 'first' : ''} ${index < paymentCategoryList.length ? 'show' : ''}`}
                    > 
                     <div>
                         <p className={index === 0 ? 'top-category' : ''}>{category.categoryName}</p>
                         <p>{category.usageCount}건</p>
                     </div>
                 </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryRankList;