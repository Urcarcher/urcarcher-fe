import CardOverlay from 'bootstrap-template/components/cards/CardOverlay';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Flickity from 'react-flickity-component';
import styled from 'styled-components';

function Payment(props) {
    const [paymentMethod, setPaymentMethod] = useState('credit-card-general');
    const handlePaymentMethodChange = (e) => setPaymentMethod(e.currentTarget.value);
    const flickityOptions = {
        cellAlign: 'center',
        pageDots: false,
        groupCells: '20%',
        selectedAttraction: 0.03,
        friction: 0.15,
        contain: false,
        initialIndex: 0 // 첫 번째 카드가 중앙에 오도록 설정
    };
    // 임시 --- main 카드로 정해진 것 간편결제로 지정
    const test = [{name:'card1', value:'test1', cardTypeId:11}];
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container>
                <h1 className=''>상품 결제</h1>
                <ProductCard>
                    <ProductImage src={props.img}/>
                    <ProductInfo>
                        <ProductTitle>{props.title}</ProductTitle>
                        <ProductOption>{props.option}</ProductOption>
                    </ProductInfo>

                    <PriceInfo>
                        <DiscountTag>카드 혜택</DiscountTag>
                        <OriginalPrice>{props.price}20,000원</OriginalPrice>
                        <DiscountedPrice>10% 할인</DiscountedPrice>
                    </PriceInfo>
                </ProductCard>
                <br/>
                <br/>
                <TotalAmount>
                    <span>총 결제금액</span>
                    <span>{props.price - (props.price*0.1)}100</span>
                </TotalAmount>

                <br/>
                <br/>

                <div>
                    <h5>결제 수단</h5>
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
                                console.log(c);
                                //c.on('change', (index) => handleChange(index));
                            }
                        }}
                    >
                        {test.map((t, index) => (
                            <CarouselCell key={t.cardTypeId}>
                                <CardOverlay
                                    className='my-custom-class'
                                    img={ require(`../../assets/Card${t.cardTypeId}.png`)}
                                    imgStyle={{width:'335px', height:'200px'}}
                                />
                            </CarouselCell>
                        ))}
                    </FlickityStyled>

                        <PaymentOptionCard>
                            <PaymentOption 
                                type="radio" 
                                id="credit-card-general" 
                                label="신용카드 일반결제" 
                                value="credit-card-general" 
                                checked={paymentMethod === 'credit-card-general'} 
                                onChange={handlePaymentMethodChange} 
                            />
                        </PaymentOptionCard>
                        
                        <PaymentOptionCard>
                            <PaymentOption 
                                type="radio" 
                                id="bank-transfer" 
                                label="계좌이체" 
                                value="bank-transfer" 
                                checked={paymentMethod === 'bank-transfer'} 
                                onChange={handlePaymentMethodChange} 
                            />
                        </PaymentOptionCard>
                    </PaymentOptionsContainer>
                </div>
            </Container>

            <Button onClick={()=>{
                // 결제 성공시 성공팝업 띄우기

                // 결제 실패시 실패 팝업 띄우기 

            }} style={{width:'80%'}}>결제하기</Button>
        </div>
    );
}
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
  width: 60px;
  height: 60px;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  flex: 1;
  margin-left: 15px;
`;

const ProductTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const ProductOption = styled.div`
  font-size: 12px;
  color: gray;
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

export default Payment;
