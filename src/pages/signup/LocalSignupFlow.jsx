import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ConsentForm from './ConsentForm';
import UserInfoForm from './UserInfoForm';


function LocalSignupFlow(props) {
    const [consentData, setConsentData] = useState({
        personalInfoConsent: false,
        locationConsent: false,
        matchingServiceConsent: false,
    });

    const [userInfo, setUserInfo] = useState({
        name:'',
        email:'',
        password:'',
    });

    const saveConsentData = (data) =>{
        setConsentData(data);
    }
    
    const saveUserInfo = (info) => {
        setUserInfo(info);
    };

    const handleSubmit = () => {
        console.log('Submit to DB', {...userInfo, ...consentData});
    };

    return (
       <Routes>
            <Route path = "/" element={<ConsentForm saveConsentData={saveConsentData} />}/>
           
        </Routes>
    );
}

export default LocalSignupFlow;