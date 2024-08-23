import React, { useState } from 'react';
import { Formik, Form as FormikForm, Field } from "formik";
import { Form, Button } from "react-bootstrap";
import Axios from 'axios';

function SettingPassword(props) {
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
        //const isMatch = await verifyCurrentPassword(values.currentPassword);

        Axios.post('/api/card/checkpinnumber',{
            cardId : 3,  // 임시데이터(향후 수정 요망)
            pinNumber : values.currentPassword
        })
        .then((response)=>{
            setIsVerified(response);
        })
        .catch((error)=>{
            setIsVerified(false);
            alert('현재 PIN번호가 일치하지 않습니다.');
        })




        // if (isMatch) {
        //     setIsVerified(true);
        // } else {
        //     alert("현재 비밀번호가 일치하지 않습니다.");
        // }
    };

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
                                현재 비밀번호를 입력해주세요.
                            </Form.Label>
                            <Field
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                placeholder="Current Password"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <Button variant="primary" type="submit">
                                비밀번호 확인
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


                        if(!values.password1 || !values.password2){
                            alert("비밀번호를 모두 입력해주세요.")
                        }
                        else if(values.password1 !== values.password2){
                            alert("입력하신 비밀번호가 동일하지 않습니다.")
                        }else{

                            Axios.post('/api/card/changepinnumber',{
                                cardId : 3, // 임시데이터(향후 수정예정)
                                pinNumber : values.password1
                            })
                            .then(()=>{
                                alert('PIN 번호가 정상적으로 변경되었습니다.');
                                props.setShowModal(false)
                            })
                            .catch(()=>{
                                alert('PIN 번호 변경에 실패하였습니다.');
                            })
                        }
                    }}
                >
                    <FormikForm>
                        <div className="mb-3">
                            <Form.Label className="text-uppercase" htmlFor="password1">
                                변경하시고자 하는 비밀번호를 입력해주세요.
                            </Form.Label>
                            <Field
                                id="password1"
                                name="password1"
                                type="password"
                                placeholder="New Password"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Label className="text-uppercase" htmlFor="password2">
                                변경하시고자 하는 비밀번호를 다시 입력해주세요.
                            </Form.Label>
                            <Field
                                id="password2"
                                name="password2"
                                type="password"
                                placeholder="Again New Password"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <Button variant="primary" type="submit">
                                변경신청
                            </Button>
                        </div>
                    </FormikForm>
                </Formik>
            )}
        </div>
    );
}

export default SettingPassword;
