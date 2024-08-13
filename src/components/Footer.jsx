import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        { src: "/icon/menu/home.png", alt: "홈", activeSrc: "/icon/menu/home-active.png", path: '' },
        { src: "/icon/menu/graph.png", alt: "소비리포트", activeSrc: "/icon/menu/graph-active.png", path: '' },
        { src: "/icon/menu/card.png", alt: "카드", activeSrc: "/icon/menu/card-active.png", path: '' },
        { src: "/icon/menu/menu.png", alt: "메뉴", activeSrc: "/icon/menu/menu-active.png", path: '' }
    ];
    return (
        <footer className='footer-wrap'>
           <ul className='menu-list'>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link 
                            to={item.path} 
                            onClick={() => setActiveIndex(index)}
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
    );
}

export default Footer;