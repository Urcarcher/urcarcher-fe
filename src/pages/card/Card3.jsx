import React, { useState, useEffect } from 'react';
import '../../assets/Card3.css';
import { useNavigate } from 'react-router-dom';

function Card3() {
    const [formData, setFormData] = useState({
        serviceTOS: false,
        personalTOS: false,
        marketingTOS: false,
        thirdPartyTOS: false,
    });

    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [modalContent, setModalContent] = useState(null);
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
        const allRequiredChecked = formData.serviceTOS && formData.personalTOS;
        setButtonEnabled(allRequiredChecked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.serviceTOS && formData.personalTOS) {
            alert('폼이 제출되었습니다!');
        } else {
            alert('동의하지 않으면 회원가입이 불가능합니다.');
        }
    };

    const openModal = (content) => {
        const modalContents = {
            serviceTOS: `
                <div class="toscontainer">
                    <h2>개인정보 수집 · 이용 동의</h2>
                    <p>개인정보 수집 · 이용 동의 내용이 여기에 표시됩니다.</p>
                    <!-- 추가 내용 작성 -->
                </div>
            `,
            personalTOS: `
                <div class="toscontainer">
                    <h2>고유식별 정보처리 동의</h2>
                    <p>고유식별 정보처리 동의 내용이 여기에 표시됩니다.</p>
                    <!-- 추가 내용 작성 -->
                </div>
            `,
            marketingTOS: `
                <div class="toscontainer">
                    <h2>홍보 및 마케팅 이용 동의</h2>
                    <p>는 회원님께서 동의하신 경우에 한하여 회원님의 개인정보를 바탕으로 새롬터의 이벤트, 프로모션, 할인 혜택 등 다양한 마케팅 정보를 제공하기 위해 아래와 같이 개인정보를 이용하고자 합니다.</p>
                    <ul>
                        <li>이용 목적: 이벤트, 프로모션, 할인 혜택 등 마케팅 정보 제공</li>
                        <li>수집 항목: 이름, 이메일 주소, 휴대전화번호</li>
                        <li>보유 및 이용 기간: 회원 탈퇴 시까지</li>
                        <li>동의를 거부할 권리 및 동의 거부에 따른 불이익: 회원님은 동의를 거부하실 권리가 있으며, 동의를 거부하시는 경우에도 서비스 이용에 제한은 없습니다. 단, 마케팅 정보 제공 서비스는 받으실 수 없습니다.</li>
                    </ul>
                    <p>위와 같이 홍보 및 마케팅에 개인정보를 이용하는 것에 동의하십니까?</p>
                </div>
            `,
            thirdPartyTOS: `
                <div class="toscontainer">
                    <h2>통신사 이용약관 동의</h2>
                    <p>통신사 이용약관 동의내용이 여기에 표시됩니다.</p>
                    <!-- 추가 내용 작성 -->
                </div>
            `,
        };

        setModalContent(modalContents[content]);
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
        setModalContent(null);
    };

    return (
        <div className="container">
            <div className="title">
                <h2>카드발급 관련 동의사항</h2>
                <p>
                    카드 발급을 위해 '서비스 이용약관'과 '개인정보 수집 · 이용 동의'에 동의해 주셔야
                    합니다. 체크 후 [동의하고 계속하기]를 눌러주세요.
                </p>
            </div>
            <form id="agreementForm" onSubmit={handleSubmit}>
                <div className="terms">
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="serviceTOS"
                                checked={formData.serviceTOS}
                                onChange={handleCheckboxChange}
                                required
                            />
                            [필수] 개인정보 이용 동의
                        </label>
                        <button type="button" onClick={() => openModal('serviceTOS')}>보기</button> {/* <a> 태그 대신 <button> 사용 */}
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="personalTOS"
                                checked={formData.personalTOS}
                                onChange={handleCheckboxChange}
                                required
                            />
                            [필수] 고유식별 정보처리 동의
                        </label>
                        <button type="button" onClick={() => openModal('personalTOS')}>보기</button> {/* <a> 태그 대신 <button> 사용 */}
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="marketingTOS"
                                checked={formData.marketingTOS}
                                onChange={handleCheckboxChange}
                            />
                            [필수] 서비스 이용약관 동의
                        </label>
                        <button type="button" onClick={() => openModal('marketingTOS')}>보기</button> {/* <a> 태그 대신 <button> 사용 */}
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="thirdPartyTOS"
                                checked={formData.thirdPartyTOS}
                                onChange={handleCheckboxChange}
                            />
                            [필수] 통신사 이용약관 동의
                        </label>
                        <button type="button" onClick={() => openModal('thirdPartyTOS')}>보기</button> {/* <a> 태그 대신 <button> 사용 */}
                    </div>
                </div>
                <div className="btn-container">
                    <button type="submit" 
                    className={`btn ${buttonEnabled ? 'active' : ''}`} 
                    disabled={!buttonEnabled}
                    onClick={() => {
                        setTimeout(() => navigate('/card4'), 300);
                    }}
                    >
                        동의하고 계속하기
                    </button>
                </div>
            </form>

            {/* 모달 */}
            {isModalOpen && ( // 모달 상태에 따라 조건부 렌더링
                <div id="modal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div id="modal-text" dangerouslySetInnerHTML={{ __html: modalContent }} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Card3;