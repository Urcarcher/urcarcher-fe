import React, {  useEffect, useState } from 'react';
import { Formik, Form as FormikForm, Field } from "formik";
import { Form, Button } from "react-bootstrap";
import Axios from 'axios';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';


function SettingPassword(props) {

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


    const [isVerified, setIsVerified] = useState(false);  // 비밀번호 검증 상태를 저장

    // 현재 비밀번호 확인 함수 (여기서 실제 DB 확인 로직이 필요)
    const verifyCurrentPassword = async (password) => {
        // 여기에 실제로 DB에 비밀번호를 확인하는 로직을 작성
        // 예: const response = await axios.post('/api/verify-password', { password });

        // 비밀번호가 일치한다고 가정하고 true를 반환
        // 실제 구현에서는 response.data.result 또는 유사한 값을 사용해야 함
        return true;  // 실제 검증에서는 DB 값과 비교해야 함 -- 일단은 true로 설정해놓음
    };

    const handleVerifyPassword = async (values) => {
        if(!values.currentPassword) {
            alert(t('EnterPIN2'));
        }else if(values.currentPassword.length !== 4){
            alert(t('PINMustBe4Digits'))
        }else{
            Axios.post('/api/card/checkpinnumber',{
                cardId : String(props.card.cardId),
                pinNumber : String(values.currentPassword)
            })
            .then((response)=>{
                setIsVerified(response);
            })
            .catch((error)=>{
                setIsVerified(false);
                alert(t('CurrentPINNotMatching'));
            })
        }
    };

    
    useEffect(()=>{
    
        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }
    },[]);


    return (
        <div>
            {!isVerified ? (
                <Formik
                    initialValues={{ currentPassword: "" }}
                    onSubmit={handleVerifyPassword}
                >
                    <FormikForm>
                        <div className="mb-3">
                            <Form.Label className="text-uppercase" htmlFor="currentPassword">
                            {t('EnterCurrentPIN')}
                            </Form.Label>
                            <Field
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                placeholder="Current Password"
                                className="form-control"
                                maxLength="4"
                            />
                        </div>
                        <div className="mb-3">
                            <Button variant="primary" type="submit">
                            {t('ConfirmPIN')}
                            </Button>
                        </div>
                    </FormikForm>
                </Formik>
            ) : (
                <Formik
                    key={isVerified}
                    initialValues={{
                        password1: "",
                        password2: "",
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500))

                        if (values.currentPassword && values.currentPassword.length === 4){

                        }

                        if(!values.password1 || !values.password2){
                            alert(t('EnterAllPIN'))
                        }
                        else if(values.password1 !== values.password2){
                            alert(t('EnterAllPIN'))
                        }
                        else if(values.password1.length !== 4 || values.password2.length !== 4){
                            alert(t('PINMustBe4Digits'))
                        }
                        else{
                            //console.log(props.card.cardId);
                            Axios.post('/api/card/changepinnumber',{
                                cardId : String(props.card.cardId),
                                pinNumber : String(values.password1)
                            })
                            .then(()=>{
                                alert(t('PINChangeSuccess'));
                                props.setShowModal(false)
                            })
                            .catch(()=>{
                                alert(t('PINChangeFailure'));
                            })
                        }
                    }}
                >
                    <FormikForm>
                        <div className="mb-3">
                            <Form.Label className="text-uppercase" htmlFor="password1">
                            {t('EnterNewPIN')}
                            </Form.Label>
                            <Field
                                id="password1"
                                name="password1"
                                type="password"
                                placeholder="New Password"
                                className="form-control"
                                maxLength="4"
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Label className="text-uppercase" htmlFor="password2">
                            {t('ReEnterNewPIN')}
                            </Form.Label>
                            <Field
                                id="password2"
                                name="password2"
                                type="password"
                                placeholder="Again New Password"
                                className="form-control"
                                maxLength="4"
                            />
                        </div>
                        <div className="mb-3">
                            <Button variant="primary" type="submit">
                            {t('ChangePIN')}
                            </Button>
                        </div>
                    </FormikForm>
                </Formik>
            )}
        </div>
    );
}

export default SettingPassword;
