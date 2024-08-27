import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./signup.css"

function Success() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/login');
    };

    return (
        <div className="contents">
            <div className="mb-4 card">
                <img className="card-img-top" src="/img/mockup4.jpg" alt="Card image cap" />
            <div className="card-body">
            <h1 className="card-text">어카처 회원가입 완료! </h1>
            </div>
            <Button className="my-btn" onClick={handleButtonClick}>어카처 이용하기</Button>
            {/* <Button className="my-btn" onClick={handleButtonClick}>로그인</Button> */}
            </div>
        </div>
    );
}

export default Success;