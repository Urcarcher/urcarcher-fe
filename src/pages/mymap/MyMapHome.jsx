import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'assets/Map.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { options_GET } from 'services/CommonService';

function MyMapHome(props) { //시작 페이지

    const navigator = new useNavigate();

    //로그인한 회원 이름 저장
    // 테스트할 회원 ID : bleakwinter, 9911dbfl
    const [memberId, setMemberId] = useState(''); 
    const [name, setName] = useState('');

    const isAuthorized = () => {
        if(cookie.load("URCARCHER_ACCESS_TOKEN") != null) {
          axios(options_GET("/api/auth/authorizing", null))
            .then((resp)=>{
              if(resp.data.isAuthorized == true) {
                setMemberId(resp.data.memberId);
                setName(resp.data.name);
                //console.log(name);
              }
            })
            .catch((err)=>{
              console.log(err);
            });
        }
    };
    
    useEffect(() => {
        isAuthorized();
      }, []);
      
    // name이 업데이트된 후에만 실행
    useEffect(() => {
        if (name) {
            //console.log(name)
        }
    }, [name]); // name이 업데이트될 때마다 실행
    

    //버튼 클릭이벤트 - 페이지 이동
    const goRankPage = () => {
        navigator("/maphome/categoryRank",{ state: { memberId } } );
    }
    return (
        <div>
            <div className='mymaphome-wrap contents'>
                <div className='maphome-content inner'>
                    <div className='maphome_textwrap'>
                        <p>결제 내역으로 그린</p>
                        <p>나만의 지도</p>
                    </div>
                    <div>
                        <img src='/icon/map-main-img.png' alt="지도이미지" />
                    </div>
                </div>
                <div className='maphome-btn inner'>
                   {/* <span>{name === ''? '회원' : name}님의 결제 내역으로 장소를 추천합니다</span>*/}
                    <span>김유리님의 결제 내역으로 장소를 추천합니다</span>
                    <button onClick={goRankPage}>시작하기</button>
                </div>
            </div>
        </div>
    );
}

export default MyMapHome;