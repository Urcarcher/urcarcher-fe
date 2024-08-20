import 'assets/Home.css';
import axios from 'axios';
import CurrencyRateList from 'components/home/CurrencyRateList';
import ServiceList from 'components/home/ServiceList ';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
    
    const [mainCardInfo, setMainCardInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    //1. 로그인 회원 정보
    const [memberId, setMemberId] = useState('bleakwinter'); //테스트용


    //2. 회원이 소지하고 있는 첫 번째 카드 종류와 이번 달 카드 사용 금액 정보  (정보 없을 경우 예외 처리 필요)
    useEffect(() => {
        
        // memberId가 없으면 에러 처리
        if (!memberId) {
            console.error('Member ID is missing!');
            return;
        }

        // API 호출
        axios.get(`https://urcarcher-local.kro.kr:8443/api/home/my-main-card/${memberId}`)
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

    //계좌 번호 형태 네글자-세글자-나머지
    // const cardAccountString = mainCardInfo.cardAccount.toString();
    // const cardAccount = `${cardAccountString.slice(0, 4)}-${cardAccountString.slice(4, 7)}-${cardAccountString.slice(7)}`;
   
    if (loading) {
        return <p>Loading...</p>; // 로딩 중일 때 표시할 내용
    }

    if (!mainCardInfo) {
        return <p>No card information available</p>; // 데이터가 없을 때 표시할 내용
    }

    //3.실시간 환율 정보

    
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
            <div className='home-container inner'>
                <h5>{memberId}님 반갑습니다.🙌</h5>
                {/* <h5>🙌로그인하기</h5> */}
                <div className='main-content'>
                    <h2 className='hidden'>card section</h2>
                    {mainCardInfo ? (
                        <div className="card-type-wrap">
                            <p className='card-type-text'>
                                <span>{mainCardInfo.cardUsage === "신용카드" ? mainCardInfo.cardAccount : mainCardInfo.cardName}</span>
                                <span className='type'>{mainCardInfo.cardUsage}</span>
                            </p>
                            <p className='card_balance'>{mainCardInfo.cardBalance.toLocaleString()}원</p>
                            <p className='card-charge'>충전</p>
                            <p className={mainCardInfo.cardUsage === "신용카드" ? 'hidden' : 'card-charge'}>충전</p>
                        </div>
                     ) : (
                        <div className="card-type-wrap">
                            <p className='card_balance'>Loading...</p>
                        </div>
                    )}
                    <div className='amount-used'>
                        <p>이번달 사용 금액</p>
                        {mainCardInfo ? (
                            <p>{mainCardInfo.totalPayment.toLocaleString()}원</p>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className='card-signup'>
                            <p><Link to="/card">카드 신청 </Link></p>
                            <p><img src="icon/icon-credit-card.png" alt="카드신청" style={{width:"40px"}}/></p>
                       
                    </div>
                </div>
                <div> 
                    <h4 className='home-title'>서비스</h4>
                    <ServiceList />
                </div>
                <div> 
                    <h4 className='home-title'>현재 환율 <span className='rate-date'>({getCurrentDate()}기준)</span></h4>
                    <CurrencyRateList />
                </div>
            </div>
        </div>
    );
}

export default Home;