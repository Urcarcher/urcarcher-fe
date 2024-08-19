import React, { useEffect, useState } from 'react';
import { getOptions } from '../../services/AuthService';
import axios from 'axios';

function Test(props) {
    const [a, setA] = useState({});
    const [b, setB] = useState({});

    useEffect(()=> {
        axios(getOptions('/api/t/test', 'GET', null))
        .then(
            (resp)=>{
                setA(resp.data);
                console.log(resp.data);
            }
        )
        .catch(err=>{
            console.log(err);
        });

        axios(getOptions('/api/t/vali', 'GET', null))
        .then(
            (resp)=>{
                setB(resp.data);
            }
        )
        .catch(err=>{
            console.log(err);
        });
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