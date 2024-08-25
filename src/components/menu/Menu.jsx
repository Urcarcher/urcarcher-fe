import 'assets/Menu.css';
import MenuCategory from 'components/menu/MenuCategory';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from 'services/AuthService';

function Menu({onClose, isLoggedIn, userName}) {
    const [isActive, setIsActive] = useState(false);
    
   // 로그인 (로그인 정보 API 로직 추가하기 ) 
    const handleLogin = () => {
      onClose(); //메뉴 닫기
    };

  // 로그아웃
  const handleLogout = () => {
    logout();
  };

    //Esc키로 메뉴 닫기
    useEffect(() => {
      const handleEscape = (event) => {
          if (event.key === 'Escape') {
              onClose();
          }
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
          document.removeEventListener('keydown', handleEscape);
      };
  }, [onClose]);

  useEffect(() => {
      // 컴포넌트가 마운트된 후에 `active` 클래스를 추가하기 위한 Timeout
      const timer = setTimeout(() => {
          setIsActive(true);
      }, 10); 
      // 컴포넌트 언마운트 시 타이머 정리
      return () => clearTimeout(timer);
  }, []);

    return (
        <div className={`menu-wrap ${isActive ? 'active' : ''}`}>
          <div className='menu inner'>
            <button className='close-button' onClick={onClose}>X</button>
              <div className="login-section">
                <div className="login-prompt">
                  <h3>
                  {isLoggedIn ? (
                      <>
                        <span>{userName}님</span>
                        <Link to="/" onClick={handleLogout} >로그아웃</Link>
                      </>
                    ) : (
                      <Link to="/login" onClick={handleLogin}>로그인</Link>
                  )}
                  </h3>
                  <div className="menu-banner">
                    <div className='menu-banner-text'>
                      <p>여행 코스 완성하면</p>
                      <p>한국 기념품 리워드 증정!</p>
                    </div>
                    <p>
                      <img src="/icon/gift.png" alt="부채" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="menu-section">
              <MenuCategory 
                onClose={onClose}
                title={[{id:11, title:"추천"}]} 
                items={[
                  { id: 1, text: "카드 신청", link: "/card1" },
                  { id: 2, text: "환율 조회 및 예측", link: "/exchange" },
                  { id: 3, text: "여행 코스 추천", link: "/courseList" },
                  { id: 4, text: "소비 리포트", link: "/chart2" },
                ]}
              />
              <MenuCategory 
                onClose={onClose}
                title={[{id:12, title:"금융"}]} 
                items={[
                  { id: 6, text: "카드 신청", link: "/card1" },
                  { id: 7, text: "카드 분실 신고", link: "/cardmanagement" },
                  { id: 8, text: "사용 내역 조회", link: "/usage" },
                  { id: 9, text: "소비 패턴 분석", link: "/chart1" },
                  { id: 10, text: "환율 조회 및 예측", link: "/exchange" },
                  { id: 11, text: "환전하기", link: "/exchange" },
                ]}
              />
              <MenuCategory 
                onClose={onClose}
                title={[{id:13, title:"관광"}]} 
                items={[
                  { id:12, text: "관광지 추천", link: "/searchtour" },
                  { id:13,text: "결제 기반 장소 추천", link: "/maphome" },
                  { id:14,text: "문화 활동 예약 하기", link: "/" },
                  { id:15,text: "여행 코스 추천", link: "/courseList" },
                  { id:16,text: "리워드 지급", link: "/courseList" },
                  { id:17,text: "길찾기", link: "/MapComponent" },
                ]}
              />
              <MenuCategory 
                onClose={onClose}
                title={[{id:14, title:"고객 센터"}]} 
                items={[
                  { id:18, text: "자주 묻는 질문", link: "/" },
                ]}
              />
            </div>
          </div>
        </div>
      );
}

export default Menu;