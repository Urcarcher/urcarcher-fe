import 'assets/Home.css';
import CurrencyRateList from 'components/home/CurrencyRateList';
import ServiceList from 'components/home/ServiceList ';

function Home(props) {

    //0. 로그인 회원 정보 (로그인 안한 경우 main-content내용 달라짐)

    //1. 회원이 소지하고 있는 첫번째? 카드 종류와 정보

    //2.이번 달 카드 사용 금액 받아오기 (위와 동일한 카드 내역)

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
                {/* <h5>User님 반갑습니다.🙌</h5> */}
                <h5>🙌로그인하기</h5>
                <div className='main-content'>
                    <h2 className='hidden'>card section</h2>
                    <div className="card-type-wrap">
                        <p className='card-type'>
                            <span>카드 이름</span>
                            <span>선불카드</span>
                        </p>
                        <p>10,000원</p>
                        <p>충전</p>
                    </div>
                    <div className='amount-used'>
                        <p>이번달 사용 금액</p>
                        <p>120,020원</p>
                    </div>
                    <div className='card-signup'>
                        <p>카드 신청</p>
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