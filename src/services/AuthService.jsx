import axios from 'axios';
import cookie from 'react-cookies';
import { options } from 'services/CommonService'

const ACCESS_TOKEN = "URCARCHER_ACCESS_TOKEN";

export function signin(userDTO) {
  let api_options = options("/api/auth/login", "POST", userDTO);
  
  axios(api_options)
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