import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StoreInfoList from '../../components/mymap/StoreInfoList';

function BestStoreList(props) {

    
    //전체 결제 내역 중 건수가 많은 가맹점 정보 저장
    const [storeList , setStoreList] = useState([]);

    return (
        <div>
            <Header />
            <div className='contents'>
                <div className='categoryRank-title inner'>
                    <h3>이번 달 다른 사람이 많이 방문한 곳은?</h3>
                </div>
                <StoreInfoList />
            </div>
            <Footer />
        </div>
    );
}

export default BestStoreList;