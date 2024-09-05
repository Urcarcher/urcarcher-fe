import React, { useEffect,useState } from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';


const DaumPostcode = ({ setFieldValue }) => {

    const { t, i18n } = useTranslation();
    const changeLanguage = (selectedLanguage) => {
        
        const languageMap = {
            Korea: 'ko',
            English: 'en',
            Japan: 'jp',
            China: 'cn'
        };

        const languageCode = languageMap[selectedLanguage] 
        i18n.changeLanguage(languageCode);
       
    };


    useEffect(() => {

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


        const script = document.createElement('script');
        script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${extraAddress}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setFieldValue("address", fullAddress);  // 기본 주소를 Formik의 Field 값으로 설정
        setFieldValue("detailAddress", ""); // 상세 주소 초기화
    };

    const handleClick = () => {
        new window.daum.Postcode({
            oncomplete: handleComplete,
        }).open();
    };

    return (
        <div>
            <button type="button" onClick={handleClick}
             style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px',
                display: 'flex', justifyContent: 'flex-start'
              }}>
                {t('AddressSearch')}
            </button>
            <Field
                id="address"
                name="address"
                className="form-control"
                style={{
                    padding: '12px 12px 8px 12px',
                    fontSize: '14px',
                    color: '#333',
                    borderColor: '#ced4da',
                    marginBottom: '12px'
                }}
                placeholder={t('PrimaryAddress')}
            />
            <Field
                id="detailAddress"
                name="detailAddress"
                className="form-control"
                style={{
                    padding: '12px 12px 8px 12px',
                    fontSize: '14px',
                    color: '#333',
                    borderColor: '#ced4da',
                }}
                placeholder={t('DetailedAddress')}
            />
        </div>
    );
};

export default DaumPostcode;