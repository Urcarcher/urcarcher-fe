import React, { useEffect, useState } from 'react';
import { options } from 'services/CommonService';
import axios from 'axios';

function Test(props) {
    const [a, setA] = useState({});
    const [b, setB] = useState({});

    useEffect(()=> {
        axios(options('/api/t/test', 'GET', null))
        .then(
            (resp)=>{
                setA(resp.data);
                console.log(resp.data);
            }
        )
        .catch(err=>{
            console.log(err);
        });

        axios(options('/api/t/vali', 'GET', null))
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
        <div className='contents'>
            <h1>{a.memberId}</h1>
            <h1>{a.email}</h1>
            <h1>{b.result}</h1>
        </div>
    );
}

export default Test;