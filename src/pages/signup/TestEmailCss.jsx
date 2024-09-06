import React from 'react';
import './test.css';

function TestEmailCss(props) {
    return (
        <div className="email-container">
            <div className='mail-container'>
        <h1>어서와 카드는 처음이지</h1>
        <hr />
        <p>안녕하세요. 어카처 팀입니다.</p>
        <p>인증코드 입니다.</p>
        <p className="code">123456</p>
        <p className="footer">문의 사항이 있으면 언제든지 연락주세요.</p>
        </div>
    </div>
    );
}



export default TestEmailCss;