import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import {  Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material';

function Card3() {
    const [formData, setFormData] = useState({
        serviceTOS: false,
        personalTOS: false,
        marketingTOS: false,
        thirdPartyTOS: false,
    });

    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태 

    let navigate = useNavigate();

    useEffect(() => {
        updateButtonState(); // 초기 상태에서 버튼 상태 설정
    }, [formData]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const updateButtonState = () => {
        // 모든 체크박스가 체크되었는지 확인
        const allRequiredChecked = Object.values(formData).every(value => value === true);
        setButtonEnabled(allRequiredChecked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (buttonEnabled) {
            setTimeout(() => navigate('/card4'), 300);
        } else {
            alert('모든 필수 항목에 동의해야 합니다.');
        }
    };

    const openModal = (content) => {
        const modalContents = {
            serviceTOS: `
                <h2>개인정보 수집 · 이용 동의</h2>
                <p>개인정보 수집 · 이용 동의 내용이 여기에 표시됩니다.</p>
            `,
            personalTOS: `
                <h2>고유식별 정보처리 동의</h2>
                <p>고유식별 정보처리 동의 내용이 여기에 표시됩니다.</p>
            `,
            marketingTOS: `
                <h2>홍보 및 마케팅 이용 동의</h2>
                <p>홍보 및 마케팅에 개인정보를 이용하는 것에 동의하십니까?</p>
            `,
            thirdPartyTOS: `
                <h2>통신사 이용약관 동의</h2>
                <p>통신사 이용약관 동의내용이 여기에 표시됩니다.</p>
            `,
        };

        setModalContent(modalContents[content]);
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
        setModalContent('');
    };

    return (
        <div style={{marginTop: '140px'}}>
            <ProgressBar
                stages={['카드 선택', '정보 입력', '동의 사항', '카드 수령', '결제 정보']}
                currentStage={'동의 사항'}
            />

            <div style={{ margin: 'auto 50px'}}>

            
            <div className="text-center" style={{marginBottom: '50px' }}>
                <h4 style={{marginTop: '65px', textAlign:'left'}}>카드 발급 관련 동의사항</h4>
                <p style={{color: '#6c757d', textAlign:'left'}}>
                    본인인증 서비스를 위한 인증 업체 약관을 동의해 주세요. 거부 시 본인인증이 불가하여 서비스를 이용하실 수 없습니다.
                </p>
            </div>

         
            <form id="agreementForm" onSubmit={handleSubmit}>
                <div className="terms">
                    <div className="d-flex justify-content-between align-items-center my-2">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="serviceTOS"
                                checked={formData.serviceTOS}
                                onChange={handleCheckboxChange}
                                required
                            />
                            <label className="form-check-label">
                                [필수] 개인정보 이용 동의
                            </label>
                        </div>
                        <Button variant="link" size="sm" onClick={() => openModal('serviceTOS')} style={{ color: '#476EFF' }}>보기</Button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center my-2">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="personalTOS"
                                checked={formData.personalTOS}
                                onChange={handleCheckboxChange}
                                required
                            />
                            <label className="form-check-label">
                                [필수] 고유식별 정보처리 동의
                            </label>
                        </div>
                        <Button variant="link" size="sm" onClick={() => openModal('personalTOS')} style={{ color: '#476EFF' }}>보기</Button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center my-2">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="marketingTOS"
                                checked={formData.marketingTOS}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label">
                                [필수] 서비스 이용약관 동의
                            </label>
                        </div>
                        <Button variant="link" size="sm" onClick={() => openModal('marketingTOS')} style={{ color: '#476EFF' }}>보기</Button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center my-2">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="thirdPartyTOS"
                                checked={formData.thirdPartyTOS}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label">
                                [필수] 통신사 이용약관 동의
                            </label>
                        </div>
                        <Button variant="link" size="sm" onClick={() => openModal('thirdPartyTOS')} style={{ color: '#476EFF' }}>보기</Button>
                    </div>
                </div>
                <div className="text-center mt-4" style={{}}>
                    <Button type="submit" variant="primary" size="lg" disabled={!buttonEnabled} style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '20px'
              }}>
                        다음
                    </Button>
                </div>
            </form>
            </div>

            {/* 부트스트랩 모달 */}
            <Modal show={isModalOpen} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>약관 내용</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div dangerouslySetInnerHTML={{ __html: modalContent }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Card3;
