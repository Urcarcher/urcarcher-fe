import React, { useState, useEffect } from 'react';
import '../../assets/Card.css';
import Flickity from 'react-flickity-component';
import axios from 'axios';
import { useCardContext } from './CardContext';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Card1() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {produceCardOffer, setProduceCardOffer} = useCardContext();

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
            // console.log('Selected card:', cards[index]);
        } else {
            console.log("카드 데이터가 아직 로드되지 않았습니다.");
        }
    };

    return (
        <div className='container'>
            {/* <Header /> */}

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
                                    {/* <img src={card.cardImg} className="p" alt={card.cardName} /> */}
                                    <img src={require('../../assets/Card1.png')} width='200' height='335'  imageStyle={{borderRadius: 15}}/>
                                    <div className='card-info'>
                                        <div>카드이름: {card.cardName}</div>
                                        <div>카드사용목적: {card.cardUsage}</div>
                                        <div>카드한도: {card.cardLimit}</div>
                                        <div>연회비: {card.annualFee}</div>
                                    </div>
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
            
            <button onClick={() => {
                if(selectedCard) {
                    setProduceCardOffer(prevState => ({
                        ...prevState,
                        card_type_id:selectedCard.cardTypeId // 선택된 카드 타입 
                    }));
                    setTimeout(() => navigate('/card2'), 300);
                }else{
                    console.log('카드가 선택되지 않았습니다.');
                }
                 }}>신청하기</button>
            <div className='menubar'></div>
        </div>
    );
}

export default Card1;