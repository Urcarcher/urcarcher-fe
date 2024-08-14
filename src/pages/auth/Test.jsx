import React, { useEffect, useState } from 'react';
import { getOptions } from '../../services/AuthService';
import axios from 'axios';

function Test(props) {
    const [a, SetA] = useState({});
    const [b, setB] = useState({});

    useEffect(()=> {
        axios(getOptions('/api/t/test', 'GET', null)).then(
            (resp)=>{
                SetA(resp.data);
            }
        );
        axios(getOptions('/api/t/vali', 'GET', null)).then(
            (resp)=>{
                setB(resp.data);
            }
        );
    }, []);
    
    return (
        <div>
            <h1>{a.memberId}</h1>
            <h1>{a.email}</h1>
            <h1>{b.result}</h1>
        </div>
    );
}

export default Test;