import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RandomImage from '../../components/mymap/RandomImage';
import CategoryRankList from '../../components/mymap/CategoryRankList';
import './Map.css';  
import { useNavigate } from 'react-router-dom';

function MyCategoryRank(props) {
    const navigator = new useNavigate();

    //버튼 클릭이벤트 - 페이지 이동
    const goMapAppPage = () => {
        navigator("/maphome/map");
    }

    return (
        <div>
            <Header />
            <div className='categoryRank-wrap contents'>
                <div className='categoryRank-title inner'>
                    <p>당신의 일상에 꼭 맞는 새로운 핫스팟을 만나보세요.</p>
                    <h3>이번 달 내가 가장 자주 가는 곳은?</h3>
                </div>
                <RandomImage />
                <CategoryRankList />
            </div>
            <div className='ranklist-btn inner'>
                <button className='mymap-btn' 
                        onClick={goMapAppPage}>내 주변 탐색</button>
            </div>
            <Footer />
        </div>
    );
}

export default MyCategoryRank;