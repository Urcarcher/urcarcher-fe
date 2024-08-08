import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ACCESS_TOKEN = "ACCESS_TOKEN";

export function getOptions(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
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
              localStorage.setItem(ACCESS_TOKEN, resp.data.accessToken);
              window.location.href = "/test";
            }
          })
          .catch(err=>{
            window.location.href = "/login";
          });
}