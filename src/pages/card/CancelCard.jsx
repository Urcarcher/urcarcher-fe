import BasicForm from 'bootstrap-template/components/Forms/BasicForm';
import React from 'react';

function CancelCard(props) {
    return (
        <div>
            <BasicForm
                textContent={'카드 해지 사유를 입력해주세요.'}
                passwordContent={'비밀번호를 입력해주세요.'}
                buttonContent={'카드해지 신청'}
                setShowModal={props.setShowModal}/>
        </div>
    );
}

export default CancelCard;