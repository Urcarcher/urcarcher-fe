/* eslint-disable default-case */
import styled from 'styled-components';
import Flickity from 'react-flickity-component';
import React, { useState } from 'react';
import CardOverlay from 'bootstrap-template/components/cards/CardOverlay';
import { ListGroup, Modal, Button } from 'react-bootstrap';
import ChargePayment from './ChargePayment';
import SettingPassword from './SettingPassword';
import LoseCard from './LoseCard';
import CancelCard from './CancelCard';
import PaymentSummary from './PaymentSummary';
import Axios from 'axios';

// Styled-components for CardManagerment

function CardManagerment(props) {
    // 임시 
    const test = [{name:'card1', value:'test1', cardTypeId:11},{name:'card1', value:'test1', cardTypeId:11}];

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState('');

    const flickityOptions = {
        cellAlign: 'center',
        pageDots: false,
        groupCells: '20%',
        selectedAttraction: 0.03,
        friction: 0.15,
        contain: false,
        initialIndex: 0 // 첫 번째 카드가 중앙에 오도록 설정
    };

    const [isCardActive, setIsCardActive] = useState(true); // 카드 활성화 상태

    const handleToggleChange = (event) => {
      const newActiveState = event.target.checked;
      setIsCardActive(newActiveState);
  
      Axios.post('/api/card/cardstatus', {
        cardId: 5,    // 여기 카드아이디 삽입 ---> 향후 수정
        isActive: newActiveState
      }).then(response => {
        console.log('카드 상태가 업데이트되었습니다.');
      }).catch(error => {
        console.error('카드 상태 업데이트에 실패했습니다.');
      });
  };

    const handleOptionClick = (content) => {
        // test
        // console.log(content);
        
        switch(content){
            case "1":
                setModalContent(<PaymentSummary setShowModal={setShowModal}/>);
                setModalTitle('결제 예상 금액');
                break;
            case "2":
                setModalContent(<ChargePayment setShowModal={setShowModal}/>);
                setModalTitle('금액 충전');
                break;
            case "3":
                setModalContent(<SettingPassword setShowModal={setShowModal}/>);
                setModalTitle('카드 비밀번호 설정');
                break;
            // case "4":
            //     setModalContent(<LoseCard setShowModal={setShowModal}/>);
            //     setModalTitle('분실신고');
            //     break;
            case "5":
                setModalContent(<CancelCard setShowModal={setShowModal}/>);
                setModalTitle('카드해지');
                break;
            default:
                console.log("올바른 선택지가 아닙니다.");
        }
        
        setShowModal(true);
    };

    return (
        <>
            <CardDetailsContainer>
            <br/><br/><br/><br/><br/><br/>
                <CardSection>
                    <button className="arrow-button arrow-left">
                      ‹
                    </button>
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
                    {/* 오른쪽 화살표 */}
                    <button className="arrow-button arrow-right">
                      ›
                    </button>
                </CardSection>
                <br/><br/><br/><br/>

                <ListGroup variant="flush" className="options-section">
                    <OptionItem>
                        <span className="option-text" style={{color:'#064AFF'}}><strong>카드번호</strong></span>
                        <MaskedCardInfo>●●●● - ●●●● - ●●●● - ●●●●</MaskedCardInfo>
                    </OptionItem>
                    <OptionItem onClick={() => handleOptionClick("1")}>
                        결제 예상 금액
                    </OptionItem>
                    <OptionItem onClick={() => handleOptionClick("2")}>
                        금액 충전
                    </OptionItem>
                    <OptionItem onClick={() => handleOptionClick("3")}>
                        카드 비밀번호 설정
                    </OptionItem>
                    
                    <OptionItem>
                        <span>카드활성화</span>
                        <ToggleSwitch>
                            <input 
                              type="checkbox" 
                              id="toggle-switch" 
                              checked={isCardActive} 
                              onChange={handleToggleChange} 
                            />

                            {/* <input type="checkbox" id="toggle-switch" /> */}
                            <label htmlFor="toggle-switch"></label>
                        </ToggleSwitch>
                    </OptionItem>

                    {/* <OptionItem onClick={() => handleOptionClick("4")}>
                        분실신고
                    </OptionItem> */}
                    <OptionItem onClick={() => handleOptionClick("5")}>
                        카드해지
                    </OptionItem>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </ListGroup>
            </CardDetailsContainer>



            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* component 단위로 분리 */}
                    
                    {modalContent}


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        닫기
                    </Button>
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
    display: none; /* Flickity 버튼을 완전히 숨김 */
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
  cursor: pointer; /* 클릭 가능하도록 포인터 커서 추가 */

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

export default CardManagerment;
