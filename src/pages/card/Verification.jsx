import CardOverlay from 'bootstrap-template/components/cards/CardOverlay';
import { Formik, Form as FormikForm, Field } from "formik";
import React from 'react';
import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';

function Verification() {
   
    return (
        <>
        <br/>
        <br/>
        <br/>
        <Container>
            <Title style={{textAlign:'left', margin:'20px 10px'}}>신분증정보</Title>
            <Tabs
                defaultActiveKey="driver's license"
                id="fill-tab-example"
                className="mb-3"
                fill
                >
                <Tab eventKey="driver's license" title="운전면허증">
                <br/>
                    <br/>
                    <CardOverlay
                        className="my-custom-class" 
                        img={'/img/cert_drive.png'}
                    />
                    <br/>
                    <br/>

                    <Formik>
                        <FormikForm>
                            <Row>
                                <SmallSelect aria-label="Default select example">
                                    <option>선택</option>
                                    <option value="11">11-서울</option>
                                    <option value="12">12-부산</option>
                                    <option value="13">13-경기</option>
                                    <option value="14">14-강원</option>
                                    <option value="15">15-충북</option>
                                    <option value="16">16-충남</option>
                                    <option value="17">17-전북</option>
                                    <option value="18">18-전남</option>
                                    <option value="19">19-경북</option>
                                    <option value="20">20-경남</option>
                                    <option value="21">21-제주</option>
                                    <option value="22">22-대구</option>
                                    <option value="23">23-인천</option>
                                    <option value="24">24-광주</option>
                                    <option value="25">25-대전</option>
                                    <option value="26">26-울산</option>
                                    <option value="28">28-없음</option>
                                </SmallSelect>

                                <div className="mb-3" style={{ flex: 1 }}>
                                    <FullWidthInput
                                        id="cert_drive"
                                        name="cert_drive"
                                        type="text"
                                        placeholder="면허번호를 입력해주세요."
                                        className="form-control"
                                    />
                                </div>
                            </Row>
                            <br/>
                        </FormikForm>
                    </Formik>
                    <p style={{fontWeight:'bold', textAlign:'left', margin:'0'}}>지역이나 앞 두자리 숫자를 선택 바랍니다.</p>
                    <p style={{color:'red', fontWeight:'bold', textAlign:'left'}}>지역선택은 필수입니다.</p>
                </Tab>

                <Tab eventKey="ID Card" title="주민등록증">
                <br/>
                    <br/>
                    <CardOverlay
                        className="my-custom-class" 
                        img={'/img/cert_jumin.png'}
                    />
                    <br/>
                    <br/>

                    <Formik>
                        <FormikForm>
                            <div className="mb-3">
                                <Form.Label className="text-uppercase" htmlFor="cert_idCard">
                                    발급일자 입력
                                </Form.Label>
                                <Field
                                    id="cert_idCard"
                                    name="cert_idCard"
                                    type="text"
                                    placeholder="발급일자를 입력해주세요."
                                    className="form-control"
                                />
                            </div>
                            <br/>
                        </FormikForm>
                    </Formik>
                </Tab>

                <Tab eventKey="alien registration card" title="외국인 등록증">
                    <br/>
                    <br/>
                    <CardOverlay
                        className="my-custom-class" 
                        img={'/img/cert_foriCard.png'}
                    />
                    <br/>
                    <br/>

                    <Formik>
                        <FormikForm>
                            <div className="mb-3">
                                <Form.Label className="text-uppercase" htmlFor="cert_foriCard1">
                                    발급일자 입력
                                </Form.Label>
                                <Field
                                    id="cert_foriCard1"
                                    name="cert_foriCard1"
                                    type="text"
                                    placeholder="발급일자를 입력해주세요."
                                    className="form-control"
                                />
                            </div>
                            <br/>

                            <div className="mb-3">
                                <Form.Label className="text-uppercase" htmlFor="cert_foriCard2">
                                    일련번호(신분증 뒷면) 입력
                                </Form.Label>
                                <Field
                                    id="cert_foriCard2"
                                    name="cert_foriCard2"
                                    type="text"
                                    placeholder="일련번호(신분증 뒷면)를 입력해주세요."
                                    className="form-control"
                                />
                            </div>
                        </FormikForm>
                    </Formik>
                </Tab>
            </Tabs>

            <Button 
                style={{
                    width:'250px',
                    position: 'fixed', 
                    bottom: '120px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                }}
                >
            신분증 확인
            </Button>
        </Container>
        </>
    );
}

const Container = styled.div`
  width: 400px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SmallSelect = styled(Form.Select)`
  width: 100px;
  transform: translateY(-8px);
`;

const FullWidthInput = styled(Field)`
  flex: 1;
`;

export default Verification;