import React, { useEffect, useState } from 'react';
import { Input, Switch, FormControlLabel, Button } from '@mui/material';
import { useCardContext } from './CardContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import Axios from 'axios';

function Card2() {
    const [idNum, setIdNum] = useState('');
    const [maskingNum, setMaskingNum] = useState('');
    const [postPaidTransport, setPostPaidTransport] = useState(false); // 교통기능신청상태 
    const [phoneNumber, setPhoneNumber] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [name, setName] = useState('');
    const [memberId, setMemberId] = useState('');

    const { produceCardOffer, setProduceCardOffer } = useCardContext();

    const [verificationCode, setVerificationCode] = useState('');  // 입력된 인증번호
    const [isVerificationSent, setIsVerificationSent] = useState(false); // 인증번호 발송 여부
    const [isVerificationSuccessful, setIsVerificationSuccessful] = useState(null); // 인증 성공 여부

    let navigate = useNavigate();

    useEffect(() => {
        
        Axios.get('/api/t/test')
        .then((response)=>{
            const memberData = response.data;
            setPhoneNumber(memberData.phoneNumber);
                setRegistrationNumber(memberData.registrationNumber);
                setName(memberData.name);
                setMemberId(memberData.memberId);

                
        })
        .catch(error => {
            console.error('Error fetching member data:', error);
        });
    }, []);

    const handleIdNumChange = (event) => {
        const originalValue = event.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
        const formattedValue = originalValue
            .replace(/^(\d{0,6})(\d{0,7})$/g, '$1-$2')
            .replace(/-{1,2}$/g, '');

        setIdNum(formattedValue);

        // 마스킹 처리
        if (originalValue.length > 6) {
            const masked = originalValue.replace(/(\d{6})(\d{1})(\d{6})/, '$1-$2******');
            setMaskingNum(masked);
        } else {
            setMaskingNum(formattedValue);
        }
    };

    const handleSwitchChange = (event) => {
        setPostPaidTransport(event.target.checked);
    };

    // 인증번호 요청 함수
    const handleVerificationRequest = () => {
        axios.post('/send-one', { phoneNumber })
            .then(response => {
                console.log('인증번호 발송 성공:', response.data);
                // 인증번호 발송 성공 시 입력 필드를 표시
                setIsVerificationSent(true);
            })
            .catch(error => {
                console.error('인증번호 발송 실패:', error);
            });
    };

    // 인증번호 입력 값 업데이트 함수
    const handleVerificationCodeChange = (event) => {
        setVerificationCode(event.target.value);
    };

    // 인증번호 검증 요청 함수
    const handleVerificationSubmit = () => {
        axios.post('/verify-code', { phoneNumber, verificationCode })
            .then(response => {
                setIsVerificationSuccessful(response.data);
                if (response.data) {
                    alert('인증 성공!');
                } else {
                    alert('인증 실패! 다시 시도해주세요.');
                }
            })
            .catch(error => {
                console.error('인증 실패:', error);
            });
    };

   const handleSubmit = () => {
        // if (!isVerificationSuccessful) {
        //     alert('인증을 완료해야 합니다.');
        //     return;
        // }

        const cardData = {
            idNum,
            postPaidTransport,
        };

        setProduceCardOffer(prevState => ({
            ...prevState,
             member_id: memberId,
            transportation: postPaidTransport
        }));

        if (produceCardOffer.card_type_id === 1 || produceCardOffer.card_type_id === 2) {
            setTimeout(() => navigate('/verification'), 300);
        } else {
            setTimeout(() => navigate('/card3'), 300);
        }
    };

    return (
        <div style={{ marginTop: '140px'}}>
             <ProgressBar
                stages={['카드 선택', '정보 입력', '동의 사항', '카드 수령', '결제 정보']}
                currentStage={'정보 입력'}
            />
            <div className="submit-container" id="regist-container" style={{ margin: 'auto 50px'}}>
                <h4 style={{marginTop: '65px', textAlign:'left', marginBottom: '30px'}}>신청인 정보를 확인해주세요</h4>
                <div style={{ marginBottom: '30px'}}>
                    <div style={{ justifyContent: 'flex-start', display: 'flex' }}>이름</div>
                    <Input
                        id="name"
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%' }}
                    />
                    <br />
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <div style={{ justifyContent: 'flex-start', display: 'flex' }}>휴대전화 번호</div>
                    <Input
                        id="phone"
                        placeholder="-를 빼고 휴대전화 번호를 입력하세요"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{ width: '80%' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleVerificationRequest}
                    >
                        인증
                    </Button>
                    <br />
                </div>

            {/* 인증번호 입력 필드 및 확인 버튼, 인증번호 발송 후에만 표시 */}
                {isVerificationSent && (
                    <div style={{ marginBottom: '30px' }}>
                        <div style={{ justifyContent: 'flex-start', display: 'flex' }}>인증번호 입력</div>
                        <Input
                            id="verification-code"
                            placeholder="인증번호를 입력하세요"
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                            style={{ width: '80%' }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleVerificationSubmit}
                        >
                            확인
                        </Button>
                    </div>
                )}

                <div style={{ marginBottom: '30px' }}>
                    <div style={{ justifyContent: 'flex-start', display: 'flex' }}>주민/외국인등록번호</div>
                    <Input
                        placeholder={'-포함 숫자 13자리 입력'}
                        maxLength={14}
                        value={maskingNum || registrationNumber}
                        onChange={handleIdNumChange}
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ justifyContent: 'flex-start', display: 'flex',  marginBottom: '30px'}}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={postPaidTransport}
                                onChange={handleSwitchChange}
                                name="postPaidTransport"
                                color="primary"
                                style={{ marginLeft: '0 !important' }}
                            />
                        }
                        label="후불교통기능 신청"
                        labelPlacement="start" // 라벨을 스위치 앞에 위치시킴
                        style={{ marginLeft: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                    />
                </div>

                <Button
                    variant="contained"
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                      }}
                    onClick={handleSubmit}
                >
                    다음
                </Button>
            </div>
        </div>
    );
}

export default Card2;