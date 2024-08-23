import BasicForm from 'bootstrap-template/components/Forms/BasicForm';
import React from 'react';

function LoseCard(props) {
    return (
        <div>
            <BasicForm
                textContent={'카드 분실 사유를 입력해주세요.'}
                passwordContent={'비밀번호를 입력해주세요.'}
                buttonContent={'분실 신고'}
                setShowModal={props.setShowModal}/>
        </div>
    );
}

export default LoseCard;