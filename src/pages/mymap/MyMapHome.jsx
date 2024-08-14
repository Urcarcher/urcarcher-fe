import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './Map.css';

function MyMapHome(props) { //시작 페이지

    const navigator = new useNavigate();

    //버튼 클릭이벤트 - 페이지 이동 (결제 내역 null 조건 추가하기)
    const goRankPage = () => {
        navigator("/maphome/categoryRank");
    }
    return (
        <div>
            <Header />
            <div className='mymaphome-wrap contents'>
                <div className='maphome-content inner'>
                    <div className='maphome_textwrap'>
                        <p>결제 내역으로 그린</p>
                        <p>나만의 지도</p>
                    </div>
                    <div>
                        <img src='/icon/map-main-img.png' alt="지도이미지" />
                    </div>
                </div>
                <div className='maphome-btn inner'>
                    <span>홍길동님의 결제 내역으로 장소를 추천합니다</span>
                    <button onClick={goRankPage}>시작하기</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MyMapHome;