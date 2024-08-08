import React, { useState, useEffect } from 'react';
import '../assets/Card.css';
import Flickity from 'react-flickity-component';
import axios from 'axios';

function Card() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);

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
            })
            .catch(error => {
                console.error('There was an error fetching the cards!', error);
            });
    }, []);

    const handleChange = (index) => {
        console.log(index);
        if (cards.length > 0) {
            setSelectedCard(cards[index]);
        } else {
            console.log("카드 데이터가 아직 로드되지 않았습니다.");
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                카드 신청
            </div>

            <div className='content'>

                <ul className="progressbar">
                    <li className="complete"></li>
                    <li className="complete"></li>
                    <li className="active"></li>
                    <li className="half-complete"></li>
                </ul>

                <div className='carousel-container'>
                    <Flickity
                        className='carousel'
                        options={flickityOptions}
                        flickityRef={(c) => {
                            if (c) {
                                c.on('change', (index) => handleChange(index));
                            }
                        }}
                    >
                        {cards.map((card) => (
                            <div className="carousel-cell" key={card.cardTypeId}>
                                <img src={card.cardImg} className="p" alt={card.cardName} />
                                <div className='selected-card'>
                                    <div>카드이름: {card.cardName}</div>
                                    <div>카드사용목적: {card.cardUsage}</div>
                                    <div>카드한도: {card.cardLimit}</div>
                                    <div>연회비: {card.annualFee}</div>
                                </div>
                            </div>
                        ))}

                    </Flickity>
                    
                    {/* {selectedCard && (
                        <div className='selected-card'>
                            <div>카드이름: {selectedCard.cardName}</div>
                            <div>카드사용목적: {selectedCard.cardUsage}</div>
                            <div>카드한도: {selectedCard.cardLimit}</div>
                            <div>연회비: {selectedCard.annualFee}</div>
                        </div>
                    )} */}

                </div>

               
            </div>

            <div className='menubar'></div>

        </div>
    );
}

export default Card;
