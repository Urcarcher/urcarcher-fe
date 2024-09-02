import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { options_GET } from 'services/CommonService';

const PrivateRoute = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('URCARCHER_ACCESS_TOKEN'); // 쿠키에서 토큰을 가져옴

    if (token) {
      axios(options_GET("/api/auth/authorizing", null))
        .then((resp) => {
          if (resp.data.isAuthorized) {
            setIsAuthenticated(true); // 토큰이 유효한 경우
          } else {
            // 토큰이 만료된 경우
            Cookies.remove('URCARCHER_ACCESS_TOKEN', { path: '/' });
            setIsAuthenticated(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false); // 로딩 완료
        });
    } else {
      setIsLoading(false); // 토큰이 없는 경우
      setIsAuthenticated(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{ from: location }} // 현재 위치를 상태로 전달
      replace
    />
  );
};

export default PrivateRoute;
