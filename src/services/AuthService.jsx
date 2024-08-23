import axios from 'axios';
import cookie from 'react-cookies';
import { options, options_GET, options_POST } from 'services/CommonService'

const ACCESS_TOKEN = "URCARCHER_ACCESS_TOKEN";

export function signin(userDTO) {
  axios(options("/api/auth/login", "POST", userDTO))
    .then(resp=>{
      if(resp.data.accessToken) {
        cookie.save(ACCESS_TOKEN, resp.data.accessToken, {path:"/"});
        window.location.href = "/";
      }
    })
    .catch(err=>{
      // console.log(err);
      window.location.href = "/login";
    });
}

export function oauthNew(userDTO) {
  axios(options("/api/auth/oauth/new", "POST", userDTO))
    .then(resp=>{
      if(resp.status == 200) {
        window.location.href = "/";
      }
    })
    .catch(err=>{
      // console.log(err);
      window.location.href = "/login";
    });
}

export function logout() {
  axios(options_POST("/api/auth/logout", null))
    .then(resp=>{
      if(resp.status == 200) {
        window.location.href = "/";
      }
    })
    .catch(err=>{
      console.log(err);
    });
}