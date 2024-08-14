import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ConsentForm({saveConsentData}) {
    const navi = useNavigate();
    const [consentData, setConsentData] = useState({
        personalInfoConsent: false,
        locationConsent: false,
        matchingServiceConsent: false,
    })

    const handleChange = (e) => {
        const {name, checked} = e.target;
        setConsentData({
            ...consentData,
            [name]: checked,
        });
    };

    const clickHandler = () => {
        saveConsentData(consentData);
        navi("/signup/userinfo");
    }
    return (
        <div>
            <h1>내국인 회원가입</h1>
            <h2>이용 약관 및 개인정보처리방침</h2>
            <h3>
                <input 
                    type="checkbox"
                    name="personalInfoConsent"
                    checked={consentData.personalInfoConsent}
                    onChange={handleChange}
                />
                개인정보 수집 및 이용 (필수)
            </h3>
            <h3>
                <input 
                    type="checkbox"
                    name="locationConsent"
                    checked={consentData.locationConsent}
                    onChange={handleChange}
                />
                위치정보 이용 동의 (선택)
            </h3>
            <h3>
                <input 
                    type="checkbox"
                    name="matchingServiceConsent"
                    checked={consentData.matchingServiceConsent}
                    onChange={handleChange}
                />
                매칭 서비스 활용 동의 (선택)
            </h3>
            
            <Button className="divStyle1" onClick={clickHandler}>다음</Button>
            
        
        </div>
    );
}

export default ConsentForm;