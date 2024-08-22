import React from 'react';
import 'assets/exchangeSetList.css';

function ExchangeSetList(props) {
    return (
        <div className="ex_set_list_wrapper">
            <div className="ex_set_list_table">
                <h4>대한민국 KRW</h4>
                <div className="ex_set_list_col">
                    <p className="ex_set_list_p">기준환율 (매매기준율)</p>
                    <h5>1,030 이하일때</h5>
                </div>
                <div className="ex_set_list_col">
                    <p className="ex_set_list_p">자동으로</p>
                    <h5>
                        <span style={{ fontFamily: "NanumSquareNeoHeavy", color: "#476EFF" }}>
                            KRW 10,000
                        </span> 충전
                    </h5>
                </div>
                <div className="ex_set_list_btn">
                    <button className="set_delete_btn">삭제</button>
                    <button className="set_put_btn">변경</button>
                </div>
            </div>
            <div className="ex_set_list_text">
                <h4>자동 충전이 설정되어 있어요</h4>
                <h4>환율 도달 시 충전할 예정이에요</h4>
            </div>
        </div>
    );
}

export default ExchangeSetList;