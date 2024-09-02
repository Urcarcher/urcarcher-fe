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

function LocalProduct(props) { 
    //0902
    return (
        <div className='contents'>
            <div className='prod-container'>
                <h1 style={{marginTop:'40px'}}>지역별 특산품</h1>
                <div className='prod-map'>
                    <img src={productMap} alt="특산품 지도" />
                </div>
                <div className='imgbox imgbox1'>
                    <img src={img1} alt="아이템" />
                </div>
                <div className='imgbox imgbox2'>
                    <img src={img2} alt="아이템" />
                </div>
                <div className='imgbox imgbox3'>
                    <img src={img3} alt="아이템" />
                </div>
                <div className='imgbox imgbox4'>
                    <img src={img4} alt="아이템" />
                </div>
            </div>
        </div>
    );
}

export default LocalProduct;