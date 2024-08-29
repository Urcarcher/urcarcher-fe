import React, { useEffect, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "pages/auth/OAuthNew.css";
import { oauthNew } from 'services/AuthService';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';


function OAuthNew(props) {
  var loc = useLocation();
  const nav = useNavigate();
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
    

  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(null); // 현재 열린 모달을 추적
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(()=>{

    const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


    try {
      if(loc.state.role == "GUEST") {
        setEmail(loc.state.email);
        setUserInfo({...userInfo, ['provider']: loc.state.provider, ['email']: loc.state.email});
      }
    } catch (error) {
      nav("/login");
    }
  }, []);

  // 각 약관을 본 상태를 추적
  const [viewedTerms, setViewedTerms] = useState({
    information: false,
  });

  const [userInfo, setUserInfo] = useState({
    registrationNumber: '',
    gender: '',
    nationality: '',
    phoneNumber: '',
    informationConsent: false,
    locationConsent: false,
    matchingConsent: false,
  });

  const handleInfoChange = (e) => {
      if(e.target.name.includes("Consent")) {
        const { name, checked } = e.target;
        setUserInfo({ ...userInfo, [e.target.name]: checked });
        return;
      } else if(e.target.name === "registrationNumber") {
        let val = e.target.value;
        if(!val.endsWith('-')) {
          val = val.length > 6 && val.length < 8 ? val.substring(0, 6) + "-" + val.substring(6) : val;
        }
        setUserInfo({ ...userInfo, [e.target.name]: val });
        e.target.value = val;
        return;
      }

      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = [
      'registrationNumber', 'gender', 'nationality', 'phoneNumber'
    ];

    const isEmptyField = requiredFields.some(field => !userInfo[field]);

    if (isEmptyField) {
      alert(t('AllInfo'));
      return;
    }

    if (!userInfo.informationConsent) {
      setErrorMessage(t('ConsentCollection'));
      return;
    }
    if (
      !viewedTerms.information
    ) {
      setErrorMessage(t('MustComplete'));
      return;
    }
    
    oauthNew(userInfo);

    // console.log(userInfo);
  };

  const handleShowModal = (modalType) => setShowModal(modalType);
  const handleCloseModal = () => setShowModal(null);

  const handleModalClose = (modalType) => {
    setViewedTerms({ ...viewedTerms, [modalType]: true });
    setUserInfo({...userInfo, [modalType+"Consent"]:true});
    handleCloseModal();
  };
  return (
    <div className="contents">
      <div className="d-flex align-items-stretch">
        <div className="container">
          <div className="align-items-center row">
            <div className="px-lg-4 col-lg-6">
              <div className="card">
                <div className="p-lg-5 card-body">
                  <h3 className="mb-4">
                    {t('MustComplete')}
                  </h3>
                  <hr></hr>
                  <form noValidate onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input id="email" name="email" className="form-control" value={email} disabled />
                      <label className="form-label" for="email">{t('Email')}</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input placeholder={t('SocialNumber')} id="registrationNumber" name="registrationNumber" className="form-control" onChange={handleInfoChange} />
                      <label className="form-label" for="password">{t('SocialNumber')}</label>
                    </div>

                    <div className="col-md-12 mb-3">
                      <select
                        name="nationality"
                        className="form-select form-control"
                        value={userInfo.nationality}
                        onChange={handleInfoChange}
                      >
                        <option value="">{t('SelectNation')}</option>
                        <option value="KR">{t('한국')}</option>
                        <option value="US">{t('미국')}</option>
                        <option value="EU">{t('유럽연합')}</option>
                        <option value="JP">{t('일본')}</option>
                        <option value="CN">{t('중국')}</option>
                        <option value="HK">{t('홍콩')}</option>
                        <option value="TW">{t('대만')}</option>
                        <option value="GB">{t('영국')}</option>
                        <option value="OM">{t('오만')}</option>
                        <option value="CA">{t('캐나다')}</option>
                        <option value="CH">{t('스위스')}</option>
                        <option value="SE">{t('스웨덴')}</option>
                        <option value="AU">{t('호주')}</option>
                        <option value="NZ">{t('뉴질랜드')}</option>
                        <option value="CZ">{t('체코')}</option>
                        <option value="CL">{t('칠레')}</option>
                        <option value="TR">{t('튀르키예')}</option>
                        <option value="MN">{t('몽골')}</option>
                        <option value="IL">{t('이스라엘')}</option>
                        <option value="DK">{t('덴마크')}</option>
                        <option value="NO">{t('노르웨이')}</option>
                        <option value="SA">{t('사우디아라비아')}</option>
                        <option value="KW">{t('쿠웨이트')}</option>
                        <option value="BH">{t('바레인')}</option>
                        <option value="AE">{t('아랍에미리트')}</option>
                        <option value="JO">{t('요르단')}</option>
                        <option value="EG">{t('이집트')}</option>
                        <option value="TH">{t('태국')}</option>
                        <option value="SG">{t('싱가포르')}</option>
                        <option value="MY">{t('말레이시아')}</option>
                        <option value="ID">{t('인도네시아')}</option>
                        <option value="QA">{t('카타르')}</option>
                        <option value="KZ">{t('카자흐스탄')}</option>
                        <option value="BN">{t('브루나이')}</option>
                        <option value="IN">{t('인도')}</option>
                        <option value="PK">{t('파키스탄')}</option>
                        <option value="BD">{t('방글라데시')}</option>
                        <option value="PH">{t('필리핀')}</option>
                        <option value="MX">{t('멕시코')}</option>
                        <option value="BR">{t('브라질')}</option>
                        <option value="VN">{t('베트남')}</option>
                        <option value="ZA">{t('남아프리카 공화국')}</option>
                        <option value="RU">{t('러시아')}</option>
                        <option value="HU">{t('헝가리')}</option>
                        <option value="PL">{t('폴란드')}</option>
                        <option value="LK">{t('스리랑카')}</option>
                        <option value="DZ">{t('알제리')}</option>
                        <option value="KE">{t('케냐')}</option>
                        <option value="CO">{t('콜롬비아')}</option>
                        <option value="TZ">{t('탄자니아')}</option>
                        <option value="NP">{t('네팔')}</option>
                        <option value="RO">{t('루마니아')}</option>
                        <option value="LY">{t('리비아')}</option>
                        <option value="MO">{t('마카오')}</option>
                        <option value="MM">{t('미얀마')}</option>
                        <option value="ET">{t('에티오피아')}</option>
                        <option value="UZ">{t('우즈베키스탄')}</option>
                        <option value="KH">{t('캄보디아')}</option>
                        <option value="FJ">{t('피지')}</option>
                      </select>
                    </div>

                    <div className="form-floating mb-3">
                      <input placeholder={t('PhoneNumber')} id="phoneNumber" name="phoneNumber" className="form-control" onChange={handleInfoChange} />
                      <label className="form-label" for="phoneNumber">{t('PhoneNumber')}</label>
                    </div>

                    <div className="col-md-12 mb-3 gender">
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          className="form-check-input"
                          value="male"
                          checked={userInfo.gender === 'male'}
                          onChange={handleInfoChange}
                        />
                        <label>{t('Male')}</label>
                        <input
                          type="radio"
                          name="gender"
                          className="form-check-input"
                          value="female"
                          checked={userInfo.gender === 'female'}
                          onChange={handleInfoChange}
                        />
                        <label>{t('Female')}</label>
                      </div>
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        name="informationConsent"
                        className="form-check-input"
                        checked={userInfo.informationConsent}
                        onChange={handleInfoChange}
                      />

                      <label htmlFor="agree" className="form-check-label">
                        {t('Collection')}
                      </label>

                      <Button
                        variant="link"
                        onClick={() => handleShowModal("information")}
                        className='agree-btn'
                      >
                        {t('Look')}
                      </Button>
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        name="locationConsent"
                        className="form-check-input"
                        checked={userInfo.locationConsent}
                        onChange={handleInfoChange}
                      />

                      <label htmlFor="agree" className="form-check-label">
                        {t('ConsentLocation')}
                      </label>
                      
                      <Button
                        variant="link"
                        onClick={() => handleShowModal("location")}
                        className='agree-btn'
                      >
                        {t('Look')}
                      </Button>
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        name="matchingConsent"
                        className="form-check-input"
                        checked={userInfo.matchingConsent}
                        onChange={handleInfoChange}
                      />

                      <label htmlFor="agree" className="form-check-label">
                       {t('ConsentMatching')}
                      </label>
                      
                      <Button
                        variant="link"
                        onClick={() => handleShowModal("matching")}
                        className='agree-btn'
                      >
                        {t('Look')}
                      </Button>
                    </div>

                    <Button className="my-btn" type='submit'>
                    {t('Complete')}
                    </Button>
                  </form>

                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

          <h4>제2조 (수집하는 개인정보 항목)</h4>
          <p>회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:</p>
          <ul>
            <li>성명</li>
            <li>생년월일</li>
            <li>성별</li>
            <li>연락처 (전화번호 또는 휴대전화번호)</li>
            <li>이메일 주소</li>
            <li>회원 ID 및 비밀번호</li>
          </ul>

          <h4>제3조 (개인정보의 수집 및 이용 목적)</h4>
          <p>회사는 수집한 개인정보를 다음과 같은 목적을 위해 이용합니다:</p>
          <ul>
            <li>회원 가입 및 관리</li>
            <li>서비스 제공 및 계약 이행</li>
            <li>본인 확인 및 식별</li>
            <li>서비스 이용 관련 공지사항 전달</li>
            <li>고객 지원 및 서비스 개선</li>
          </ul>

          <h4>제4조 (개인정보의 보유 및 이용 기간)</h4>
          <p>
            회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체
            없이 파기합니다. 단, 관련 법령에 의해 일정 기간 보관해야 하는 정보는
            법령에서 정한 기간 동안 보관합니다.
          </p>

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
            닫기
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
          <ul>
            <li>실시간 위치 정보</li>
            <li>위치 기반 서비스 제공에 필요한 정보</li>
          </ul>

          <h4>제3조 (위치정보의 수집 및 이용 목적)</h4>
          <p>회사는 수집한 위치정보를 다음과 같은 목적을 위해 이용합니다:</p>
          <ul>
            <li>위치 기반 서비스 제공</li>
            <li>위치 기반 광고 및 마케팅</li>
            <li>서비스 개선 및 맞춤형 서비스 제공</li>
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
          <ul>
            <li>회원 프로필 정보</li>
            <li>매칭 서비스에 필요한 기타 정보</li>
          </ul>

          <h4>제3조 (매칭 서비스 활용 목적)</h4>
          <p>회사는 수집한 개인정보를 다음과 같은 목적을 위해 이용합니다:</p>
          <ul>
            <li>매칭 서비스 제공</li>
            <li>서비스 개선 및 맞춤형 매칭 제공</li>
            <li>고객 지원 및 피드백 수집</li>
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
  );
}

export default OAuthNew;