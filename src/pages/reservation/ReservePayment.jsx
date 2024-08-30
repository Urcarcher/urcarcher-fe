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
    // const state = location.state;
    // const { peopleNum } = state || {};
    // const resDate = state?.resDate || new Date();
    // const price = state?.price;
    const { state } = location;

    // state 객체에서 값 추출 및 기본값 설정
    const { title, price, peopleNum, resDate, resTime, selectedSeats, locations } = state || {};

    console.log('State:', state);
console.log('Price:', price);
console.log('Name:', title);
console.log('selectedSeats:', selectedSeats);
const seatString = selectedSeats.join(', ');

    const [paymentMethod, setPaymentMethod] = useState('credit-card-simple');
    const handlePaymentMethodChange = (e) => setPaymentMethod(e.currentTarget.value);
    const [userId, setUserId] = useState(null);
    const [myCard, setMyCard] = useState([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(0); // 추가: 선택된 카드의 인덱스 관리
    const [cardId, setCardId] = useState('');
    const [payAmount, setPayAmount] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString());
    const [cardTypeId, setCardTypeId] = useState(0);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const flickityOptions = {
        cellAlign: 'center',
        pageDots: false,
        groupCells: '20%',
        selectedAttraction: 0.03,
        friction: 0.15,
        contain: false,
        initialIndex: 0 // 첫 번째 카드가 중앙에 오도록 설정
    };

    useEffect(() => {
        Axios.get("/api/t/test")
            .then((response) => {
                setUserId(response.data.memberId);
            })
            .catch((error) => {
                alert("회원정보를 가져오는데 오류 발생");
            });

        if (userId) {
            Axios.get(`/api/card/mycard/${userId}`)
                .then((response) => {
                    setMyCard(response.data);
                    const cards = response.data.map(card => ({
                        ...card,
                        cardStatus: card.cardStatus
                    }));
                    setMyCard(cards);
                    if (cards.length > 0) {
                        setCardId(cards[0].cardId); // 첫 번째 카드의 ID를 기본 설정
                    }
                })
                .catch((error) => {
                    console.log("card정보 가져오는데 오류 발생");
                    console.log(error);
                });
        }
    }, [userId]);

    useEffect(() => {
        if (myCard.length > 0) {
            const selectedCard = myCard[selectedCardIndex];
            updatePayData(selectedCard);
        }
    }, [selectedCardIndex, myCard]);

    function updatePayData(card) {
        console.log(card.cardId);
        console.log(state.price - (state.price * 0.1));
        console.log(new Date().toISOString());

        setCardId(card.cardId);
        setCardTypeId(card.cardTypeId);
        setPayAmount(state.price - (state.price * 0.1));
        setCurrentDate(new Date().toISOString());
    }

    return (
        <ScrollableContainer>
          {loading && <Preloader type={'pulse'} variant={'primary'} center={true} />}
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Container>
                    <h1 className=''>상품 결제</h1>
                    <hr/>
                    <br/>
                    {state ? (
                        <>
                            <ProductCard>
                                <ProductImage src={state.img}/>
                                <ProductInfo>
                                    <ProductTitle>{state.title}</ProductTitle>
                                </ProductInfo>

                                <PriceInfo>
                                    <DiscountTag>카드 혜택</DiscountTag>
                                    <OriginalPrice>{(state.price).toLocaleString()}원</OriginalPrice>
                                    <DiscountedPrice>10% 할인</DiscountedPrice>
                                </PriceInfo>
                            </ProductCard>
                            <br/>
                            <TotalAmount>
                                <span>총 결제금액</span>
                                <span>{(state.price - (state.price * 0.1)).toLocaleString()}원</span>
                            </TotalAmount>
                        </>
                    ) : (
                        <p>상품 정보가 없습니다.</p>
                    )}
                    <hr/>
                    <br/>
                    <br/>

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
                                {myCard.map((card, index) => (
                                    <CarouselCell key={card.cardId}>
                                        <CardOverlay
                                            className='my-custom-class'
                                            img={require(`../../assets/Card${card.cardTypeId}_.png`)}
                                            imgStyle={{width: '335px', height: '200px'}}
                                        />
                                        <p style={{fontWeight:'bold', color:'darkgrey', textAlign:'left', marginLeft:'17px', fontSize:'15px',marginTop:'5px' , marginBottom:'5px'}}>
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
                <Button onClick={() => {
                  setLoading(true);
                    Axios.post('/api/payment/insert',
                      {
                        paymentPrice: payAmount,
                        paymentDate: currentDate,
                        cardId: cardId,
                        storeId: '11111111'
                      })
                      .then((response) => {
                        if (cardTypeId !== 1 && cardTypeId !== 2) {
                          // 선불카드라면
                          Axios.post('/api/card/usepayment', 
                          {
                            cardId: String(cardId),
                            cardBalance: String(payAmount)
                          }).then((response) => {
                            console.log("잔액차감 정상적으로 작동");
                            reserve();
                          }).catch((error) => {
                            console.log("잔액차감 비정상적으로 작동");
                          })
                        }
                        setTimeout(() => {
                          setLoading(false);
                          console.log('Payment inserted successfully:', response.data);
                          alert("예약금 결제 성공");
                          navigate('/');
                        }, 3000);
                      })
                      .catch((error) => {
                          setTimeout(() => {
                          setLoading(false);
                          console.error('Error inserting payment:', error);
                          alert("예약금 결제 실패");
                        }, 3000);
                      });

                      const reserve = () => {
                        Axios.post('/api/reserve/insert', {
                            peopleNum: peopleNum, // 인원 수
                            reservationDate: resDate, // 예약일
                            reservationTime: resTime, //예약시간
                            state: 1, // 1: 예약완료
                            location: locations , // 예시 데이터: 장소
                            name: title,//공연명
                            classification: 1, // 1:축제, 2:맛집
                            memberId: userId, // 회원 ID
                            price: price, //가격
                            seat: seatString //좌석
                        }).then((response) => {
                            console.log('Reservation inserted successfully:', response.data);
                            setTimeout(() => {
                                setLoading(false);
                                alert("예약금 결제 및 예약 성공");
                                navigate('/');
                            }, 3000);
                        }).catch((error) => {
                            console.error('Error inserting reservation:', error);
                            setTimeout(() => {
                                setLoading(false);
                                alert("예약금 결제는 성공했지만 예약에 실패했습니다.");
                            }, 3000);
                        });
                    };
                      
                }} style={{width: '80%'}}>결제하기</Button>
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
        display: none; /* Flickity 버튼을 완전히 숨김 */
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
