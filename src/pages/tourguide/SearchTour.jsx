import React, { useState, useCallback } from 'react';
import CardOverlay from '../../bootstrap-template/components/cards/CardOverlay';
import { Link } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

function SearchTour(props) {

    let [contentTypeId, setContentTypeId] = useState('12');

    const radios = [
        { name: '관광지', value: '12' },
        { name: '맛집', value: '39' }
    ];
    // 버튼 클릭 헨들러 함수가 리렌더링될때마다 새로생성되지 않게 useCallback함수 사용
    const handleRadioChange = useCallback((value) => {
        setContentTypeId(value);
    },[]);


    const cardsData = [
        { title: 'SEOUL', img: '/img/seoul.jpg', areaCode:'1' },
        { title: 'BUSAN', img: '/img/busan.jpg', areaCode:'6' },
        { title: 'JEJU', img: '/img/jeju.jpg', areaCode:'39' },
        { title: 'INCHEON', img: '/img/incheon.jpg', areaCode:'2' },
        { title: 'GYEONGGI', img:'/img/gyeonggi-do.jpg', areaCode:'31' },
        { title: 'GANGWON', img:'/img/gangwon-do.jpg', areaCode:'32' },
        { title: 'JEON\nNAM', img:'/img/jeonnam.jpg', areaCode:'38' },
        { title: 'JEON\nBUK', img:'/img/jeonbuk.jpg', areaCode:'37' },
        { title: 'GYEONG\nNAM', img:'/img/gyeongnam.jpg', areaCode:'36' },
        { title: 'GYEONG\nBUK', img:'/img/gyeongbuk.jpg', areaCode:'35' },
    ];


    const buttonStyle = (isActive) => ({
        width: '100px',
        textAlign: 'center',
        padding: '8px 10px',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius: '20px',
        margin: '0 5px',
        backgroundColor: isActive ? '#476EFF' : '#f8f9fa',
        color: isActive ? 'white' : '#007bff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s, color 0.3s',
        border: 'none',  // 테두리 제거
    });

    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <p style={{textAlign:'left', padding:'10px'}}>원하시는 카테고리를 선택하신 뒤 지역을 선택해주세요</p>
        <ButtonGroup className="mb-3 d-flex justify-content-center">
            {radios.map((radio, idx) => (
                <button
                    key={idx}
                    style={buttonStyle(contentTypeId === radio.value)}
                    onClick={() => handleRadioChange(radio.value)}
                >
                    {radio.name}
                </button>
            ))}
        </ButtonGroup>
        <div  className="scrollable-content" style={{ maxHeight: '600px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            
            {cardsData.map((card, index) => (
                
                <div key={index} style={{ flex: '1 1 calc(50% - 20px)', maxWidth: 'calc(50% - 20px)' }}>
                    <Link to={`/tourguide/${card.areaCode}/${contentTypeId}`}>
                        <CardOverlay
                                className="my-custom-class" 
                                title={card.title}
                                img={card.img}
                                style={{
                                    color: '#ffffff',  // 흰색 글자
                                    textAlign: 'center',
                                    fontSize: '2rem',  // 글자 크기
                                    fontWeight: '700',  // 굵은 글자
                                    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)',  // 텍스트 그림자
                                    fontFamily: 'Poppins, sans-serif',  // 세련된 폰트
                                    letterSpacing: '2px',  // 글자 간격 조정
                                    position: 'absolute',
                                    top: '40px',  // 타이틀이 상단에 위치하도록 설정
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    zIndex: 1
                                }}
                                titleSize={'2rem'}  // titleSize 속성 전달
                                imgStyle={{ height: '200px', width: '100%', objectFit: 'cover' }}  // 이미지 스타일 전달
                            />
                    </Link>
                </div>
            ))}
        </div>
        </div>
        </>
    );
}

export default SearchTour;
