import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom';

function OAuthLoading(props) {
    const nav = useNavigate();

    const [email_role_provider, setEmail_role_provider] = useState(cookie.load("email_role_provider").split("_"));
    const [data, setData] = useState({
        email: email_role_provider[0],
        role: email_role_provider[1],
        provider: email_role_provider[2]
    });

    useEffect(()=>{
        if(data.role == "GUEST") {
            nav("/login/new");
        } else {
            nav("/test");
        }
        cookie.remove("email_role_provider", {path: "/"});
    }, [data]);

    return (
        <div>
            <h1>OAuth Control Page</h1>
        </div>
    );
}

export default OAuthLoading;