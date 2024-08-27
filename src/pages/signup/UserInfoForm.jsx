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
            setIdCheckResult("ID를 입력해 주세요.");
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
                setIdCheckResult("이미 사용 중인 ID입니다.");
                setIsIdAvailable(false);
            } else {
                setIdCheckResult("ID 사용 가능");
                setIsIdAvailable(true);
            }
            setIsIdChecked(true); // ID 체크 완료 상태로 설정
        } catch (error) {
            console.error("ID 중복 체크 중 오류 발생", error);
            setIdCheckResult("ID 중복 체크 중 오류 발생");
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
            alert("ID 중복체크 해주세요.");
            return;
        }

        // 비밀번호 유효성 검사
        if (!validatePassword(userInfo.password)) {
            alert("비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자 및 특수 문자를 포함해야 합니다.");
            return; // 유효하지 않으면 제출 중단
        }

        if (isEmptyField) {
            alert("모든 필드를 채워야 합니다.");
            return;
        }

        // ID 체크가 완료되지 않았을 때
        if (!isIdChecked) {
            alert("ID 중복 체크를 완료해야 합니다.");
            return;
        }

        axios({
            method: "post",
            url: `/api/signup/local`,
            data: userInfo,
        })
        .then((res) => {
            alert(`성공적으로 입력되었습니다.`);
            navigate("/signup/success");
        })
        .catch((error) => {
            console.error("서버 오류:", error);
            alert("입력 중 오류가 발생했습니다.");
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
                  <h3 className="mb-4">회원 정보 입력</h3>
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
                          아이디
                        </label>
                    <Button type="button" onClick={checkIdAvailability}>ID 중복 체크</Button>
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
                          비밀번호
                        </label>
                    <small> * 최소 8자 이상, 대문자, 소문자, 숫자 및 특수 문자를 포함</small>
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
                    이름
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
                    주민등록번호
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
                    /> 남성
                    <input 
                        type="radio" 
                        name="gender" 
                        className="form-check-input"
                        value="female" 
                        checked={userInfo.gender === 'female'} 
                        onChange={handleChange} 
                    /> 여성
                </div>
                <div className="col-md-12 mb-3">
                    <select 
                        name="nationality" 
                        className = "form-select form-control"
                        value={userInfo.nationality} 
                        onChange={handleChange}
                    >
                        <option value="">국적을 선택하세요</option>
                        <option value="KR">Korea (한국)</option>
                        <option value="US">United States (미국)</option>
                        <option value="EU">Eurozone (유로존 국가들)</option>
                        <option value="JP">Japan (일본)</option>
                        <option value="CN">China (중국)</option>
                        <option value="HK">Hong Kong (홍콩)</option>
                        <option value="TW">Taiwan (대만)</option>
                        <option value="GB">United Kingdom (영국)</option>
                        <option value="OM">Oman (오만)</option>
                        <option value="CA">Canada (캐나다)</option>
                        <option value="CH">Switzerland (스위스)</option>
                        <option value="SE">Sweden (스웨덴)</option>
                        <option value="AU">Australia (호주)</option>
                        <option value="NZ">New Zealand (뉴질랜드)</option>
                        <option value="CZ">Czech Republic (체코)</option>
                        <option value="CL">Chile (칠레)</option>
                        <option value="TR">Turkey (터키)</option>
                        <option value="MN">Mongolia (몽골)</option>
                        <option value="IL">Israel (이스라엘)</option>
                        <option value="DK">Denmark (덴마크)</option>
                        <option value="NO">Norway (노르웨이)</option>
                        <option value="SA">Saudi Arabia (사우디아라비아)</option>
                        <option value="KW">Kuwait (쿠웨이트)</option>
                        <option value="BH">Bahrain (바레인)</option>
                        <option value="AE">United Arab Emirates (아랍에미리트)</option>
                        <option value="JO">Jordan (요르단)</option>
                        <option value="EG">Egypt (이집트)</option>
                        <option value="TH">Thailand (태국)</option>
                        <option value="SG">Singapore (싱가포르)</option>
                        <option value="MY">Malaysia (말레이시아)</option>
                        <option value="ID">Indonesia (인도네시아)</option>
                        <option value="QA">Qatar (카타르)</option>
                        <option value="KZ">Kazakhstan (카자흐스탄)</option>
                        <option value="BN">Brunei (브루나이)</option>
                        <option value="IN">India (인도)</option>
                        <option value="PK">Pakistan (파키스탄)</option>
                        <option value="BD">Bangladesh (방글라데시)</option>
                        <option value="PH">Philippines (필리핀)</option>
                        <option value="MX">Mexico (멕시코)</option>
                        <option value="BR">Brazil (브라질)</option>
                        <option value="VN">Vietnam (베트남)</option>
                        <option value="ZA">South Africa (남아프리카공화국)</option>
                        <option value="RU">Russia (러시아)</option>
                        <option value="HU">Hungary (헝가리)</option>
                        <option value="PL">Poland (폴란드)</option>
                        <option value="LK">Sri Lanka (스리랑카)</option>
                        <option value="DZ">Algeria (알제리)</option>
                        <option value="KE">Kenya (케냐)</option>
                        <option value="CO">Colombia (콜롬비아)</option>
                        <option value="TZ">Tanzania (탄자니아)</option>
                        <option value="NP">Nepal (네팔)</option>
                        <option value="RO">Romania (루마니아)</option>
                        <option value="LY">Libya (리비아)</option>
                        <option value="MO">Macau (마카오)</option>
                        <option value="MM">Myanmar (미얀마)</option>
                        <option value="ET">Ethiopia (에티오피아)</option>
                        <option value="UZ">Uzbekistan (우즈베키스탄)</option>
                        <option value="KH">Cambodia (캄보디아)</option>
                        <option value="FJ">Fiji (피지)</option>
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
                    이메일
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
                    연락처
                        </label>
                </div>

                <input 
                    className="my-btn" 
                    type="submit" 
                    value="입력하기" 
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