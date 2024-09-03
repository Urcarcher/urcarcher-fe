import React, { useEffect, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

function LocalProduct(props) { //특산품 추천

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

    useEffect(()=>{
   
        const savedLanguage = Cookies.get('selectedLanguage');
        if (savedLanguage) {
            changeLanguage(savedLanguage); // 언어 변경
        } else {
            changeLanguage('Korea'); // 기본 언어 설정
        }
    },[]);


    const [selectedImg, setSelectedImg] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //설명,지역 
    const descriptions = {
        1: { 
            region: "경남 의령 - 망개떡", 
            // description: "의령군은 망개떡으로 유명한 지역으로, 이 떡은 부드러운 찹쌀떡 안에 달콤한 팥소를 채운 전통 간식입니다. 의령은 망개나무 잎을 이용한 망개떡을 오랜 전통으로 만들어오고 있습니다." 
            description: t('MunggaeTteok')
        },
        2: { 
            region: "충남 공주 - 알밤빵", 
            description: t('GongjuFood')
        },
        3: { 
            region: "경기 가평 - 잣한과", 
            description: t('Hangwa')
        },
        4: { 
            region: "경북 영주시 - 사과빵", 
            description: t('AppleDesert')
        },
        5: { 
            region: "전북 전주 - 비빔빵", 
            description:t('JeonjuFood')
        },
        6: { 
            region: "익산 - 생크림 찹쌀떡", 
            description: t('IksanFood')
        },
        7: { 
            region: "강원도 양양 - 양양샌드", 
            description: t('YangyangFood')
        },
        8: { 
            region: "경북 경주 - 황남빵", 
            description: t('GyeongjuFood')
        },
        9: { 
            region: "대전 - 무화과시루", 
            description: t('DaejeonFood')
        },
        10: { 
            region: "제주 - 마음샌드", 
            description: t('JejuFood')
        },
        11: { 
            region: "광주 - 무등산수박커피", 
            description: t('GwangjuFood')
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
            <h2 style={{marginTop:'40px'}}> 
                {t('National')} 
                <span style={{color:'#476eff'}}> {t('SpecialtyFood')} </span> 
                {t('Journey')}
            </h2>
            <p className='prod-text'>
                {t('click')}!
            </p>
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