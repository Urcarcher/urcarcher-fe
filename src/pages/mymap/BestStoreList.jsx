import axios from 'axios';
import { useEffect, useState } from 'react';
import StoreInfoList from 'components/mymap/StoreInfoList';
import 'assets/Map.css';
import NoResult from 'components/mymap/NoResult';
import { useNavigate } from 'react-router-dom';

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
    
    const navigator = new useNavigate();
    
    const goHome = () => {
        navigator('/');
    }
    return (
        <div>
            <div className='contents'>
                {/* <div className='categoryRank-title inner'> */}
                <div className={storeList && storeList.length > 0 ? 'categoryRank-title inner' : 'hidden'} >
                    <h3>다른 사람이 많이 방문한 곳은 <br /> 어디일까요?</h3>
                </div>
                {storeList && storeList.length > 0 ? (
                    <StoreInfoList storeList={storeList} />
                ) : (
                <div className='noReslut-wrap inner'>
                    <img src="/icon/white-exclamation-mark.png" alt="느낌표" 
                        style={{width:'30px', height:'150px'}}
                    />
                    <h2 style={{margin:'20px 0'}}>방문 내역이 없습니다</h2> 
                    <button 
                        className='mymap-btn'
                        onClick={goHome}>
                       홈으로 돌아가기
                    </button>
                </div>
                )}
            </div>
        </div>
    );
}

export default BestStoreList;