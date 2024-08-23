import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'components/Header.css';
import { getTitle } from 'components/Pathname.js';  // 경로에 맞는 제목 설정 함수 임포트
import Logo from 'assets/logo5.png';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header>
            <div className='header-wrap'>
            {location.pathname === '/' ? (
            <p className='home-logo'>
                <img src={Logo} alt="로고" style={{width:'170px'}} />
            </p>
            ) : (
            <>
                <button onClick={() => navigate(-1)}>
                <img src="/icon/left-arrow.png" alt="화살표" />
                </button>
                <h5>{getTitle(location.pathname)}</h5>
            </>
            )}
            </div>
        </header>
    );
}

export default Header;