import React, { useEffect, useState } from 'react';
import UrlPreview from './UrlPreview';

//테스트용
// const topstorelist = [
//     {name:"CGV 홍대"},
//     {name:"CGV 홍대1"},
//     {name:"CGV 홍대2"},
//     {name:"CGV 홍대3"},
// ];

function StoreInfoList({storeList}) {

    //리스트 개별 저장
    const [topStore, setTopStore] = useState([]);

    useEffect(() => {
        
        // storeList가 변경될 때 topStore 초기화
         setTopStore([]);

        storeList.forEach((item, index) => {
            setTimeout(() => {
                setTopStore(prev => [...prev, item]);
            }, index * 700); // 각 아이템이 0.2초 간격으로 나타남
        });
    }, [storeList]);
  
    return (
        <div>
            <ul className='top-store-list inner'>
            {topStore.map((store, index) => (
                    <li key={store.storeId} 
                        className={topStore.includes(store) ? 'show' : ''}
                    >
                    <p>{index + 1}위 / 이용 횟수:{store.paymentCount} </p>
                    <UrlPreview url={store.storeUrl} />
                    <div>
                        <p>{store.storeName}</p>
                        <p><a href={store.storeUrl} target="_blank" rel="noopener noreferrer">상세페이지 이동</a></p>
                        <p>{store.storeAddr}</p>
                        <p>{store.storePhone}</p>
                        <p>{store.categoryName}</p>
                    </div>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default StoreInfoList;