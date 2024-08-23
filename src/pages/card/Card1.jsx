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
        cellAlign: 'right',
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

    return (
        <div style={{ marginTop: '130px'}}>
            <ProgressBar
                stages={['카드 선택', '정보 입력', '동의 사항', '카드 수령', '결제 정보']}
                currentStage={'카드 선택'}
            />

            {selectedCard && (
                <h5 style={{ textAlign: 'left',fontWeight: 'bold', margin: 'auto 110px', marginTop: '30px' }}>
                    {selectedCard.cardName}
                </h5>
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
                    <div className='selected-card'>
                        <div>선택한 카드이름: {selectedCard.cardName}</div>
                        <div>카드사용목적: {selectedCard.cardUsage}</div>
                        <div>카드한도: {selectedCard.cardLimit}</div>
                        <div>연회비: {selectedCard.annualFee}</div>
                    </div>
                )}
            </div>
            <br />
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
            <div className='menubar'></div>
        </div>
    );
}

export default Card1;
