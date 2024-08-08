import React from 'react';

function Card2(props) {
    const handlePayment = (method) => {
        console.log(`Pay with ${method}`);
    };

    return (
        <div>
            <div className="submit-container" id="regist-container">
                <h3>신청인 정보</h3>
                <div>
                    <p>이름</p>
                    <input id="name" type="text" placeholder="이름을 입력해 주세요" autoComplete="off" /><br />
                </div>
                <div>
                    <p>휴대전화 번호</p>
                    <input id="phone" type="text" placeholder="휴대전화 번호를 입력해주세요" maxLength="13" autoComplete="off" /><br />
                </div>
                <div>
                    <p>수령 장소 선택</p>
                    <div id="address-input-1">
                        <input type="text" id="address" placeholder="주소를 입력해 주세요" autoComplete="off" />
                        <button id="open-modal-btn" className="btn-green">주소입력</button>
                    </div>
                </div>
                <div>
                    <p>후불교통기능 신청</p>
                    <div>
                        <button onClick={() => handlePayment('')}>신청o</button>
                        <button onClick={() => handlePayment('')}>신청x</button>
                    </div>
                </div>

                <button id="regist-btn" className="btn-green" disabled>신청하기</button>
            </div> 
        </div>
    );
}

export default Card2;
