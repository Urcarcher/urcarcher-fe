import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

function SmsVerification() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleVerification = async () => {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const result = await axios.post('/send-one');
            setResponse(result.data);
        } catch (err) {
            setError('문자 발송에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{marginTop: '140px'}}>
            <button onClick={handleVerification} disabled={loading}>
                {loading ? '전송 중...' : '인증'}
            </button>
            {response && <div>문자 발송 성공: {JSON.stringify(response)}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default SmsVerification;
