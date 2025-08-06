import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithKakao } from '../../api/auth';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">OHJOE</h1>
        <p className="login-subtitle">선트캠프 5조 프로젝트</p>

        <div className="login-buttons">
          <button className="login-button" onClick={loginWithKakao}>
            <img src="/images/kakao-logo.svg" alt="kakao" className="login-icon" />
            카카오로 시작하기
          </button>
          <button
            className="login-button"
            onClick={() => navigate('/email-login')}>
            이메일로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;