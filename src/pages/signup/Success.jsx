import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Success() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>어카처 회원가입 완료! </h1>
            <h1>환영합니다 </h1>
            <Button onClick={handleButtonClick}>어카처 이용하기</Button>

        </div>
    );
}

export default Success;