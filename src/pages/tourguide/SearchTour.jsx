import React, { useEffect, useState } from 'react';
import CardOverlay from '../../bootstrap-template/components/cards/CardOverlay';
import { Link } from 'react-router-dom';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

function SearchTour(props) {
    // contenttypeid = 12 : 관광 / 39 : 식당
    //let contentTypeId = useState();

    let [contentTypeId, setContentTypeId] = useState('12');

    const radios = [
        { name: '관광지', value: '12' },
        { name: '맛집', value: '39' }
    ];
    const handleRadioChange = (value) => {
        setContentTypeId(value);
        // test -- 비동기 방식으로 작동하기때문에 기존의 값이 출력됨
        // console.log(contentTypeId);
    };


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

    return (
        <>
        <br/>
        <br/>
        <br/>
        <hr/>
        <p style={{textAlign:'left', padding:'10px'}}>원하시는 카테고리를 선택하신 뒤 지역을 선택해주세요</p>
        <ButtonGroup className="mb-3">
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={contentTypeId === radio.value ? 'primary' : 'outline-secondary'}
                        name="radio"
                        value={radio.value}
                        checked={contentTypeId === radio.value}
                        onChange={(e) => handleRadioChange(e.currentTarget.value)}
                        className="px-3 py-2"
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
        </ButtonGroup>

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
        </>
    );
}

export default SearchTour;
