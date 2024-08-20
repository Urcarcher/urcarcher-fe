import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from './menu/Menu';

function Footer(props) {
   
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMenuVisible, setIsMenuVisible] = useState(false); // 메뉴 상태

    //path 경로 추가하기 
    const menuItems = [ 
        { src: "/icon/menu/home.png", alt: "홈", activeSrc: "/icon/menu/home-active.png", path: '/' },
        { src: "/icon/menu/graph.png", alt: "소비리포트", activeSrc: "/icon/menu/graph-active.png", path: '' },
        { src: "/icon/menu/card.png", alt: "카드", activeSrc: "/icon/menu/card-active.png", path: '' },
        {   src: "/icon/menu/menu.png", 
            alt: "메뉴", 
            activeSrc: "/icon/menu/menu-active.png", 
            path: '' 
        }
    ];

    const handleMenuClick = (index) => {
        setActiveIndex(index);
        if (index === 3) {
            setIsMenuVisible(true); //메뉴 표시
        } else {
            setIsMenuVisible(false); //메뉴 숨김
        }
    };
    const handleCloseSideMenu = () => {
        setIsMenuVisible(false); // 사이드 메뉴 닫기 기능
    };
    return (
        <>
          <footer className='footer-wrap'>
              <ul className='menu-list'>
                  {menuItems.map((item, index) => (
                      <li key={index}>
                          <Link 
                              to={item.path} 
                              onClick={() => handleMenuClick(index)}
                          >
                              <img 
                                  src={activeIndex === index ? item.activeSrc : item.src} 
                                  alt={item.alt} 
                              />
                          </Link>
                      </li>
                  ))}
              </ul>
          </footer>
          {isMenuVisible && <Menu onClose={handleCloseSideMenu} />} {/* 메뉴가 보일 때만 렌더링 */}
        </>
    );
}

export default Footer;