import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Preloader from 'bootstrap-template/components/Preloader';
import { Button, Container, Form } from 'react-bootstrap';
import Flickity from 'react-flickity-component';
import Axios from 'axios';
import CardOverlay from 'bootstrap-template/components/cards/CardOverlay';

function ReservePayment() {
    const location = useLocation();
    const { state } = location;
    const { title, price, peopleNum, resDate, resTime, selectedSeat, locations, classification } = state || {}; //공연
    const { reservePersonNum, reserveDate, reserveTime, reserveLocation } = state || {}; //맛집

    const [paymentMethod, setPaymentMethod] = useState('credit-card-simple');
    const handlePaymentMethodChange = (e) => setPaymentMethod(e.currentTarget.value);
    const [userId, setUserId] = useState(null);
    const [myCard, setMyCard] = useState([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);
    const [cardId, setCardId] = useState('');
    const [payAmount, setPayAmount] = useState(price - (price * 0.1)); // 할인 적용된 결제 금액
    const [currentDate, setCurrentDate] = useState(new Date().toISOString());
    const [cardTypeId, setCardTypeId] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const flickityOptions = {
        cellAlign: 'center',
        pageDots: false,
        groupCells: '20%',
        selectedAttraction: 0.03,
        friction: 0.15,
        contain: false,
        initialIndex: 0
    };

    useEffect(() => {
        Axios.get("/api/t/test")
            .then((response) => {
                setUserId(response.data.memberId);
            })
            .catch(() => {
                alert("회원정보를 가져오는데 오류 발생");
            });
    }, []);

    useEffect(() => {
        if (userId) {
            Axios.get(`/api/card/mycard/${userId}`)
                .then((response) => {
                    const cards = response.data.map(card => ({
                        ...card,
                        cardStatus: card.cardStatus
                    }));
                    setMyCard(cards);
                    if (cards.length > 0) {
                        setCardId(cards[0].cardId);
                        setCardTypeId(cards[0].cardTypeId);
                    }
                })
                .catch(() => {
                    console.log("카드 정보를 가져오는데 오류 발생");
                });
        }
    }, [userId]);

    useEffect(() => {
        if (myCard.length > 0) {
            const selectedCard = myCard[selectedCardIndex];
            setCardId(selectedCard.cardId);
            setCardTypeId(selectedCard.cardTypeId);
            setPayAmount(price - (price * 0.1));
            setCurrentDate(new Date().toISOString());
        }
    }, [selectedCardIndex, myCard, price]);

    const handlePayment = () => {
        setLoading(true);
        Axios.post('/api/payment/insert', {
            paymentPrice: payAmount,
            paymentDate: currentDate,
            cardId: cardId,
            storeId: '11111111'
        })
        .then(() => {
            if (cardTypeId !== 1 && cardTypeId !== 2) {
                Axios.post('/api/card/usepayment', {
                    cardId: String(cardId),
                    cardBalance: String(payAmount)
                }).then(() => {
                    processReservation();
                }).catch(() => {
                    console.log("잔액 차감 오류");
                    console.log(price);
                });
            } else {
                processReservation();
            }
        })
        .catch(() => {
            setLoading(false);
            alert("예약금 결제 실패");
        });
    };

    const processReservation = () => {
        // 공연 파라미터로 일단 초기화
        let peopleNumParam = peopleNum;
        let resDateParam = resDate;
        let resTimeParam = resTime;
        let locationParam = locations;
        let memberIdParam = userId;
        let seatParam = selectedSeat; //선택한좌석

        //맛집일때 변경
        if (classification === 2) {
            peopleNumParam = reservePersonNum; 
            resDateParam = reserveDate; 
            resTimeParam = reserveTime;
            locationParam = reserveLocation; 
            seatParam = "예약석";
        } 

        Axios.post('/api/reserve/insert', {
            state: 1, //1: 예약완료
            name: title, //공연or축제명
            price: price, //가격
            classification: classification, //분류 1:공연, 2:축제
            peopleNum: peopleNumParam,
            reservationDate: resDateParam,
            reservationTime: resTimeParam,
            location: locationParam,
            memberId: memberIdParam,
            seat: seatParam
        })
        .then(() => {
            setLoading(false);
            alert("예약금 결제 및 예약 성공");
            navigate('/');
        })
        .catch(() => {
            setLoading(false);
            console.log(resTimeParam);
            alert("예약금 결제는 성공했지만 예약에 실패했습니다.");
        });
    };

    return (
        <ScrollableContainer>
          {loading && <Preloader type={'pulse'} variant={'primary'} center={true} />}
            <div>
                <br/><br/><br/><br/><br/>
                <Container>
                    <h1>상품 결제</h1>
                    <hr/>
                    <br/>
                    {state ? (
                        <>
                            <ProductCard>
                                <ProductImage src={state.img} alt={title}/>
                                <ProductInfo>
                                    <ProductTitle>{title}</ProductTitle>
                                </ProductInfo>
                                <PriceInfo>
                                    <DiscountTag>카드 혜택</DiscountTag>
                                    <OriginalPrice>{price.toLocaleString()}원</OriginalPrice>
                                    <DiscountedPrice>10% 할인</DiscountedPrice>
                                </PriceInfo>
                            </ProductCard>
                            <br/>
                            <TotalAmount>
                                <span>총 결제금액</span>
                                <span>{payAmount.toLocaleString()}원</span>
                            </TotalAmount>
                        </>
                    ) : (
                        <p>상품 정보가 없습니다.</p>
                    )}
                    <hr/>
                    <br/><br/>
                    <div>
                        <h4>결제 수단</h4>
                        <PaymentOptionsContainer>
                            <PaymentOptionCard>
                                <PaymentOption 
                                    type="radio" 
                                    id="credit-card-simple" 
                                    label="카드 간편결제" 
                                    value="credit-card-simple" 
                                    checked={paymentMethod === 'credit-card-simple'} 
                                    onChange={handlePaymentMethodChange} 
                                />
                            </PaymentOptionCard>

                            <FlickityStyled
                                options={flickityOptions}
                                flickityRef={(c) => {
                                    if (c) {
                                        c.on('select', () => {
                                            setSelectedCardIndex(c.selectedIndex);
                                        });
                                    }
                                }}
                            >
                                {myCard.map((card) => (
                                    <CarouselCell key={card.cardId}>
                                        <CardOverlay
                                            className='my-custom-class'
                                            img={require(`../../assets/Card${card.cardTypeId}_.png`)}
                                            imgStyle={{width: '335px', height: '200px'}}
                                        />
                                        <p style={{fontWeight:'bold', color:'darkgrey', textAlign:'left', marginLeft:'17px', fontSize:'15px', marginTop:'5px' , marginBottom:'5px'}}>
                                          MyCard : {(card.cardTypeId === 1 || card.cardTypeId === 2) ? "신용카드":"선불카드"}
                                        </p>
                                        <p style={{fontWeight:'bold', color:'darkgrey', textAlign:'left', marginLeft:'17px', fontSize:'15px'}}>
                                          {(card.cardTypeId === 1 || card.cardTypeId === 2) ? "" : "MyMoney : " + parseFloat(card.cardBalance).toLocaleString()+"원"}
                                        </p>
                                        <br/>
                                    </CarouselCell>
                                ))}
                            </FlickityStyled>
                        </PaymentOptionsContainer>
                    </div>
                </Container>
                <br/>
                <Button onClick={handlePayment} style={{width: '80%'}}>결제하기</Button>
            </div>
        </ScrollableContainer>
    );
}

const ScrollableContainer = styled.div`
    max-height: 800px;
    overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;
`;

const CarouselCell = styled.div`
    margin: 0 32px;
`;

const FlickityStyled = styled(Flickity)`
    .flickity-slider .is-pointer-down,
    .flickity-slider .flickity-prev-next-button:focus {
        outline: none;
        border: none;
        box-shadow: none;
    }

    .flickity-button {
        display: none;
    }
`;

const PaymentOptionCard = styled.div`
    background-color: #f8f9fa;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid transparent;
    transition: border 0.3s ease;

    &:hover {
        border: 1px solid #2ba64a;
    }

    input {
        margin-right: 10px;
    }

    label {
        margin-bottom: 0;
        flex: 1;
    }
`;

const PaymentOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const PaymentOption = styled(Form.Check)`
    margin-bottom: 0;
`;

const ProductCard = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 10px;
`;

const ProductImage = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 8px;
`;

const ProductInfo = styled.div`
    flex: 1;
    margin-left: 15px;
`;

const ProductTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
`;

const PriceInfo = styled.div`
    text-align: right;
`;

const OriginalPrice = styled.div`
    font-size: 12px;
    color: gray;
    text-decoration: line-through;
`;

const DiscountedPrice = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #2ba64a;
`;

const DiscountTag = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    color: white;
    background-color: #476EFF;
    padding: 2px 4px;
    border-radius: 3px;
    margin-bottom: 5px;
`;

const TotalAmount = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 18px;
    padding: 15px;
    background-color: #EDF0F7;
    border-radius: 10px;
`;

export default ReservePayment;
