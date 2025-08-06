// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchMyInfo } from '../api/auth';

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ location 훅 추가

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchMyInfo(); // accessToken 유효한지 확인
        setIsValid(true);
      } catch (error) {
        setIsValid(false);
        if (location.pathname !== '/email-login') {
          alert('잘못된 접근입니다. 로그인 후 이용해주세요.');
          navigate('/email-login', { replace: true });
        }
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [navigate, location]);

  if (checking) return null;

  return isValid ? children : null;
};

export default ProtectedRoute;