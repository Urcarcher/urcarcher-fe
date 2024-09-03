import React, { useState } from 'react';
import 'pages/localProducts/LocalProduct.css';
import productMap from 'assets/localProduct/map_img.png';
import img1 from 'assets/localProduct/lp-img1.png';
import img2 from 'assets/localProduct/lp-img2.png';
import img3 from 'assets/localProduct/lp-img3.png';
import img4 from 'assets/localProduct/lp-img4.png';
import img5 from 'assets/localProduct/lp-img5.png';
import img6 from 'assets/localProduct/lp-img6.png';
import img7 from 'assets/localProduct/lp-img7.png';
import img8 from 'assets/localProduct/lp-img8.png';
import img9 from 'assets/localProduct/lp-img9.png';
import img10 from 'assets/localProduct/lp-img10.png';
import img11 from 'assets/localProduct/lp-img11.png';
import modalImg1 from 'assets/localProduct/lp-product1.png';
import modalImg2 from 'assets/localProduct/lp-product2.png';
import modalImg3 from 'assets/localProduct/lp-product3.png';
import modalImg4 from 'assets/localProduct/lp-product4.png';
import modalImg5 from 'assets/localProduct/lp-product5.png';
import modalImg6 from 'assets/localProduct/lp-product6.png';
import modalImg7 from 'assets/localProduct/lp-product7.png';
import modalImg8 from 'assets/localProduct/lp-product8.png';
import modalImg9 from 'assets/localProduct/lp-product9.png';
import modalImg10 from 'assets/localProduct/lp-product10.png';
import modalImg11 from 'assets/localProduct/lp-product11.png';
import { Link } from 'react-router-dom';
import LocalModal from './LocalModal';

