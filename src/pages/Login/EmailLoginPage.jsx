import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginWithEmail } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import './EmailLoginPage.css';

const EmailLoginPage = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();
  const mutation = useMutation({
  mutationFn: loginWithEmail,
  onSuccess: (response) => {
    // ✅ accessToken 저장
    
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken); // 필요시
    console.log('✅ 로그인 응답', response);
    navigate('/home');
  },
  onError: () => {
    alert('이메일이 등록되지 않았거나 잘못된 비밀번호입니다');
  },
});;

  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password: pw });
  };

  return (
    <div className="email-login-container">
      <div className="email-login-box">
        <h1 className="email-login-title">OHJOE</h1>
        <p className="email-login-subtitle">이메일로<br />로그인해 주세요</p>

        <form onSubmit={handleLogin} className="email-login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일(아이디)"
            required
          />
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호"
            required
          />
          <button type="submit" className="login-submit-btn">로그인하기</button>
        </form>

        <button
          className="email-register-btn"
          onClick={() => navigate('/email-signup')}
        >
          이메일로 가입하기
        </button>
        <button
            className="start-page-btn"
            onClick={() => navigate('/login')}>
            OHJOE
          </button>
      </div>
    </div>
  );
};

export default EmailLoginPage;