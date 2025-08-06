import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerWithEmail } from '../../api/auth';
import './EmailSignupStep3.css';

const EmailSignupStep3 = () => {
  const [username, setNickname] = useState('');
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleRegister = async () => {
    const email = state?.email || '';
    const password = state?.password || '';

    if (!username || username.trim().length === 0) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    try {
      await registerWithEmail({ email, password, username });
      alert('회원가입 성공');
      navigate('/home');
    } catch (err) {
        console.log('회원가입 에러:', err.response);
      const errorCode = err.response?.data?.code;

      switch (errorCode) {
        case 'DUPLICATE_NICKNAME':
          alert('이미 사용 중인 닉네임이에요.');
          break;
        case 'INVALID_EMAIL_FORMAT':
          alert('이메일 형식을 다시 확인해주세요.');
          break;
        case 'INVALID_PASSWORD_FORMAT':
          alert('비밀번호 조건을 다시 확인해주세요.');
          break;
        case 'EMAIL_NOT_VERIFIED':
          alert('이메일 인증이 완료되지 않았어요.');
          break;
        default:
          alert('회원가입에 실패했습니다.');
      }
    }
  };

  return (
    <div className="email-step3-container">
      <div className="email-step3-box">
        <h1 className="email-step3-title">OHJOE</h1>
        <p className="email-step3-subtitle">닉네임을 입력해주세요</p>

        <input
          type="text"
          className="email-step3-input"
          placeholder="닉네임"
          value={username}
          onChange={(e) => setNickname(e.target.value)}
        />

        <button className="email-step3-btn" onClick={handleRegister}>
          가입하기
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

export default EmailSignupStep3;