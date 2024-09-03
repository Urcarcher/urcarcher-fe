import React from 'react';
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
import { Link } from 'react-router-dom';

function LocalProduct(props) { //특산품

    // const navigation = useNavigate();
    // const linkList = [{}];
    // const goProductLink = () => {}

    return (
        <div className='prod-container'>
            <h2 style={{marginTop:'40px'}}>전국 <span style={{color:'#476eff'}}>특산품</span> 여행</h2>
            <p className='prod-text'>클릭 한 번으로 맛과 멋을 즐겨보세요!</p>
            <div>
                {/* 지도 이미지 */}
                <div className='prod-map'>
                    <img src={productMap} alt="특산품 지도" />
                </div>
                <div className='imgbox imgbox1'>
                    <Link to="https://m.place.naver.com/place/13345973/home">
                        <img src={img1} alt="망개떡" />
                    </Link>
                </div>
                <div className='imgbox imgbox2'> 
                    <Link to="https://8domall.co.kr/product/%ED%9C%B4%EA%B2%8C%EC%86%8C%EA%B0%84%EC%8B%9D-%EA%B3%B5%EC%A3%BC%EC%95%8C%EB%B0%A4%EB%B9%B5-%EC%84%B8%ED%8A%B86%EC%A2%85-12%EA%B5%AC-%EA%B3%B5%EC%A3%BC-%ED%8A%B9%EC%82%B0%ED%92%88-%EC%9B%94%EB%AA%A9-%EC%B6%9C%EA%B3%A0/2239/">
                        <img src={img2} alt="알밤빵" />
                    </Link>
                </div>
                <div className='imgbox imgbox3'>
                    <Link to='https://jayeonwoorimall.com/'><img src={img3} alt="잣한과" /></Link>
                </div>
                <div className='imgbox imgbox4'>
                    <Link to='https://smartstore.naver.com/applebbang'>
                        <img src={img4} alt="사과빵" />
                    </Link>
                </div>
                <div className='imgbox imgbox5'>
                    <Link to='https://smartstore.naver.com/1000nuri'><img src={img5} alt="비빔빵" /></Link>
                </div>
                <div className='imgbox imgbox6'>
                    <Link to='https://smartstore.naver.com/ccboy'><img src={img6} alt="생크림찹쌀떡" /></Link>    
                </div>
                <div className='imgbox imgbox7'>
                    <Link to="https://m.place.naver.com/place/13345973/home">
                        <img src={img7} alt="양양샌드" />
                    </Link>
                </div>
                <div className='imgbox imgbox8'>
                    <Link to="https://hwangnam.com/category/shop/24/">
                        <img src={img8} alt="황남빵" />
                    </Link>
                </div>
                <div className='imgbox imgbox9'>
                <Link to='https://naver.me/5JJQDpTg'><img src={img9} alt="성심당시루" /></Link>
                </div>
                <div className='imgbox imgbox10'>
                <Link to='https://www.paris.co.kr/promotion/paba-sands/'><img src={img10} alt="마음샌드" /></Link>
                </div>
            </div>
        </div>
    );
}

export default LocalProduct;