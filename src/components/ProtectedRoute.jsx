import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      setIsValid(true); // 토큰 있으면 통과
    } else {
      setIsValid(false);
      if (location.pathname !== '/login') {
        alert('로그인 후 이용해주세요.');
        navigate('/login', { replace: true });
      }
    }

    setChecking(false);
  }, [navigate, location]);

  if (checking) return null;

  return isValid ? children : null;
};

export default ProtectedRoute;