import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 임포트

function UserInfoForm() {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        memberId: '',
        password: '',
        name: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        email: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        console.log(e);
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method:"post",
            url:`/api/signup/local`,
            data:userInfo,
        })
        .then((res) => {
            alert(`성공적으로 입력되었습니다.`);
            navigate("/signup/success");
        })
        .catch((error) => {
            throw new Error(error);
        });
    };
            

    return (
        <div>
            <h1>회원 정보 입력</h1>
            <form id="signup" onSubmit={handleSubmit} className="container">
            <div>
                <label>ID:</label>
                <input 
                    type="text" 
                    name="memberId" 
                    value={userInfo.memberId} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label>PW:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={userInfo.password} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label>이름:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={userInfo.name} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label>생년월일:</label>
                <input 
                    type="date" 
                    name="dateOfBirth" 
                    value={userInfo.dateOfBirth} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label>성별:</label>
                <input 
                    type="radio" 
                    name="gender" 
                    value="male" 
                    checked={userInfo.gender === 'male'} 
                    onChange={handleChange} 
                /> 남성
                <input 
                    type="radio" 
                    name="gender" 
                    value="female" 
                    checked={userInfo.gender === 'female'} 
                    onChange={handleChange} 
                /> 여성
            </div>
            <div>
                <label>국적:</label>
                <input 
                    type="checkbox" 
                    name="nationality" 
                    value="Korean" 
                    checked={userInfo.nationality === 'Korean'} 
                    onChange={handleChange} 
                /> 한국
            </div>
            <div>
                <label>이메일:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={userInfo.email} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label>연락처:</label>
                <input 
                    type="text" 
                    name="phoneNumber" 
                    value={userInfo.phoneNumber} 
                    onChange={handleChange} 
                />
            </div>
            <input className="btn btn-primary" type="submit" value="입력하기" />
             </form>
        </div>
    );
}

export default UserInfoForm;
