import { useNavigate } from 'react-router-dom';
import 'assets/exchangeSelect.css';
import exchangeCard from 'assets/card.png'
import exchangeMoney from 'assets/money.png'
import exchangeArrow from 'assets/arrow.png'
import { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { options_GET } from 'services/CommonService';

function ExchangeSelect(props) {
    // 로그인 유저 정보
    const [memberId, setMemberId] = useState('');
    const [name, setName] = useState('');

    const [loading, setLoading] = useState(true);

    const isAuthorized = () => {
        if(cookie.load("URCARCHER_ACCESS_TOKEN") != null) {
            axios(options_GET("/api/auth/authorizing", null))
            .then((resp)=>{
                if(resp.data.isAuthorized == true) {
                    setMemberId(resp.data.memberId);
                    setName(resp.data.name);
                }else{
                    setLoading(false);
                }
            })
            .catch((err)=>{
                console.log(err);
                setLoading(false);
            });
        } else {
            setLoading(false); // 토큰이 없으면 로딩 종료
        }
    };
    // isAuthorized();

    useEffect(()=>{
        isAuthorized();
    },[]);

    console.log("로그인 유저 id", memberId);
    console.log("로그인 유저 name", name);

    const navi = useNavigate();

    // 카드 선택 페이지로 이동
    const exchangeHandle = (event) => {
        // 카드 선택 후 버튼 종류에 따라 다른 페이지 보여주기 위해
        const selectBtn = event.currentTarget.id;
        // alert(selectBtn);

        if (!memberId && !name) {
            alert("로그인 후 이용 가능해요");
            return;
        }
        navi("/exchange/card", { state: { selectBtn } });
    };

    // 환전 내역
    const historyHandle = () => {
        if (!memberId && !name) {
            alert("로그인 후 이용 가능해요");
            return;
        }
        navi("/exchange/history/card");
    }

    return (
        <div className="contents">
            <div className="exchange_select_wrapper">
                <div className="exchange_select_title">
                    <h5>어카처에서 편하게 환전하고</h5>
                    <h5>원할 때 바로 사용하세요!</h5>
                </div>
                <div className="exchange_select_content">
                    <p>모바일로 편하게 환전 하고</p>
                    <p>원하는 날, 원하는 곳에서 바로 사용</p>
                </div>
                <div className="exchange_select_card">
                    <img src={exchangeCard} alt="카드 아이콘"/>
                </div>
                <div className="exchange_select_money">
                    <img src={exchangeMoney} alt="돈 아이콘"/>
                </div>
                <div className="select_btn_wrapper">
                    <button className="select_info_btn" onClick={historyHandle}>내역보기</button>
                    <button id="currency" className="select_cur_btn" onClick={exchangeHandle}>충전하기</button>
                </div>
                <div className="exchange_select_title2">
                    <h5>이런 환전 방법은 어떠세요?</h5>
                </div>
                <div className="select_btn_wrapper2">
                    <button id="set" className="select_set_btn" onClick={exchangeHandle}>
                        <p className="select_set_p">목표환율 자동충전</p>
                        <img src={exchangeArrow} alt="화살표 아이콘"/>
                        <p>목표 환율 도달 시 자동 환전해줘요</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExchangeSelect;