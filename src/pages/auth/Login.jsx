import React, { useEffect } from "react";
import { signin } from "../../services/AuthService";
import "pages/auth/Login.css";
import googleLogo from "assets/googleLogo.png";
import appleLogo from "assets/appleLogo.png";
import { Link, useNavigate } from "react-router-dom";
import cookie from 'react-cookies';
import axios from 'axios';
import { options_GET } from "services/CommonService";
import { useTranslation } from 'react-i18next';
function Login() {
  const nav = useNavigate();

  if(cookie.load("URCARCHER_ACCESS_TOKEN") != null) {
    axios(options_GET("/api/auth/authorizing", null))
      .then((resp)=>{
        if(resp.data.isAuthorized == true) {
          nav('/');
        }
      })
      .catch((err)=>{
        console.log(err);
      });
  }
  
  const googleOauth2Handler = () => {
    window.location.href = process.env.REACT_APP_GOOGLE_OAUTH2_HANDLING;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const password = data.get("password");
    const on = data.get("agree");
    signin({ memberId: username, password: password, agree: on});
  };

  return (
    <div className="align-items-center row contents">
      <div className="px-lg-4 col-lg-6">
        <div className="card">
          <div className="p-lg-5 card-body">
            <form noValidate onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input placeholder={('Id')} id="username" name="username" className="form-control" />
                <label className="form-label" for="email">{('Id')}</label>
              </div>

              <div className="form-floating mb-3">
                <input placeholder={('Pw')} type="password" id="password" name="password" className="form-control" />
                <label className="form-label" for="password">{('Pw')}</label>
              </div>

              <button type="submit" className="btn btn-primary btn-lg">{('Login2')}</button>

              <div className="mb-3 form-check">
                <div className="fc-1">
                  <input type="checkbox" id="agree" name="agree" className="form-check-input" />
                  <label title="" for="agree" className="form-check-label">{('AutoLogIn')}</label>
                </div>

                <div className="fc-2">
                  <Link to="/find/id" className="findid">{('FindId')}</Link>
                  <label>|</label>
                  <Link to="/find/pw">{('FindPw')}</Link>
                </div>
              </div>

            </form>
            <button className="btn btn-primary btn-lg oauth" onClick={googleOauth2Handler}>
              <img className="logo" src={googleLogo}/>
              Google {('Login2')}
            </button>
            
            <button className="btn btn-primary btn-lg oauth">
              <img className="logo" src={appleLogo}/>
              Apple {('Login2')}
            </button>

            <div className="wantsign">
              <span>{('YetMember')}</span>
              <button>{('SignUp')}</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
