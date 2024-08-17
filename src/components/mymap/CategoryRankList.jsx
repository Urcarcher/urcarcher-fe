import { useData } from 'pages/mymap/DataContext';
import React, { useEffect, useState } from 'react';


function CategoryRankList({categoryList}) { //{categoryList}
    
    //const { categoryList } = useData();  // Get categoryList from DataContext.js

    //DB에서 가져올 많이 결제 한 카테고리 리스트 저장
    const [paymentCategoryList, setPaymentCategoryList] = useState([]);

    
    //list 한 개씩 나타남
    useEffect(() => {
        categoryList.forEach((item, index) => {
            setTimeout(() => {
                setPaymentCategoryList(prev => [...prev, item]);
            }, index * 700); // 각 아이템이 0.2초 간격으로 나타남
        });
    }, []);

    console.log(paymentCategoryList);

    return (
        <div className='rank-list-wrap'>
            <ul className='rank-list inner'>
                {/* 카운트 수 제일 큰 것 부터 */}
                {categoryList.map((category, index) => (
                     <li 
                     key={index}
                     className={`${index === 0 ? 'first' : ''} ${categoryList.some(item => item.categoryName === category.categoryName) ? 'show' : ''}`}
                 > 
                     <div>
                         <p>{category.categoryName}</p>
                         <p>{category.usageCount}건</p>
                     </div>
                 </li>
                ))}
               
            </ul>
        </div>
    );
}

export default CategoryRankList;