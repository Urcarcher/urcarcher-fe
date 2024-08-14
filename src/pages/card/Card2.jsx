import React, { useEffect, useState } from 'react';
import { Input, Switch, FormControlLabel,Button } from '@mui/material';
import { useCardContext } from './CardContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Card2() {
    const [idNum, setIdNum] = useState('');
    const [maskingNum, setMaskingNum] = useState(''); 
    const [postPaidTransport, setPostPaidTransport] = useState(false); // 교통기능신청상태 
    const {produceCardOffer, setProduceCardOffer} = useCardContext(); 
    
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [name, setName] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        // "bleakwinter" 회원의 데이터를 가져오는 API 호출
        axios.get('/api/members/bleakwinter')// 로그인된 id로 나중에 수정하기
            .then(response => {
                const memberData = response.data;
                setPhoneNumber(memberData.phoneNumber);
                setDateOfBirth(memberData.dateOfBirth);
                setName(memberData.name);
            })
            .catch(error => {
                console.error('Error fetching member data:', error);
            });
    }, []);

    const handleIdNumChange = (event) => {
        const originalValue = event.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
        const formattedValue = originalValue
            .replace(/^(\d{0,6})(\d{0,7})$/g, '$1-$2')
            .replace(/-{1,2}$/g, '');

        setIdNum(formattedValue);

        // 마스킹 처리
        if (originalValue.length > 6) {
            const masked = originalValue.replace(/(\d{6})(\d{1})(\d{6})/, '$1-$2******');
            setMaskingNum(masked);
        } else {
            setMaskingNum(formattedValue);
        }
    };

    const handleSwitchChange = (event) => {
        setPostPaidTransport(event.target.checked);
    };

    const handleSubmit = () => {
        const cardData = {
            idNum,
            postPaidTransport,
        };

        setProduceCardOffer(prevState => ({
            ...prevState,
            member_id:"bleakwinter", // 로그인된 id로 나중에 수정하기
            transportation:postPaidTransport // 선택된 교통 신청 여부 반영
        }));

        setTimeout(() => navigate('/card3'), 300);

    }

    return (
        <div>
            <div className="submit-container" id="regist-container">
                <h3>신청인 정보</h3>
                <div>
                    <p>이름</p>
                    <input id="name" type="text" value={name}/><br />
                </div>
               
                <div>
                    <p>휴대전화 번호</p>
                    <input id="phone" type="text" value={phoneNumber} /><br />
                </div>
                <div>
                    <p>주민/외국인등록번호</p>
                    <Input
                        placeholder={'-없이 숫자 13자리 입력'}
                        maxLength={14}
                        value={maskingNum || dateOfBirth}
                        onChange={handleIdNumChange}
                    />
                </div>
                <div>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={postPaidTransport}
                                onChange={handleSwitchChange}
                                name="postPaidTransport"
                                color="primary"
                            />
                        }
                        label="후불교통기능 신청"
                    />
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                    다음
                </Button>
            </div>
        </div>
    );
}

export default Card2;