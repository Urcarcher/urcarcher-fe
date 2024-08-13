import React, { useState } from 'react';
import { Input, Switch, FormControlLabel } from '@mui/material';

function Card2() {
    const [idNum, setIdNum] = useState('');
    const [maskingNum, setMaskingNum] = useState(''); 
    const [postPaidTransport, setPostPaidTransport] = useState(false);

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

    const handlePayment = (method) => {
        console.log(`Pay with ${method}`);
    };

    const handleSwitchChange = (event) => {
        setPostPaidTransport(event.target.checked);
    };


    return (
        <div>
            <div className="submit-container" id="regist-container">
                <h3>신청인 정보</h3>
                <div>
                    <p>이름</p>
                    <input id="name" type="text" placeholder="실명 입력"/><br />
                </div>
               
                <div>
                    <p>휴대전화 번호</p>
                    <input id="phone" type="text"  /><br />
                </div>
                <div>
                    <p>주민/외국인등록번호</p>
                    <Input
                        placeholder={'-없이 숫자 13자리 입력'}
                        maxLength={14}
                        value={maskingNum}
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

                <button id="regist-btn" className="btn-green" disabled>다음</button>
            </div>
        </div>
    );
}

export default Card2;
