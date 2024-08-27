import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { Modal } from 'react-bootstrap';
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        updateButtonState();
    }, [formData]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const updateButtonState = () => {
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
            <h4 style="text-align: left;">개인정보 수집 및 이용 동의</h4>
            <p style="text-align: left;">당사는 카드 발급 및 서비스 제공을 위해 귀하의 개인정보를 수집, 이용합니다. 수집된 개인정보는 관련 법령에 따라 안전하게 관리되며, 다음과 같은 목적으로 이용됩니다.</p>
            <h5 style="text-align: left;">1. 수집 항목</h5>
            <ul style="text-align: left;">
                <li>• 성명, 주민등록번호, 연락처, 주소, 이메일 주소</li>
                <li>• 카드 이용 내역, 결제 정보, 계좌 정보</li>
            </ul>
            <h5 style="text-align: left;">2. 이용 목적</h5>
            <ul style="text-align: left;">
                <li>• 카드 발급 및 관리</li>
                <li>• 고객 상담 및 민원 처리</li>
                <li>• 신용평가 및 연체관리</li>
                <li>• 이벤트 및 프로모션 정보 제공</li>
            </ul>
            <h5 style="text-align: left;">3. 보유 및 이용 기간</h5>
            <ul style="text-align: left;">
                <li>• 카드 해지 후 5년간 보관</li>
                <li>• 법령에서 정한 기간 동안 보관</li>
            </ul>
            <h5 style="text-align: left;">4. 동의 거부 권리 및 불이익</h5>
            <p style="text-align: left;">귀하는 개인정보 수집 및 이용 동의를 거부할 권리가 있으며, 다만, 동의를 거부하실 경우 카드 발급 및 서비스 제공이 제한될 수 있습니다.</p>
            `,
            personalTOS: `
            <h4 style="text-align: left;">고유식별 정보처리 동의</h4>
            <p style="text-align: left;">본인은 당사가 다음과 같은 목적으로 고유식별정보를 처리하는 것에 동의합니다.</p>
            <h5 style="text-align: left;">1. 처리 항목</h5>
            <ul style="text-align: left;">
                <li>• 주민등록번호, 외국인등록번호, 여권번호, 운전면허번호</li>
            </ul>
            <h5 style="text-align: left;">2. 처리 목적</h5>
            <ul style="text-align: left;">
                <li>• 신용카드 발급 및 본인 확인</li>
                <li>• 신용평가 및 부정사용 방지</li>
                <li>• 법령에 따른 의무 이행</li>
            </ul>
            <h5 style="text-align: left;">3. 보유 및 이용 기간</h5>
            <ul style="text-align: left;">
                <li>• 카드 해지 후 5년간 보관</li>
                <li>• 법령에서 정한 기간 동안 보관</li>
            </ul>
            <h5 style="text-align: left;">4. 동의 거부 권리 및 불이익</h5>
            <p style="text-align: left;">귀하는 고유식별정보 처리에 대한 동의를 거부할 권리가 있으며, 거부 시 카드 발급 및 서비스 제공이 제한될 수 있습니다.</p>
        `,
            marketingTOS: `
            <h4 style="text-align: left;">마케팅 정보 수신 동의</h4>
            <p style="text-align: left;">본인은 당사가 귀하에게 다양한 마케팅 정보를 제공하는 것에 동의합니다.</p>
            <h5 style="text-align: left;">1. 수집 항목</h5>
            <ul style="text-align: left;">
                <li>• 이메일 주소, 전화번호, 우편물 수신 주소</li>
            </ul>
            <h5 style="text-align: left;">2. 이용 목적</h5>
            <ul style="text-align: left;">
                <li>• 신규 상품 및 서비스 안내</li>
                <li>• 이벤트 및 프로모션 정보 제공</li>
                <li>• 고객 맞춤형 서비스 및 혜택 제공</li>
            </ul>
            <h5 style="text-align: left;">3. 보유 및 이용 기간</h5>
            <ul style="text-align: left;">
                <li>• 동의 철회 시까지</li>
            </ul>
            <h5 style="text-align: left;">4. 동의 거부 권리 및 불이익</h5>
            <p style="text-align: left;">귀하는 마케팅 정보 수신에 대한 동의를 거부할 권리가 있으며, 동의를 거부하셔도 카드 발급 및 기본 서비스는 이용하실 수 있습니다.</p>
        `,
            thirdPartyTOS: `
            <h4 style="text-align: left;">제3자 정보 제공 동의</h4>
            <p style="text-align: left;">본인은 당사가 제3자에게 개인정보를 제공하는 것에 동의합니다.</p>
            <h5 style="text-align: left;">1. 제공 대상</h5>
            <ul style="text-align: left;">
                <li>• 제휴사: 금융기관, 신용정보회사, 보험사 등</li>
                <li>• 서비스 제공 업체: 결제 대행사, 배송 업체 등</li>
            </ul>
            <h5 style="text-align: left;">2. 제공 항목</h5>
            <ul style="text-align: left;">
                <li>• 성명, 연락처, 거래 내역, 카드 이용 정보</li>
            </ul>
            <h5 style="text-align: left;">3. 제공 목적</h5>
            <ul style="text-align: left;">
                <li>• 제휴 서비스 제공 및 혜택 안내</li>
                <li>• 결제 처리 및 배송 서비스 제공</li>
                <li>• 신용평가 및 보험 가입</li>
            </ul>
            <h5 style="text-align: left;">4. 보유 및 이용 기간</h5>
            <ul style="text-align: left;">
                <li>• 제공 목적 달성 시까지</li>
            </ul>
            <h5 style="text-align: left;">5. 동의 거부 권리 및 불이익</h5>
            <p style="text-align: left;">귀하는 제3자 정보 제공 동의를 거부할 권리가 있으며, 거부 시 일부 서비스 제공에 제한이 있을 수 있습니다.</p>
        `,
        };

        setModalContent(modalContents[content]);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    return (
        <div style={{ marginTop: '140px' }}>
            <ProgressBar
                stages={['카드 선택', '정보 입력', '동의 사항', '카드 수령', '결제 정보']}
                currentStage={'동의 사항'}
            />

            <div style={{ margin: 'auto 50px' }}>
                <div className="text-center" style={{ marginBottom: '50px' }}>
                    <h4 style={{ marginTop: '65px', textAlign: 'left' }}>카드 발급 관련 동의사항</h4>
                    <p style={{ color: '#6c757d', textAlign: 'left' }}>
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
                                    [필수] 개인정보 수집 및 이용 동의
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
                                    [필수] 마케팅 정보 수신 동의
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
                                    [필수] 제3자 정보 제공 동의
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
