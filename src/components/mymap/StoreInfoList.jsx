import React, { useEffect, useState } from 'react';
import UrlPreview from 'components/mymap/UrlPreview';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const locationIcon = "/icon/markericon.png";

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
                    <UrlPreview url={store.storeUrl} />
                    
                    <div className='rank-wrap'>
                        <p className='rank'>{index + 1}위</p>
                        <p> 
                            <img src="/icon/icon-human.png" alt="사람" />
                            {store.paymentCount}
                        </p>
                    </div>

                    <div className='store-info-text'>
                        <div>
                            <p className='name'>{store.storeName}</p>
                            <p><a href={store.storeUrl} target="_blank" rel="noopener noreferrer">상세페이지 이동</a></p>
                        </div>
                        <p className='category'>{store.categoryName}</p>
                        <p className='addr'>{store.storeAddr}</p>
                        <p className='phone'>{store.storePhone}</p>
                    </div>
                     <Map center={{ lat: parseFloat(store.storeY), lng: parseFloat(store.storeX) }}
                     style={{ width: '100%', height: '150px'}}
                     level={3} >
                        <MapMarker position={{ lat: parseFloat(store.storeY), lng: parseFloat(store.storeX) }}
                         image={{
                            src: locationIcon,
                            size: {
                              width: 35,
                              height: 35,
                            },
                          }}
                        />
                    </Map>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default StoreInfoList;