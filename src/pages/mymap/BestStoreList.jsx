import axios from 'axios';
import { useEffect, useState } from 'react';
import StoreInfoList from 'components/mymap/StoreInfoList';
import 'assets/Map.css';
import NoResult from 'components/mymap/NoResult';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';

function BestStoreList(props) {

    const location = useLocation();
    const { memberId } = location.state || ''; 
    //console.log(memberId)
    const [storeList, setStoreList] = useState([]);
    const [loading, setLoading] = useState(true);

   

    useEffect(() => {
        axios.get(`/api/paymentPlace/best-store`, {
            params: {
                memberId: memberId
            }
        })
        .then(response => {
            setStoreList(response.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            console.error('There was an error!', error);
        });
    }, [memberId]);
    
    const navigator = new useNavigate();
    
    const goHome = () => {
        navigator('/');
    }

    //로딩 시 로딩 컴포넌트
    if (loading) {
        return <LoadingSpinner />;
    }

     // 로딩이 끝났지만 storeList가 빈 배열인 경우
     if (!loading && storeList.length === 0) {
        return (
            <div className='noReslut-wrap-bs inner'>
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
        );
    }

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