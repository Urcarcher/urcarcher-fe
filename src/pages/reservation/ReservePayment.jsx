import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Preloader from 'bootstrap-template/components/Preloader';
import { Button, Container, Form } from 'react-bootstrap';
import Flickity from 'react-flickity-component';
import Axios from 'axios';
import CardOverlay from 'bootstrap-template/components/cards/CardOverlay';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'assets/Language.css';
import SelectLanguage from 'components/language/SelectLanguage';

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
    const [cardBalance, setCardBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { t, i18n } = useTranslation();
    const changeLanguage = (selectedLanguage) => {
        
        const languageMap = {
            Korea: 'ko',
            English: 'en',
            Japan: 'jp',
            China: 'cn'
        };
        const languageCode = languageMap[selectedLanguage] 
        i18n.changeLanguage(languageCode);
    };
    
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
        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }

        Axios.get("/api/t/test")
            .then((response) => {
                setUserId(response.data.memberId);
            })
            .catch(() => {
                alert("회원정보를 가져오는데 오류 발생");
            });
            
        if (userId) {
            Axios.get(`/api/card/mycard/${userId}`)
                .then((response) => {
                    console.log(response.data);
                    const cards = response.data.map(card => ({
                        ...card,
                        cardStatus: card.cardStatus
                    }));
                    setMyCard(cards);
                    if (cards.length > 0) {
                        setCardId(cards[0].cardId);// 첫 번째 카드의 ID를 기본 설정
                    }
                })
                .catch((error) => {
                    console.log("카드 정보를 가져오는데 오류 발생");
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
        setCardBalance(card.cardBalance);
        setPayAmount(state.price - (state.price * 0.1));
        setCurrentDate(new Date().toISOString());
    }

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
            //alert(t('reservation_successful'));
            console.log("예약성공");
            navigate('/');
        })
        .catch(() => {
            setLoading(false);
            console.log(resTimeParam);
            //alert(t('reservation_failed'));
            console.log("예약실패");
        });
    };

    return (
        <ScrollableContainer>
          {/* {loading && <Preloader type={'pulse'} variant={'primary'} center={true} />} */}
          {loading && 
            <PreloaderWrapper>
              <Preloader type={'pulse'} variant={'primary'} center={true} />
            </PreloaderWrapper>
          }
            <div>
                <br/><br/><br/><br/><br/>
                <Container>
                    <h2>{t('ProductPayment')}</h2>
                    <hr/>
                    <br/>
                    {state ? (
                        <>
                            <ProductCard>
                                <ProductImage src={state.img} alt={title}/>
                                <ProductInfo>
                                    <ProductTitle>{state.title}</ProductTitle>
                                </ProductInfo>
                                <PriceInfo>
                                    <DiscountTag>{t('CardBenefits')}</DiscountTag>
                                    <OriginalPrice>{(state.price).toLocaleString()}원</OriginalPrice>
                                    <DiscountedPrice>{t('Discount')}</DiscountedPrice>
                                </PriceInfo>
                            </ProductCard>
                            <br/>
                            <TotalAmount>
                                <span>{t('TotalPaymentAmount')}</span>
                                {/* <span>{payAmount.toLocaleString()}원</span> */}
                                <span>{(state.price - (state.price * 0.1)).toLocaleString()}원</span>
                            </TotalAmount>
                        </>
                    ) : (
                        <p>{t('NoProductInfo')}</p>
                    )}
                    <hr/>
                    <br/><br/>
                    <div>
                        <h4>{t('PaymentMethod')}</h4>
                        <PaymentOptionsContainer>
                            <PaymentOptionCard>
                                <PaymentOption 
                                    type="radio" 
                                    id="credit-card-simple" 
                                    label={t('CardSimplePayment')}
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
                                          MyCard : {(card.cardTypeId === 1 || card.cardTypeId === 2) ? t('CreditCard'):t('PrepaidCard')}
                                        </p>
                                        <p style={{fontWeight:'bold', color:'darkgrey', textAlign:'left', marginLeft:'17px', fontSize:'15px'}}>
                                          {(card.cardTypeId === 1 || card.cardTypeId === 2) ? "" : t('Balance') + " | "+ parseFloat(card.cardBalance).toLocaleString()+t('Won')}
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

                    if ((cardTypeId !== 1 && cardTypeId !== 2) && (Number(cardBalance)<Number(payAmount)) ){
                        alert("선불카드의 잔액이 부족합니다.");
                        setLoading(false);
                    }else{
                        // 결제테이블의 결제 데이터 저장
                        Axios.post('/api/payment/insert',
                            {
                              paymentPrice: payAmount,
                              paymentDate: currentDate,
                              cardId: cardId,
                              storeId: '11111111'
                            })
                            .then((response) => {
                              if (cardTypeId !== 1 && cardTypeId !== 2) {
                                // 선불카드일 경우 잔액 차감
                                Axios.post('/api/card/usepayment', 
                                {
                                  cardId: String(cardId),
                                  cardBalance: String(payAmount)
                                }).then((response) => {
                                  console.log("잔액차감 정상적으로 작동");
                                  processReservation(); //선불카드 잔액 차감 후 예약
                                }).catch((error) => {
                                  console.log("잔액차감 비정상적으로 작동");
                                })
                              }else {
                                processReservation(); //그외 신용카드는 그냥 예약
                            }
                              setTimeout(() => {
                                setLoading(false);
                                console.log('Payment inserted successfully:', response.data);
                                alert(t('DepositPaymentSuccess'));
                                navigate('/');
                              }, 3000);
                            })
                            .catch((error) => {
                                setTimeout(() => {
                                setLoading(false);
                                console.error('Error inserting payment:', error);
                                alert(t('DepositPaymentFailure'));
                              }, 3000);
                            });
                    }
                }} style={{width: '80%'}}>{t('MakePayment')}</Button>
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

const PreloaderWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.75); /* 반투명 배경 */
    z-index: 1000;
`;

export default ReservePayment;
