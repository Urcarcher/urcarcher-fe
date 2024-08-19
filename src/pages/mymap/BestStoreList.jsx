import axios from 'axios';
import { useEffect, useState } from 'react';
import StoreInfoList from 'components/mymap/StoreInfoList';
import 'assets/Map.css';

function BestStoreList(props) {

    const [memberId, setMemberId] = useState('bleakwinter');  // 테스트할 회원 ID

    const [storeList, setStoreList] = useState([]);

    useEffect(() => {
        // 데이터 호출
        axios.get(`/api/paymentPlace/best-store`, {
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
            <div className='contents'>
                <div className='categoryRank-title inner'>
                    <h3>다른 사람이 많이 방문한 곳은 <br /> 어디일까요?</h3>
                </div>
                <StoreInfoList storeList={storeList} />
            </div>
        </div>
    );
}

export default BestStoreList;