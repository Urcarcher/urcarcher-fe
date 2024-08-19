import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    // 경로에 따라 제목을 설정하는 함수 (수정하기)
    const getTitle = (pathname) => {
        switch (pathname) {
            case '/maphome':
            case '/maphome/map':
            case '/maphome/categoryRank':
            case '/maphome/beststorelist':
                return '나만의 지도';
            case '/courseList':
                return '여행 코스';
            case '/card':
                return '카드 신청';
            case '/login':
                return '로그인';
            // => 추가 경로에 따라 제목 설정
            case '/exchange':
                return '환전';
            case '/exchange/card':
                return '카드 선택';
            case '/exchange/currency':
                return '환전';
            case '/exchange/set':
                return '자동 환전';
            default:
                return '홈';
        }
    };

    // '/' 경로일 때 헤더를 숨기기
    if (location.pathname === '/') {
        return null; 
    }
 
    return (
        <header>
            <div className='header-wrap'>
                <button
                    onClick={() => navigate(-1)}  // 뒤로 가기 버튼 클릭 시 이전 페이지로 이동
                >
                    <img src="/icon/left-arrow.png" alt="화살표" />
                </button>
                <h3>{getTitle(location.pathname)}</h3> {/* 경로에 맞는 제목 표시 */}
            </div>
        </header>
    );
}

export default Header;