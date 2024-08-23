import React, { useEffect } from 'react';
import { Field } from 'formik';

const DaumPostcode = ({ setFieldValue }) => {
    useEffect(() => {
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
                주소 검색
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
                placeholder="기본 주소"
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
                placeholder="상세 주소"
            />
        </div>
    );
};

export default DaumPostcode;
