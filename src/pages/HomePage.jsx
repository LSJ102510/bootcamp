// src/pages/HomePage.jsx
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout, tokenManager } from '../api/auth';
import './HomePage.css';

const MyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();


  // ✅ 로그아웃 처리
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      alert('로그아웃 되었습니다.');
      tokenManager.clearTokens(); // ✅ 토큰 제거 일관성 있게
      navigate('/');
    },
    onError: () => {
      alert('로그아웃 실패');
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <div className="mypage-container">
      <div className="mypage-box">
        <h1 className="mypage-title">홈페이지</h1>
        <button onClick={handleLogout} className="logout-btn">
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;