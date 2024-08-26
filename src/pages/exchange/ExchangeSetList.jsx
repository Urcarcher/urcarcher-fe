import React from 'react';
import 'assets/exchangeSetList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ExchangeSetList({ reserveInfo }) {
    const navi = useNavigate();
    
    console.log("예약 조회 페이지 data", reserveInfo);

    // 삭제 버튼
    const deleteHandle = () => {
        axios.delete(`/api/exchange/rate/delete/${reserveInfo.setId}`)
        .then((response) => {
            navi("/exchange");
        })
        .catch(error => {
            console.log(error);
            alert("다시 시도해 주세요");
        });
    };

    // 홈 버튼
    const homeHandle = () => {
        navi("/exchange");
    };

    return (
        <div className="ex_set_list_wrapper">
            <div className="ex_set_list_table">
                <h5>대한민국 KRW</h5>
                <div className="ex_set_list_col">
                    <p className="ex_set_list_p">예약환율 (시가)</p>
                    <h5>1달러 = {reserveInfo.setRate}</h5>
                </div>
                <div className="ex_set_list_col">
                    <p className="ex_set_list_p">예약일</p>
                    <h5>{reserveInfo.setDate}</h5>
                </div>
                <div className="ex_set_list_col">
                    <p className="ex_set_list_p">자동으로</p>
                    <h5>
                        <span style={{ fontFamily: "NanumSquareNeoHeavy", color: "#476EFF" }}>
                            KRW {reserveInfo.setCur.toLocaleString()}
                        </span> 충전하고
                    </h5>
                </div>
                <div className="ex_set_list_col">
                    <p className="ex_set_list_p">예상 원화</p>
                    <h5>
                        <span style={{ fontFamily: "NanumSquareNeoHeavy", color: "#476EFF" }}>
                        USD {reserveInfo.setPay}
                        </span> 출금할 예정이에요
                    </h5>
                </div>
            </div>
            <div className="ex_set_list_text">
                <h4>자동 충전이 설정되어 있어요</h4>
                <h4>예약일이 되면 자동 충전돼요</h4>
            </div>
            <div className="ex_set_list_btn">
                <button className="set_delete_btn" onClick={deleteHandle}>삭제</button>
                <button className="set_home_btn" onClick={homeHandle}>확인</button>
            </div>
        </div>
    );
}

export default ExchangeSetList;