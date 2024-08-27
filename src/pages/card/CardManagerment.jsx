/* eslint-disable default-case */
import styled from 'styled-components';
import Flickity from 'react-flickity-component';
import React, { useEffect, useState } from 'react';
import CardOverlay from 'bootstrap-template/components/cards/CardOverlay';
import { ListGroup, Modal, Button } from 'react-bootstrap';
import ChargePayment from './ChargePayment';
import SettingPassword from './SettingPassword';
import CancelCard from './CancelCard';
import PaymentSummary from './PaymentSummary';
import Axios from 'axios';
import myImage from 'assets/question.jpg';

function CardManagerment(props) {
    const [myCard, setMyCard] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState('');
    const [userId, setUserId] = useState(null);

    const flickityOptions = {
        cellAlign: 'center',
        pageDots: false,
        groupCells: '20%',
        selectedAttraction: 0.03,
        friction: 0.15,
        contain: false,
        initialIndex: 0 // 첫 번째 카드가 중앙에 오도록 설정
    };

    const handleToggleChange = (event, cardId) => {

      console.log(`Toggle change for cardId: ${cardId}`);
      console.log(`Event target checked: ${event.target.checked}`);

      const updatedCards = myCard.map(card => {
        if (card.cardId === cardId) {
            return { ...card, cardStatus: event.target.checked };
        }
        return card;
      });
      setMyCard(updatedCards);

        Axios.post('/api/card/cardstatus', {
            cardId: String(cardId),
            isActive: String(event.target.checked)
        }).then(response => {
            console.log('카드 상태가 업데이트되었습니다.');
        }).catch(error => {
            console.error('카드 상태 업데이트에 실패했습니다.');
        });
    };

    const handleOptionClick = (content, card) => {
        switch (content) {
            case "1":
                setModalContent(<PaymentSummary setShowModal={setShowModal} card={card} />);
                setModalTitle('결제 예상 금액 (신용카드 전용)');
                break;
            case "2":
                setModalContent(<ChargePayment setShowModal={setShowModal} card={card} />);
                setModalTitle('금액 충전 (선불카드 전용)');
                break;
            case "3":
                setModalContent(<SettingPassword setShowModal={setShowModal} card={card} />);
                setModalTitle('PIN 번호 설정');
                break;
            case "5":
                setModalContent(<CancelCard setShowModal={setShowModal} card={card} />);
                setModalTitle('카드해지');
                break;
            default:
                console.log("올바른 선택지가 아닙니다.");
        }

        setShowModal(true);
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
                })
                .catch((error) => {
                    console.log("card정보 가져오는데 오류 발생");
                    console.log(error);
                });
        }
    }, [userId]);

    return (
        <>
            <CardDetailsContainer>
                <br /><br /><br /><br /><br />
                <CardSection>
                    <button className="arrow-button arrow-left">
                        ‹
                    </button>
                    <FlickityStyled
                        options={flickityOptions}
                        flickityRef={(c) => {
                            if (c) {
                                console.log(c);
                            }
                        }}
                    >
                        {myCard.map((card, index) => (
                            <CarouselCell key={card.cardId}>
                                <CardOverlay
                                    className='my-custom-class'
                                    img={require(`../../assets/Card${card.cardTypeId}_.png`)}
                                    imgStyle={{ width: '335px', height: '200px' }}
                                />
                                <p style={{fontWeight:'bold', color:'darkgrey', textAlign:'left', marginLeft:'17px', fontSize:'15px',marginTop:'5px' , marginBottom:'5px'}}>
                                  MyCard : {(card.cardTypeId === 1 || card.cardTypeId === 2) ? "신용카드":"선불카드"}
                                </p>
                                <p style={{fontWeight:'bold', color:'darkgrey', textAlign:'left', marginLeft:'17px', fontSize:'15px'}}>
                                  {(card.cardTypeId === 1 || card.cardTypeId === 2) ? "" : "MyMoney : " + parseFloat(card.cardBalance).toLocaleString()+"원"}
                                </p>

                                <ListGroup variant="flush" className="options-section">
                                    <OptionItem>
                                        <span className="option-text" style={{ color: '#064AFF' }}><strong>카드번호</strong></span>
                                        <MaskedCardInfo>{card.cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')}</MaskedCardInfo>
                                    </OptionItem>
                                    <OptionItem
                                        onClick={() => (card.cardTypeId === 1 || card.cardTypeId === 2) && handleOptionClick("1", card)}
                                        style={{
                                            cursor: (card.cardTypeId === 1 || card.cardTypeId === 2) ? 'pointer' : 'not-allowed',
                                            color: (card.cardTypeId === 1 || card.cardTypeId === 2) ? '#333' : '#ccc'
                                        }}
                                    >
                                        결제 예상 금액 (신용카드 전용)
                                    </OptionItem>
                                    <OptionItem onClick={() => card.cardTypeId !== 1 && card.cardTypeId !== 2 && handleOptionClick("2", card)}
                                    style={{
                                        cursor: card.cardTypeId !== 1 && card.cardTypeId !== 2 ? 'pointer' : 'not-allowed',
                                        color: card.cardTypeId !== 1 && card.cardTypeId !== 2 ? '#333' : '#ccc'
                                    }}>
                                        금액 충전 (선불카드 전용)
                                    </OptionItem>
                                    <OptionItem onClick={() => handleOptionClick("3", card)}>
                                        PIN 번호 설정
                                    </OptionItem>
                                    <OptionItem>
                                        <span>카드활성화</span>
                                  
                                        <ToggleSwitch>
                                            <input
                                                type="checkbox"
                                                id={`toggle-switch-${card.cardId}`}  // 고유한 id 추가 - 이거 안하면 토글 버튼이 카드 고유 상태를 관리 못함
                                                checked={card.cardStatus}
                                                onChange={(event)=>handleToggleChange(event, card.cardId)}
                                            />
                                            <label htmlFor={`toggle-switch-${card.cardId}`}></label>
                                        </ToggleSwitch>
                                    </OptionItem>
                                    <OptionItem onClick={() => handleOptionClick("5", card)}>
                                        카드해지
                                    </OptionItem>
                                </ListGroup>
                            </CarouselCell>
                        ))}
                    </FlickityStyled>
                    <button className="arrow-button arrow-right">
                        ›
                    </button>
                </CardSection>
                <hr/>
                  <CardOverlay
                    className="my-custom-class" 
                    img={myImage}
                    imgStyle={{ height: '110px', width: '390px', objectFit: 'cover', backgroundColor:'#f3f6fb', margin:'-10px -15px' }}
                  />
                <br /><br /><br /><br /><br /><br />
            </CardDetailsContainer>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent}
                </Modal.Body>
                <Modal.Footer>
                <ModalCloseButton onClick={() => setShowModal(false)}>
                  닫기
                </ModalCloseButton>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const CardDetailsContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: auto;
  padding: 25px;
  background-color: #F9FBFC;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const CardSection = styled.div`
  position: relative;
  text-align: center;
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

const OptionItem = styled(ListGroup.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  font-size: 16px;
  color: #333;
  background-color: #FFF;
  border-bottom: 1px solid #E6E9ED;
  cursor: pointer;

  &:first-child {
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
    border-bottom: none;
  }

  &:hover {
    background-color: #F1F3F5;
  }
`;

const MaskedCardInfo = styled.span`
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  margin-right:20px;
  color: #555;
`;

const ToggleSwitch = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & label {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #bbb;
    transition: .4s;
    border-radius: 34px;
  }

  & input:checked + label {
    background-color: #4CAF50;
  }

  & label:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  & input:checked + label:before {
    transform: translateX(18px);
  }
`;
const ModalCloseButton = styled(Button)`
  background-color: #6c757d !important;
  border-color: #6c757d !important;
  width:150px !important;
  &:hover {
    background-color: #5a6268 !important;
    border-color: #545b62 !important;
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(130, 138, 145, 0.5);
  }
`;

export default CardManagerment;
