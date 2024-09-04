import React, { useEffect,useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "assets/Test.css";
import "./signup.css"
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';



function ConsentForm() {
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


  const navi = useNavigate();
  const [consentData, setConsentData] = useState({
    informationConsent: false,
    locationConsent: false,
    matchingConsent: false,
  });

  const [showModal, setShowModal] = useState(null); // 현재 열린 모달을 추적
  const [errorMessage, setErrorMessage] = useState("");

  // 각 약관을 본 상태를 추적
  const [viewedTerms, setViewedTerms] = useState({
    information: false,
    location: false,
    matching: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setConsentData({
      ...consentData,
      [name]: checked,
    });
  };

  const clickHandler = () => {
    if (!consentData.informationConsent) {
      setErrorMessage(t('MandatoryAgree'));
      return;
    }
    if (
      !viewedTerms.information ||
      !viewedTerms.location ||
      !viewedTerms.matching
    ) {
      setErrorMessage(t('AllAgree'));
      return;
    }
    navi("/signup/userinfo", { state: { consentData } });
  };

  const handleShowModal = (modalType) => {
    setShowModal(modalType);
    // 모달을 열 때 해당 약관에 대한 체크박스도 체크
    setConsentData(prevState => ({
      ...prevState,
      [`${modalType}Consent`]: true
    }));
  }
  const handleCloseModal = () => setShowModal(null);

  const handleModalClose = (modalType) => {
    setViewedTerms({ ...viewedTerms, [modalType]: true });
    handleCloseModal();
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
    <div className="contents">
      <div className="d-flex align-items-stretch">
        <div className="page-holder page-holder align-items-center py-4 bg-gray-100 vh-50">
          <div className="container">
            <div className="align-items-center row">
              <div className="px-lg-4 col-lg-6">
                <div className="card">
                  <div className="p-lg-5 card-body">
                    <h4 className="mb-4">{t('PrivacyPolicy')}</h4>
                    <p className="text-muted text-sm mb-3">
                    {t('Agree')}
                    </p>
                    <hr></hr>

                    <div className="mb-3 form-check form-box">
                      
                      <input
                        type="checkbox"
                        name="informationConsent"
                        className="form-check-input"
                        checked={consentData.informationConsent}
                        onChange={handleChange}
                      />

                      <div className="form-first">
                      <p className="form-check-label">
                      
                      &nbsp;{t('Collection')}&nbsp;
                      </p>   
                      <button
                        class="custom-link-button"
                        onClick={() => handleShowModal("information")}
                      >
                        {t('Look')}
                      </button>

                      </div>
                    </div>
                    <div className="mb-3 form-check form-box">
                      <input
                        type="checkbox"
                        name="locationConsent"
                        className="form-check-input"
                        checked={consentData.locationConsent}
                        onChange={handleChange}
                      />
                      <div className="form-first">
                      <p className="form-check-label">
                      
                      &nbsp; {t('ConsentLocation')}&nbsp;
                      </p>
                      
                    
                      <button
                        class="custom-link-button"
                        onClick={() => handleShowModal("location")}
                      >
                        {t('Look')}
                      </button>
                      </div>
                    </div>
                    <div className="mb-3 form-check form-box">
                      <input
                        type="checkbox"
                        name="matchingConsent"
                        className="form-check-input"
                        checked={consentData.matchingConsent}
                        onChange={handleChange}
                      />
                      <div className="form-first">
                      <p className="form-check-label">
                      
                      &nbsp;{t('ConsentMatching')}&nbsp;
                      </p>
                     
                      <button
                        class="custom-link-button"
                        onClick={() => handleShowModal("matching")}
                      >
                        {t('Look')}
                      </button>
                      </div>
                    </div>

                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}

                    <Button className="my-btn" onClick={clickHandler}>
                    {t('Next')}
                    </Button>
                  </div>
                  <div className="px-lg-5 py-lg-4 card-footer">
                    <div className="text-sm text-muted">
                    {t('AreadyAccount')}
                      <a href="/login"> {" " + t('Login2')}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

<div className="signupModal">
      {/* 개인정보 수집 및 이용 약관 모달 */}
      <Modal
        show={showModal === "information"}
        onHide={() => handleModalClose("information")}
      >
        <Modal.Header closeButton>
          <Modal.Title>개인정보 수집 및 이용 약관</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>제1조 (목적)</h4>
          <p>
             이 약관은 '어서와 카드는 처음이지' 서비스(이하 '서비스')에서
            개인정보를 수집하고 이용하는 목적과 범위를 명시합니다. 이용자는 이
            약관에 동의함으로써, 서비스 제공에 필수적인 개인정보의 수집 및
            이용에 동의합니다.
          </p>
<br></br>
          <h4>제2조 (수집하는 개인정보 항목)</h4>
          <p> 회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
          <ul style={{margin:'0 0 10px', padding:'0'}}>
            <li> &nbsp; &nbsp; ⦁ 성명, 주민등록번호 또는 외국인등록번호, 성별 및 국적</li>
            <li>&nbsp; &nbsp; ⦁ 회원 ID 및 비밀번호, 연락처, 이메일 주소</li>
          </ul>
<br></br>
          <h4>제3조 (개인정보의 수집 및 이용 목적)</h4>
          <p>회사는 수집한 개인정보를 다음과 같은 목적을 위해 이용합니다.</p>
          <ul style={{margin:'0 0 10px', padding:'0'}}>
            <li>&nbsp;&nbsp;  ⦁ 회원 가입 및 관리, 서비스 제공 및 계약 이행, 본인 확인 및 식별</li>
            <li>&nbsp;&nbsp;  ⦁ 서비스 이용 관련 공지사항 전달, 고객 지원 및 서비스 개선</li>
          </ul>
<br></br>
          <h4>제4조 (개인정보의 보유 및 이용 기간)</h4>
          <p>
          회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체
            없이 파기합니다. 단, 관련 법령에 의해 일정 기간 보관해야 하는 정보는
            법령에서 정한 기간 동안 보관합니다.
          </p>
<br></br>
          <h4>제5조 (동의 거부 권리 및 불이익)</h4>
          <p>
          이용자는 본 약관에 따른 개인정보 수집 및 이용에 동의하지 않을 권리가
            있으며, 동의 거부 시 서비스 이용에 제한이 있을 수 있습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleModalClose("information")}
          >
            {t('Close')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 위치정보 이용 동의 약관 모달 */}
      <Modal
        show={showModal === "location"}
        onHide={() => handleModalClose("location")}
      >
        <Modal.Header closeButton>
          <Modal.Title>위치정보 이용 동의 약관</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>제1조 (목적)</h4>
          <p>
            이 약관은 '어서와 카드는 처음이지' 서비스(이하 '서비스')에서
            위치정보를 수집하고 이용하는 목적과 범위를 명시합니다. 이용자는 이
            약관에 동의함으로써, 서비스 제공에 필요한 위치정보의 수집 및 이용에
            동의합니다.
          </p>

          <h4>제2조 (수집하는 위치정보 항목)</h4>
          <p>회사는 서비스 제공을 위해 다음과 같은 위치정보를 수집합니다:</p>
          <ul style={{margin:'0 0 10px', padding:'0'}}>
            <li> ⦁ 실시간 위치 정보 및 위치 기반 서비스 제공에 필요한 정보</li>
          </ul>

          <h4>제3조 (위치정보의 수집 및 이용 목적)</h4>
          <p>회사는 수집한 위치정보를 다음과 같은 목적을 위해 이용합니다:</p>
          <ul style={{margin:'0 0 10px', padding:'0'}}>
            <li>&nbsp; &nbsp; ⦁ 위치 기반 서비스 제공</li>
            <li>&nbsp; &nbsp; ⦁ 위치 기반 광고 및 마케팅</li>
            <li>&nbsp; &nbsp; ⦁ 서비스 개선 및 맞춤형 서비스 제공</li>
          </ul>

          <h4>제4조 (위치정보의 보유 및 이용 기간)</h4>
          <p>
            회사는 위치정보의 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체
            없이 파기합니다. 단, 관련 법령에 의해 일정 기간 보관해야 하는 정보는
            법령에서 정한 기간 동안 보관합니다.
          </p>

          <h4>제5조 (동의 거부 권리 및 불이익)</h4>
          <p>
            이용자는 본 약관에 따른 위치정보 수집 및 이용에 동의하지 않을 권리가
            있으며, 동의 거부 시 위치 기반 서비스 이용에 제한이 있을 수
            있습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleModalClose("location")}
          >
            {t('Close')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 매칭 서비스 활용 동의 약관 모달 */}
      <Modal
        show={showModal === "matching"}
        onHide={() => handleModalClose("matching")}
      >
        <Modal.Header closeButton>
          <Modal.Title>매칭 서비스 활용 동의 약관</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>제1조 (목적)</h4>
          <p>
            이 약관은 '어서와 카드는 처음이지' 서비스(이하 '서비스')에서 매칭
            서비스를 제공하기 위한 목적과 범위를 명시합니다. 이용자는 이 약관에
            동의함으로써, 매칭 서비스 제공에 필요한 개인정보의 수집 및 이용에
            동의합니다.
          </p>

          <h4>제2조 (수집하는 개인정보 항목)</h4>
          <p>회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:</p>
          <ul style={{margin:'0 0 10px', padding:'0'}}>
            <li>&nbsp; &nbsp; ⦁ 회원 프로필 정보</li>
            <li>&nbsp; &nbsp; ⦁ 매칭 서비스에 필요한 기타 정보</li>
          </ul>

          <h4>제3조 (매칭 서비스 활용 목적)</h4>
          <p>회사는 수집한 개인정보를 다음과 같은 목적을 위해 이용합니다:</p>
          <ul style={{margin:'0 0 10px', padding:'0'}}>
            <li>&nbsp; &nbsp; ⦁ 매칭 서비스 제공</li>
            <li>&nbsp; &nbsp; ⦁ 서비스 개선 및 맞춤형 매칭 제공</li>
            <li>&nbsp; &nbsp; ⦁ 고객 지원 및 피드백 수집</li>
          </ul>

          <h4>제4조 (매칭 서비스 활용 정보의 보유 및 이용 기간)</h4>
          <p>
            회사는 매칭 서비스 제공 목적이 달성된 후에는 해당 정보를 지체 없이
            파기합니다. 단, 관련 법령에 의해 일정 기간 보관해야 하는 정보는
            법령에서 정한 기간 동안 보관합니다.
          </p>

          <h4>제5조 (동의 거부 권리 및 불이익)</h4>
          <p>
            이용자는 본 약관에 따른 매칭 서비스 활용 동의에 동의하지 않을 권리가
            있으며, 동의 거부 시 매칭 서비스 이용에 제한이 있을 수 있습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleModalClose("matching")}
          >
            {t('Close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
}

export default ConsentForm;
