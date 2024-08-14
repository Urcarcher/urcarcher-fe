import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import StoreInfoList from '../../components/mymap/StoreInfoList';



function BestStoreList(props) {

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