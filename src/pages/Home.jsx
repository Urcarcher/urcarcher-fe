import 'assets/Home.css';
import axios from 'axios';
import CurrencyRateList from 'components/home/CurrencyRateList';
import ServiceList from 'components/home/ServiceList ';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { options_GET } from 'services/CommonService';
import cookie from 'react-cookies';


function Home(props) {
    
    const [mainCardInfo, setMainCardInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    //1. 로그인 회원 정보   
    const [memberId, setMemberId] = useState('');  //bleakwinter (신용카드) happy(선불카트) - 테스트ID
    const [name, setName] = useState('');

    const isAuthorized = () => {
        if(cookie.load("URCARCHER_ACCESS_TOKEN") != null) {
          axios(options_GET("/api/auth/authorizing", null))
            .then((resp)=>{
              if(resp.data.isAuthorized == true) {
                setMemberId(resp.data.memberId);
                setName(resp.data.name);
              }
            })
            .catch((err)=>{
              console.log(err);
            });
        }
    };

    isAuthorized();
    //2. 회원이 소지하고 있는 첫 번째 카드 종류와 이번 달 카드 사용 금액 정보  (정보 없을 경우 예외 처리 필요)
    useEffect(() => {

        // memberId가 없으면 에러 처리
        if (!memberId) {
            console.log('Member ID is missing!');
            setLoading(false); // memberId가 없을 경우에도 로딩 상태를 false로 설정
            return;
        }

        axios.get(`/api/home/my-main-card/${memberId}`)
            .then(response => {
                console.log(response.data)
                setMainCardInfo(response.data);
                setLoading(false); // 데이터 로드 완료 후 로딩 상태를 false로 설정
            })
            .catch(error => {
                console.error('There was an error!', error);
                setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
            });
    }, [memberId]);

    
    //3.실시간 환율 정보 : CurrencyRateList 컴포넌트에서 처리
    
    //현재 날짜
    const getCurrentDate = () => {
        const date = new Date();
        const month = date.getMonth() + 1; // 월은 0부터 시작
        const day = date.getDate();
      
        // 월과 일이 한 자릿수일 경우 앞에 0을 붙여주는 형식
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;
      
        return `${formattedMonth}.${formattedDay}`;
    };

    return (
        <div className="contents">
            {/* <p><img src={Logo} alt="로고" /></p> */}
            <div className='home-container'>
             
                {/* 로그인회원 이름으로 수정 */}
                {memberId ? (
                    <h5><span style={{color:'#476EFF'}}>{name}</span>님 반갑습니다!🙌</h5>
                ) : (
                    <h5>
                        <Link to='/login'>🙌로그인하기</Link>
                    </h5>
                )}
                <div className='main-content'>
                    <h2 className='hidden'>card section</h2>

                    <div className="card-type-wrap">
                        {memberId ? ( //로그인 한 경우
                            <>
                                {loading ? (
                                    <p className='card_balance'>Loading...</p>
                                ) : mainCardInfo ? ( //로그인 후 카드 정보 있을 경우 
                                    <>
                                        <p className='card-type-text'>
                                            <span>{mainCardInfo.cardUsage === "신용카드" ? mainCardInfo.card_number : mainCardInfo.cardName}</span>
                                            <span className={mainCardInfo.cardUsage === null ? '' : 'type'}>{mainCardInfo.cardUsage}</span>
                                        </p>
                                        <p className='card_balance'>
                                        {mainCardInfo.cardId === null ? (
                                            '카드 발급 후 사용해주세요'
                                        ) : (
                                            mainCardInfo.cardUsage === "신용카드" ? '' : (
                                                mainCardInfo.cardBalance ? mainCardInfo.cardBalance.toLocaleString() + '원' :  <Link to='/'>카드 충전</Link>
                                            )
                                        )}
                                        </p>
                                        <p className={mainCardInfo.cardUsage === "신용카드" ? 'hidden' : 'card-charge'}>충전</p>
                                        <p className={mainCardInfo.cardUsage === "신용카드" ? 'mycard-expiration-date' : 'hidden'}>만료일: {mainCardInfo.expiration_date}</p>
                                        <p className={mainCardInfo.cardUsage === "신용카드" ? 'mycard-name' : 'hidden'}>{mainCardInfo.name}</p>
                                    </>
                                ) : (
                                    <p className='card_balance'>카드 정보가 없습니다.</p>
                                )}
                            </>
                        ) : (
                            <>
                                <p className='card_balance-no'>어카처의 다양한 서비스를 <br /> 이용해보세요</p>
                                <p className='member-sigup'>
                                    <Link to='/signup'>&gt; 회원 가입</Link>
                                </p>
                             </>   
                        )}
                    </div>
                    {memberId ? ( //로그인 한 경우
                        mainCardInfo ? ( //카드 정보 있는 경우
                            <div className='amount-used'>
                                <p>이번달 사용 금액</p>
                                <p>{mainCardInfo.totalPayment ? mainCardInfo.totalPayment.toLocaleString() + '원' : mainCardInfo.totalPayment + '원'}</p>
                            </div>
                        ) : (
                            <div className='amount-used'>
                                <p className='noCardInfo-text'>결제 내역 정보가 없습니다</p>
                            </div>
                        )
                    ) : (
                        <div className='amount-used-no'>
                            <p><Link to="/login">로그인 후 확인 가능합니다</Link></p>
                        </div>
                    )}
                    
                    <div className='card-signup'>
                        <p><Link to="/card">카드 신청</Link></p>
                        <p><img src="icon/icon-credit-card.png" alt="카드신청" style={{width:"40px"}}/></p>
                    </div>
                </div>
                <div className='home-content-box'> 
                    <h4 className='home-title'>서비스</h4>
                    <ServiceList />
                </div>
                <div className='home-title-wrap'> 
                    <h4 className='home-title'>현재 환율</h4> 
                    <p className='rate-date'>({getCurrentDate()}기준)</p>
                    <CurrencyRateList />
                </div>
            </div>
        </div>
    );
}

export default Home;