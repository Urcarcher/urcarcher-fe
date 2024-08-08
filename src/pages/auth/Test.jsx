import React, { useEffect, useState } from 'react';
import { getOptions } from '../../services/AuthService';
import axios from 'axios';

function Test(props) {
    const [a, SetA] = useState({});

    useEffect(()=> {
        axios(getOptions('/api/t/test', 'GET', null)).then(
            (resp)=>{
                SetA(resp.data);
            }
        )
    }, []);
    
    return (
        <div>
            <h1>{a.memberId}</h1>
        </div>
    );
}

export default Test;