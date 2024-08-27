import React, { useEffect, useState } from 'react';
import US_Icon  from 'assets/icon-nation/icon-us.png';
import Japan_Icon from 'assets/icon-nation/icon-jp.png';
import China_Icon from 'assets/icon-nation/icon-cn.png';
import Korea_Icon from 'assets/icon-nation/icon-kr.png';

function SelectLanguage(props) {  //Home.jsx 연결

    /* 디자인-1 토글 창 */
    // const [isOpen, setIsOpen] = useState(false);
    // const [selectedOption, setSelectedOption] = useState(' Language');

    // const options = ['English', 'Japan', 'China', 'Korea'];

    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen);
    // };

    // const handleOptionClick = (option) => {
    //     setSelectedOption(option);
    //     setIsOpen(false);
    // };

    // return (
    //     <div className="lang-custom-dropdown">
    //         <div className="lang-dropdown-selected" onClick={toggleDropdown}>
    //             <p>🌐</p>
    //             <p className='selected-nation'>{selectedOption}</p>
    //             <p className={`lang-dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</p>
    //         </div>
    //         {isOpen && (
    //             <ul className="lang-dropdown-options">
    //                 {options.map((option, index) => (
    //                     <li key={index} onClick={() => handleOptionClick(option)}>
    //                         {option}
    //                     </li>
    //                 ))}
    //             </ul>
    //         )}
    //     </div>
    // );

    /* 디자인-2 모달창 */
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('한국어');
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const options = ['English', 'Japan', 'China', 'Korea'];

    // 나라에 해당하는 이미지 경로를 객체로 관리
    const countryIcons = {
        English: US_Icon,
        Japan: Japan_Icon,
        China: China_Icon,
        Korea: Korea_Icon
    };
    useEffect(()=>{
        setSelectedOption('Korea');
    },[])
    const toggleDropdown = () => {
        // setIsOpen(!isOpen);
           setSelectedOption('Korea');
        setIsModalOpen(true);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        //setIsOpen(false);
        setIsModalOpen(true);
    };

    const closeModal = (e) => {
        // 모달 바깥 영역을 클릭했을 때만 모달을 닫음
        if (e.target.className === 'lang-modal-overlay') {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="lang-custom-dropdown">
            {/* 모달창 */}
            {isModalOpen && (
            <div className="lang-modal-overlay" onClick={closeModal}>
                {/* {isOpen && ( */}
                <div className="lang-modal-contents">
                <h3 style={{textAlign:'left', wordBreak:'keep-all'}}>여러분의 언어를 선택하세요</h3>
                <h5>현재 언어</h5>
                    <div className="lang-modal-list">
                            <p className='lang-active'>
                            <img src={countryIcons[selectedOption]} alt="나라" style={{width:'30px' }} /> 
                            <span style={{display:'block', lineHeight:'30px'}}>{selectedOption === 'Korea' ? '한국어' : selectedOption}</span>
                            </p>
                    </div>
                    <h5>언어 선택</h5>
                    <div className="lang-modal-list">
                        {options.map((option, index) => (
                            <p key={index} 
                            onClick={() => handleOptionClick(option)} 
                            // className={index === 0 ? 'lang-txt lang-active' : 'lang-txt'}
                            className='lang-txt'
                            >
                                <img src={countryIcons[option]} alt="나라" style={{width:'30px' }} /> 
                                <span style={{display:'block', lineHeight:'30px'}}>{option}</span>
                            </p>
                        ))}
                    </div>
                </div>
                {/* )} */}
            </div>
             )} 
            <div className="lang-dropdown-selected" onClick={toggleDropdown}>
                <p>🌐</p>
                <p className='selected-nation'>Language</p>
            </div>
        </div>
        
    );
  
}

export default SelectLanguage;