import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./signup.css"
import welcome from 'assets/welcome.gif'

function Success() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 3000); // 3초 후에 자동으로 로그인 페이지로 이동

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, [navigate]);


    return (
        <div className="contents">
            <div className="mb-4 card">
                <img className="card-img-top" src={welcome} alt="welcome image" />
            <div className="card-body">
            <h1 className="card-text">환영합니다!</h1>
            <h3 className="card-text">어카처 회원이 되었어요</h3>
            {/* Illustration by <a href="https://icons8.com/illustrations/author/WsYoyZ6jp8sg">Victoria Chepkasova</a> from <a href="https://icons8.com/illustrations">Ouch!</a> */}
            </div>
            </div>
        </div>
    );
}

export default Success;