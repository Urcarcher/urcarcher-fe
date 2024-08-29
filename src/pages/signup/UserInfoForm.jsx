import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 임포트
import "./signup.css"
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';


function UserInfoForm() {

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


    const navigate = useNavigate();
    const location = useLocation();

    const consentData = location.state?.consentData || {
        informationConsent: false,
        locationConsent: false,
        matchingConsent: false,
    };

    console.log("데이터 확인: ", consentData);

    const [userInfo, setUserInfo] = useState({
        memberId: '',
        password: '',
        name: '',
        registrationNumber: '',
        gender: '',
        nationality: '',
        email: '',
        phoneNumber: '',
        informationConsent: consentData.informationConsent || false,
        locationConsent: consentData.locationConsent || false,
        matchingConsent: consentData.matchingConsent || false,
    });

    const [idCheckResult, setIdCheckResult] = useState(null); // ID 체크 결과 상태
    const [isIdAvailable, setIsIdAvailable] = useState(false); // ID 사용 가능 여부 상태
    const [isIdChecked, setIsIdChecked] = useState(false); // ID 체크 완료 여부 상태

    const handleChange = (e) => {
        console.log(e);
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    // ID 중복 체크 함수
    const checkIdAvailability = async () => {
        if (!userInfo.memberId.trim()) {
            setIdCheckResult(t('EnterId'));
            setIsIdAvailable(false);
            return;
        }

        try {
            const response = await axios.get(`/api/signup/idDupCheck`, {
                params: {
                    memberId: userInfo.memberId
                }
            });
            if (response.data) {
                setIdCheckResult(t('AlreadyId'));
                setIsIdAvailable(false);
            } else {
                setIdCheckResult(t('AvailableId'));
                setIsIdAvailable(true);
            }
            setIsIdChecked(true); // ID 체크 완료 상태로 설정
        } catch (error) {
            console.error("ID 중복 체크 중 오류 발생", error);
            setIdCheckResult(t('IdCheckError'));
            setIsIdAvailable(false);
            //setIsIdChecked(true); // ID 체크 완료 상태로 설정
        }
    };

    // 비밀번호 규격 체크 함수
    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSpecialChar
        );
    };

    useEffect(() => {
        console.log(userInfo);

        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }


    }, [userInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // 필수 입력 필드 확인
        const requiredFields = [
            'memberId', 'password', 'name', 'registrationNumber', 
            'gender', 'nationality', 'email', 'phoneNumber'
        ];

        const isEmptyField = requiredFields.some(field => !userInfo[field]);

        if (!isIdAvailable) {
            alert(t('IdCheck'));
            return;
        }

        // 비밀번호 유효성 검사
        if (!validatePassword(userInfo.password)) {
            alert(t('MustPw'));
            return; // 유효하지 않으면 제출 중단
        }

        if (isEmptyField) {
            alert(t('Allfields'));
            return;
        }

        // ID 체크가 완료되지 않았을 때
        if (!isIdChecked) {
            alert(t('CompleteIdCheck'));
            return;
        }

        axios({
            method: "post",
            url: `/api/signup/local`,
            data: userInfo,
        })
        .then((res) => {
            alert(t('EnterSuccess'));
            navigate("/signup/success");
        })
        .catch((error) => {
            console.error("서버 오류:", error);
            alert(t('InputError'));
        });
    };

    return (        
        <div className="contents scroll">
      <div className="d-flex align-items-stretch">
        <div className="page-holder page-holder align-items-center py-4 bg-gray-100 vh-50">
          <div className="container">
            <div className="align-items-center row">
              <div className="px-lg-4 col-lg-6">
                <div className="card">
                  <div className="p-lg-5 card-body">
                  <h3 className="mb-4">{t('EnterInfo')}</h3>
                  <hr></hr>
            <form id="signup" onSubmit={handleSubmit} className="container">
                <div className="form-floating mb-3">
                    <input
                    placeholder="memberId"
                        type="text" 
                        name="memberId"
                        className="form-control"
                        value={userInfo.memberId} 
                        onChange={handleChange} 
                    />
                    <label className="form-label" htmlFor="memberId">
                    {t('Id')}
                        </label>
                    <Button type="button" onClick={checkIdAvailability}>{t('DuplicationCheck')}</Button>
                    {idCheckResult && <div>{idCheckResult}</div>}
                </div>
                <div className="form-floating mb-3">
                    <input 
                    placeholder="password"
                        type="password" 
                        name="password" 
                        className="form-control"
                        value={userInfo.password} 
                        onChange={handleChange} 
                    />
                    <label className="form-label" htmlFor="memberId">
                    {t('Pw')}
                        </label>
                    <small> *{t('PwCheck2')}</small>
                </div>
                <div className="form-floating mb-3">
                    <input 
                    placeholder="name"
                        type="text" 
                        name="name" 
                        className="form-control"
                        value={userInfo.name} 
                        onChange={handleChange} 
                    />
                    <label className="form-label" htmlFor="memberId">
                    {t('Name')}
                        </label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                    placeholder="registrationNumber"
                        type="text" 
                        name="registrationNumber" 
                        className="form-control"
                        value={userInfo.registrationNumber} 
                        onChange={handleChange} 
                    />
                    <label className="form-label" htmlFor="memberId">
                    {t('SocialNumber')}
                        </label>
                </div>
                <div className="col-md-12 mb-3 ">
                    <input 
                        type="radio" 
                        name="gender" 
                        className="form-check-input"
                        value="male" 
                        checked={userInfo.gender === 'male'} 
                        onChange={handleChange} 
                    /> {t('Male')}
                    <input 
                        type="radio" 
                        name="gender" 
                        className="form-check-input"
                        value="female" 
                        checked={userInfo.gender === 'female'} 
                        onChange={handleChange} 
                    /> {t('Female')}
                </div>
                <div className="col-md-12 mb-3">
                    <select 
                        name="nationality" 
                        className = "form-select form-control"
                        value={userInfo.nationality} 
                        onChange={handleChange}
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
                    <input 
                    placeholder="email"
                        type="email" 
                        name="email" 
                        className="form-control"
                        value={userInfo.email} 
                        onChange={handleChange} 
                    />
                    <label className="form-label" htmlFor="memberId">
                    {t('Email')}
                        </label>
                </div>
                <div className="form-floating mb-3"> 
                    <input 
                    placeholder="phoneNumber"
                        type="text" 
                        name="phoneNumber" 
                        className="form-control"
                        value={userInfo.phoneNumber} 
                        onChange={handleChange} 
                    />
                    <label className="form-label" htmlFor="memberId">
                    {t('PhoneNumber')}
                        </label>
                </div>

                <input 
                    className="my-btn" 
                    type="submit" 
                    value={t('Complete')}
                />
            </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default UserInfoForm;