function LocalProduct(props) { //특산품

    // const navigation = useNavigate();
    // const linkList = [{}];
    // const goProductLink = () => {}

    // const [hoveredImg, setHoveredImg] = useState(null);
    const [selectedImg, setSelectedImg] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //설명,지역 수정하기
    const descriptions = {
        1: { 
            region: "경남 의령 - 망개떡", 
            description: "의령군은 망개떡으로 유명한 지역으로, 이 떡은 부드러운 찹쌀떡 안에 달콤한 팥소를 채운 전통 간식입니다. 의령은 망개나무 잎을 이용한 망개떡을 오랜 전통으로 만들어오고 있습니다." 
        },
        2: { 
            region: "충남 공주 - 알밤빵", 
            description: "공주시는 알밤으로 유명한 지역으로, 알밤을 이용한 알밤빵이 특산품으로 사랑받고 있습니다. 공주의 알밤은 맛이 달고 품질이 좋아, 이를 이용한 빵과 간식들이 인기를 끌고 있습니다." 
        },
        3: { 
            region: "경기 가평 - 잣한과", 
            description: "가평군은 잣 생산지로 유명하며, 잣을 이용한 전통 한과인 잣한과가 대표적인 특산품입니다. 가평의 잣은 고소하고 영양가가 높아 다양한 전통 음식과 과자에 활용됩니다." 
        },
        4: { 
            region: "경북 영주시 - 사과빵", 
            description: "영주시는 사과로 유명한 지역으로, 특히 사과빵이 지역 특산품으로 자리잡고 있습니다. 영주의 사과는 달고 아삭한 식감이 특징이며, 이를 활용한 다양한 디저트가 인기를 얻고 있습니다." 
        },
        5: { 
            region: "전북 전주 - 비빔빵", 
            description: "전주시는 한국의 전통 음식 문화의 중심지로, 비빔밥과 함께 비빔빵이 특산품으로 주목받고 있습니다. 비빔빵은 전주의 다양한 재료를 혼합하여 독특한 맛을 자랑하는 빵입니다." 
        },
        6: { 
            region: "익산 - 생크림 찹쌀떡", 
            description: "익산시는 쌀과 떡으로 유명한 지역으로, 생크림찹쌀떡이 대표적인 특산품입니다. 부드러운 생크림과 쫄깃한 찹쌀떡이 조화를 이루어 입안에서 녹는 듯한 맛을 제공합니다." 
        },
        7: { 
            region: "강원도 양양 - 양양샌드", 
            description: "양양군은 청정 자연환경으로 유명하며, 양양샌드는 이 지역의 특산물 송이를 사용해 만든 과자입니다. 고소한 맛과 바삭한 식감이 특징인 양양샌드는 양양을 방문하는 이들에게 인기를 끌고 있습니다." 
        },
        8: { 
            region: "경북 경주 - 황남빵", 
            description: "경주시는 신라의 고도(古都)로, 황남빵이 이 지역을 대표하는 특산품입니다. 황남빵은 달콤한 팥소를 듬뿍 넣은 전통적인 빵으로, 경주를 방문하는 이들에게 인기가 많습니다." 
        },
        9: { 
            region: "대전 - 무화과시루", 
            description: "대전은 대한민국의 교통 중심지로, 성심당 시루는 대전의 대표적인 디저트입니다. 대전에서만 즐길 수 있는 다양한 맛과 모양의 제철 과일 케익입니다." 
        },
        10: { 
            region: "제주 - 마음샌드", 
            description: "제주 땅콩의 깊은 풍미가 살아있는 마음 샌드, 특별한 간식으로 제주를 기억하세요." 
        },
        11: { 
            region: "광주 - 무등산수박커피", 
            description: "광주의 명품 특산물인 무등산 수박을 사용하여 만든 커피로 무등산 수박 맛과 향을 극대화한 특별한 커피입니다." 
        }
    };
    const productLinks = [
        { id: 1, url: "https://m.place.naver.com/place/13345973/home", alt: "망개떡", imgSrc: img1, modalImgSrc: modalImg1 },
        { id: 2, url: "https://8domall.co.kr/product/공주알밤빵", alt: "알밤빵", imgSrc: img2, modalImgSrc: modalImg2 },
        { id: 3, url: "https://jayeonwoorimall.com/", alt: "잣한과", imgSrc: img3, modalImgSrc: modalImg3 },
        { id: 4, url: "https://smartstore.naver.com/applebbang", alt: "사과빵", imgSrc: img4, modalImgSrc: modalImg4 },
        { id: 5, url: "https://smartstore.naver.com/1000nuri", alt: "비빔빵", imgSrc: img5, modalImgSrc: modalImg5 },
        { id: 6, url: "https://smartstore.naver.com/ccboy", alt: "생크림찹쌀떡", imgSrc: img6, modalImgSrc: modalImg6 },
        { id: 7, url: "https://m.place.naver.com/place/13345973/home", alt: "양양샌드", imgSrc: img7, modalImgSrc: modalImg7 },
        { id: 8, url: "https://hwangnam.com/category/shop/24/", alt: "황남빵", imgSrc: img8, modalImgSrc: modalImg8 },
        { id: 9, url: "https://naver.me/5JJQDpTg", alt: "성심당시루", imgSrc: img9, modalImgSrc: modalImg9 },
        { id: 10, url: "https://www.paris.co.kr/promotion/paba-sands/", alt: "마음샌드", imgSrc: img10, modalImgSrc: modalImg10 },
        { id: 11, url: "https://smartstore.naver.com/thegoodcoffee_tomstoncoffee/products/8399739764#scrollY=1784", alt: "수박커피", imgSrc: img11, modalImgSrc: modalImg11 }
    ];

   
    const handleClick = (imgNumber) => {
        setSelectedImg(imgNumber);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImg(null);
    };
    return (
        <div className='prod-container'>
            <h2 style={{marginTop:'40px'}}>전국 <span style={{color:'#476eff'}}>특산품</span> 여행</h2>
            <p className='prod-text'>클릭 한 번으로 맛과 멋을 즐겨보세요!</p>
            <div className='prod-map-wrap'>
                {/* 지도 이미지 */}
                <div className='prod-map'>
                    <img src={productMap} alt="특산품 지도" />
                </div>
               <div className='imgbox imgbox1' onClick={() => handleClick(1)}>
                    <img src={productLinks[0].imgSrc} alt={productLinks[0].alt} />
                </div>

                <div className='imgbox imgbox2' onClick={() => handleClick(2)}>
                    <img src={productLinks[1].imgSrc} alt={productLinks[1].alt} />
                </div>

                <div className='imgbox imgbox3' onClick={() => handleClick(3)}>
                    <img src={productLinks[2].imgSrc} alt={productLinks[2].alt} />
                </div>

                <div className='imgbox imgbox4' onClick={() => handleClick(4)}>
                    <img src={productLinks[3].imgSrc} alt={productLinks[3].alt} />
                </div>

                <div className='imgbox imgbox5' onClick={() => handleClick(5)}>
                    <img src={productLinks[4].imgSrc} alt={productLinks[4].alt} />
                </div>

                <div className='imgbox imgbox6' onClick={() => handleClick(6)}>
                    <img src={productLinks[5].imgSrc} alt={productLinks[5].alt} />
                </div>

                <div className='imgbox imgbox7' onClick={() => handleClick(7)}>
                    <img src={productLinks[6].imgSrc} alt={productLinks[6].alt} />
                </div>

                <div className='imgbox imgbox8' onClick={() => handleClick(8)}>
                    <img src={productLinks[7].imgSrc} alt={productLinks[7].alt} />
                </div>

                <div className='imgbox imgbox9' onClick={() => handleClick(9)}>
                    <img src={productLinks[8].imgSrc} alt={productLinks[8].alt} />
                </div>

                <div className='imgbox imgbox10' onClick={() => handleClick(10)}>
                    <img src={productLinks[9].imgSrc} alt={productLinks[9].alt} />
                </div>

                <div className='imgbox imgbox11' onClick={() => handleClick(11)}>
                    <img src={productLinks[10].imgSrc} alt={productLinks[10].alt} />
                </div>
            </div>
             <LocalModal
                show={isModalOpen}
                onClose={handleCloseModal}
                region={selectedImg ? descriptions[selectedImg].region : ""}
                description={selectedImg ? descriptions[selectedImg].description : ""}
                link={selectedImg ? productLinks.find(product => product.id === selectedImg).url : ""}
                modalImgSrc={selectedImg ? productLinks.find(product => product.id === selectedImg).modalImgSrc : ""}
            />
        </div>
    );
}

export default LocalProduct;