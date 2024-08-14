import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import CategoryRankList from '../../components/mymap/CategoryRankList';
import RandomImage from '../../components/mymap/RandomImage';
import './Map.css';
import NoResult from '../../components/mymap/NoResult';

function MyCategoryRank(props) {
    const navigator = new useNavigate();
    
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        // 여기에 서버에서 데이터를 받아오는 로직 추가
        // 예시:
        // fetch('/api/categoryList')
        //     .then(response => response.json())
        //     .then(data => setCategoryList(data));

        // 지금은 예시로 일정 시간 후에 데이터를 설정
        setTimeout(() => {  //나중에setTimeout은 삭제
            // 서버에서 데이터를 받아왔다고 가정
            setCategoryList([
                { name: "카테고리명1", count: "0" },
                { name: "카테고리명2", count: "0" },
                { name: "카테고리명3", count: "0" },
                { name: "카테고리명4", count: "0" },
                { name: "카테고리명5", count: "0" },
            ]);
        }, 500);
    }, []);

    //버튼 클릭이벤트 - 페이지 이동
    const goMapAppPage = () => {
        navigator("/maphome/map");
    }

    //나의 결제 내역이 없을 경우
    const goHome = () => {
        navigator('/');
    }
    return (
        <div>
            <Header />
            <div className='categoryRank-wrap contents'>
                {categoryList.length > 0 ? (
                    <>
                        <div className='categoryRank-title inner'>
                            <p>당신의 일상에 꼭 맞는 새로운 핫스팟을 만나보세요.</p>
                            <h3>이번 달 내가 가장 자주 가는 곳은?</h3>
                        </div>
                        <RandomImage />
                        <CategoryRankList categoryList={categoryList} />
                    </>
                ) : (
                    <NoResult />
                )}
            </div>
            {/* CategoryRankList가 null인 경우 버튼 다르게 */}
            <div className='ranklist-btn inner'>
                <button 
                    className={`mymap-btn ${categoryList.length > 0 ? '' : 'home-btn'}`} 
                    onClick={categoryList.length > 0 ? goMapAppPage : goHome}>
                    {categoryList.length > 0 ? '내 주변 탐색' : '홈으로 돌아가기'}
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default MyCategoryRank;