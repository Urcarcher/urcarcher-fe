import React, { useState, useEffect } from 'react';
import '../../assets/Card.css';
import Flickity from 'react-flickity-component';
import axios from 'axios';
import { useCardContext } from './CardContext';
import { useNavigate } from 'react-router-dom';
import CardOverlay from 'bootstrap-template/components/cards/CardOverlay';
import ProgressBar from './ProgressBar';
import { Button } from 'react-bootstrap';

function Card1() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { produceCardOffer, setProduceCardOffer } = useCardContext();
    let navigate = useNavigate();

    const flickityOptions = {
        cellAlign: 'center',
        pageDots: false,
        groupCells: '20%',
        selectedAttraction: 0.03,
        friction: 0.15,
    };

    useEffect(() => {
        axios.get('/api/cards')
            .then(response => {
                console.log('Fetched cards:', response.data);
                setCards(response.data);
                if (response.data.length > 0) {
                    setSelectedCard(response.data[0]);
                }
                setIsLoading(false);  // 데이터 로드 완료
            })
            .catch(error => {
                console.error('There was an error fetching the cards!', error);
                setIsLoading(false);  // 데이터 로드 실패
            });
    }, []);

    const handleChange = (index) => {
        if (cards.length > 0 && index < cards.length) {
            setSelectedCard(cards[index]);
        } else {
            console.log("카드 데이터가 아직 로드되지 않았습니다.");
        }
    };

    // 카드 별 혜택 정의
    const getCardBenefits = (cardTypeId) => {
        switch (cardTypeId) {
            case 1:
                return [
                    "주요 관광지 입장권 할인",
                    "공항 픽업 및 셔틀 서비스 할인",
                    "지정된 레스토랑 및 카페에서 10% 할인",
                    "환전 수수료 면제 및 특별 환율 제공"
                ];
            case 2:
                return [
                    "호텔 숙박비 할인",
                    "무료 SIM 카드 제공",
                    "여행자 보험 무료 가입",
                    "관광지 티켓 사전 예약 서비스"
                ];
            case 3:
                return [
                    "대중교통 및 택시 할인",
                    "공항 라운지 무료 이용",
                    "뮤지컬 및 공연 티켓 할인",
                    "VIP 라운지 이용권 제공"
                ];
            case 4:
                return [
                    "박물관, 갤러리, 역사적 명소 입장료 할인",
                    "여행자 보험 무료 제공",
                    "주요 관광지 티켓 구매 시 할인 혜택",
                    "Wi-Fi 핫스팟 무료 이용"
                ];
            case 5:
                return [
                    "환승 및 렌트카 서비스 할인",
                    "카페 및 코워킹 스페이스 할인",
                    "여행 및 라이프스타일 관련 월간 혜택 제공",
                    "문화 체험 프로그램 할인"
                ];
            default:
                return [
                    "기본 혜택 1",
                    "기본 혜택 2",
                    "기본 혜택 3",
                    "기본 혜택 4"
                ];
        }
    };

    return (
        <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
            <ProgressBar
                stages={['카드 선택', '정보 입력', '동의 사항', '카드 수령', '결제 정보']}
                currentStage={'카드 선택'}
            />

            {selectedCard && (
                <div style={{ textAlign: 'left',fontWeight: 'bolder', margin: 'auto 110px', marginTop: '30px', fontSize: '18px' }}>
                    {selectedCard.cardName}
                </div>
            )}

            <div className='content'>
                <div className='carousel-container'>
                    {isLoading ? (
                        <div>카드 불러오는 중...</div>
                    ) : (
                        <Flickity
                            className='carousel'
                            options={flickityOptions}
                            flickityRef={(c) => {
                                if (c) {
                                    c.on('change', (index) => handleChange(index));
                                }
                            }}
                        >
                            {cards.map((card, index) => (
                                <div className="carousel-cell" key={card.cardTypeId}>
                                    <CardOverlay
                                        className='my-custom-class'
                                        img={require(`../../assets/Card${index + 1}.png`)}
                                        imgStyle={{ width: '200px', height: '335px' }}
                                        style={{ fontsize: '0px' }}
                                    />
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            ))}
                        </Flickity>
                    )}
                </div>

                {selectedCard && (
                    <div style={{
                        backgroundColor: 'white',
                        width: '300px',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        margin: '20px auto'
                    }}>
                        {/* <div style={{display: 'flex', justifyContent: 'space-between'}}> */}
                        
                            <div style={{
                                fontSize: '14px',
                                color: '#476EFF',
                                fontWeight: 'bold',
                            }}>
                                {selectedCard.cardUsage}
                            </div>
                            <div style={{
                                fontSize: '12px',
                                fontWeight: 'bold',
                                marginTop: '5px'
                            }}>
                                {selectedCard.annualFee}원&nbsp;
                                <span style={{ fontSize: '11px', color: '#999' }}>(연회비)</span>
                            </div>
                        {/* </div> */}


                        <ul style={{
                            listStyle: 'none',
                            padding: '0',
                            textAlign: 'left'
                        }}>
                            {getCardBenefits(selectedCard.cardTypeId).map((benefit, idx) => (
                                <li key={idx} style={{ margin: '10px 0', fontSize: '1em' }}>✓ {benefit}</li>
                            ))}
                        </ul>
                        <Button
                            style={{
                                width: '80%',
                                padding: '12px',
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                            onClick={() => {
                                if (selectedCard) {
                                    setProduceCardOffer(prevState => ({
                                        ...prevState,
                                        card_type_id: selectedCard.cardTypeId // 선택된 카드 타입 
                                    }));
                                    setTimeout(() => navigate('/card2'), 300);
                                } else {
                                    console.log('카드가 선택되지 않았습니다.');
                                }
                            }}>신청하기</Button>
                    </div>
                )}
            </div>
            <br />

            <div className='menubar'></div>
        </div>
    );
}

export default Card1;
