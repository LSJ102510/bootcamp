// src/pages/OAuthRedirectPage.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthRedirectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    console.log(location.search)
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');
    
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log('OAuth redirect:', accessToken, refreshToken);
      navigate('/home', { replace: true });
    } else {
      alert('로그인 실패. 다시 시도해주세요.');
      navigate('/login');
    }
  }, [navigate, location]);

  return null; // 또는 로딩 스피너
};

export default OAuthRedirectPage;