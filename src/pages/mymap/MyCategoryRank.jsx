import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CategoryRankList from 'components/mymap/CategoryRankList';
import NoResult from 'components/mymap/NoResult';
import RandomImage from 'components/mymap/RandomImage';
import 'assets/Map.css';
import cookie from 'react-cookies';
import { options_GET } from 'services/CommonService';
import LoadingSpinner from 'components/LoadingSpinner';

function MyCategoryRank(props) {

    const location = useLocation();
    const { memberId } = location.state || ''; 
    console.log(memberId)

    const navigator = new useNavigate();    
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    //결제 내역의 카테고리 데이터 호출
    useEffect(() => {
        axios.get(`/api/paymentPlace/categories`, {
            params: {
                memberId: memberId
            }
        })
        .then(response => {
            setCategoryList(response.data); // 데이터를 상태에 저장
            setLoading(false);
        })
        .catch(error => {
            console.error('There was an error!', error);
            setLoading(false);
        });
    }, [memberId]);



    //버튼 클릭이벤트 - 페이지 이동
    const goMapAppPage = () => {
        navigator("/maphome/map" , { state: { categoryList, memberId }});
    }

    //나의 결제 내역이 없을 경우
    const goHome = () => {
        navigator('/');
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <div className='categoryRank-wrap contents'>
                {categoryList.length > 0 ? (
                    <>
                        <div className='categoryRank-title inner'>
                            <p>당신의 일상에 꼭 맞는 새로운 장소를 만나보세요.</p>
                            <h3>이번 달 내가 가장 자주 가는 곳은?</h3>
                        </div>
                        <RandomImage />
                        <CategoryRankList categoryList={categoryList} />
                        <div className='ranklist-btn inner'>
                            <button className='mymap-btn'  onClick={goMapAppPage}>
                                내 주변 탐색
                            </button>
                        </div>
                    </>
                ) : (
                    <div className='noReslut-wrap inner'>
                        <img src="/icon/white-exclamation-mark.png" alt="느낌표" 
                            style={{width:'30px', height:'150px'}}
                        />
                        <h2 style={{margin:'20px 0'}}>결제 내역이 없습니다</h2> 
                        <button className='mymap-btn'  onClick={goHome}>
                            홈으로 돌아가기
                        </button>
                    </div>
                    
                )}
            </div>
            {/* <div className='ranklist-btn inner'>
                <button 
                    className={`mymap-btn ${categoryList.length > 0 ? '' : 'home-btn'}`} 
                    onClick={categoryList.length > 0 ? goMapAppPage : goHome}>
                    {categoryList.length > 0 ? '내 주변 탐색' : '홈으로 돌아가기'}
                </button>
            </div> */}
        </div>
    );
}

export default MyCategoryRank;