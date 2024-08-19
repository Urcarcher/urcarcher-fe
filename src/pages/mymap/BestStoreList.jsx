import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import StoreInfoList from '../../components/mymap/StoreInfoList';
import axios from 'axios';

function BestStoreList(props) {

    const [memberId, setMemberId] = useState('bleakwinter');  // 테스트할 회원 ID

    const [storeList, setStoreList] = useState([]);

    useEffect(() => {
        // 데이터 호출
        axios.get(`https://urcarcher-local.kro.kr:8443/api/paymentPlace/best-store`, {
            params: {
                memberId: memberId
            }
        })
        .then(response => {
            setStoreList(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }, [memberId]);


    return (
        <div>
            {/* <Header /> */}
            <div className='contents'>
                <div className='categoryRank-title inner'>
                    <h3>다른 사람이 많이 방문한 곳은 어디일까요?</h3>
                </div>
                <StoreInfoList storeList={storeList} />
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default BestStoreList;