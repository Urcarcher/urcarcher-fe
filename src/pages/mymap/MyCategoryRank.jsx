import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import CategoryRankList from '../../components/mymap/CategoryRankList';
import RandomImage from '../../components/mymap/RandomImage';
import './Map.css';
import NoResult from '../../components/mymap/NoResult';
import axios from 'axios';

function MyCategoryRank(props) {

    const navigator = new useNavigate();
    
    const [categoryList, setCategoryList] = useState([]);

    const [memberId, setMemberId] = useState('bleakwinter');  // 테스트할 회원 ID

    //서버로 부터 결제 내역의 카테고리 데이터 호출
    useEffect(() => {
        // 데이터 호출
        axios.get(`https://urcarcher-local.kro.kr:8443/api/paymentPlace/categories`, {
            params: {
                memberId: memberId
            }
        })
        .then(response => {
            setCategoryList(response.data); // 데이터를 상태에 저장
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }, [memberId]);



    //버튼 클릭이벤트 - 페이지 이동
    const goMapAppPage = () => {
        navigator("/maphome/map" , { state: { categoryList } });
    }

    //나의 결제 내역이 없을 경우
    const goHome = () => {
        navigator('/');
    }
    return (
        <div>
            {/* <Header /> */}
            <div className='categoryRank-wrap contents'>
                {categoryList.length > 0 ? (
                    <>
                        <div className='categoryRank-title inner'>
                            <p>당신의 일상에 꼭 맞는 새로운 장소를 만나보세요.</p>
                            <h3>이번 달 내가 가장 자주 가는 곳은?</h3>
                        </div>
                        <RandomImage />
                        <CategoryRankList categoryList={categoryList} />
                    </>
                ) : (
                    <NoResult />
                )}
            </div>
            {/* CategoryRankList가 null인 경우 홈 버튼으로 변경 */}
            <div className='ranklist-btn inner'>
                <button 
                    className={`mymap-btn ${categoryList.length > 0 ? '' : 'home-btn'}`} 
                    onClick={categoryList.length > 0 ? goMapAppPage : goHome}>
                    {categoryList.length > 0 ? '내 주변 탐색' : '홈으로 돌아가기'}
                </button>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default MyCategoryRank;