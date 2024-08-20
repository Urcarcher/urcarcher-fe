import axios from 'axios';
import cookie from 'react-cookies';

const ACCESS_TOKEN = "URCARCHER_ACCESS_TOKEN";

export function getOptions(api, method, request) {
  let options = {
    url: api,
    method: method
  };
  // 조회는 요청 data가 없음, 입력과 수정시에는 보내는 data가 있음
  if (request) {
    // GET method
    options.data = request;
  }

  return options;
}

export function signin(userDTO) {
  return axios(getOptions("/api/auth/login", "POST", userDTO))
          .then(resp=>{
            if(resp.data.accessToken) {
              cookie.save(ACCESS_TOKEN, resp.data.accessToken, {path:"/"});
              window.location.href = "/test";
            }
          })
          .catch(err=>{
            console.log(err);
            // window.location.href = "/login";
          });
}