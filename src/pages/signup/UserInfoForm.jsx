import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function UserInfoForm({saveUserInfo, handleSubmit}) {
    const navi = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    }

    const submitHandler = () => {
        saveUserInfo(userInfo);
        handleSubmit();
        navi("/signup/success");
    }

    return (
        <div>
            <h1>회원 정보 입력</h1>
            <div>
                <label>이름:</label>
                <input type="text" name="name" value={userInfo.name} onChange={handleChange}/>
            </div>
            <div>
                <label>이메일:</label>
                <input type="email" name="email" value={userInfo.email} onChange={handleChange}/>
            </div>
            <div>
                <label>비밀번호:</label>
                <input type="password" name="password" value={userInfo.password} onChange={handleChange}/>
            </div>
            <Button className="divStyle1" onClick={submitHandler}>제출</Button>
        </div>
    );
}

export default UserInfoForm;