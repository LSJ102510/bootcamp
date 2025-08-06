import React, { useState } from 'react';
import { requestEmailCode, verifyEmailCode } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import './EmailSignupStep1.css';

const EmailSignupStep1 = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const handleRequestCode = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('올바른 이메일 형식이 아닙니다.');
    return;
  }

  try {
    await requestEmailCode(email);
    alert('인증번호가 전송되었습니다.');
  } catch (err) {
    if (err.response?.status === 401) {
      alert('이미 등록된 이메일입니다.');
    } else {
      alert('전송 실패');
    }
  }
};

  const handleVerifyCode = async () => {
  try {
    const res = await verifyEmailCode({ email, code });
    alert(res.data.message); // ✅ 서버 메시지 출력
    navigate('/email-signup/step2', { state: { email } });
  } catch (err) {
    alert('서버 오류');
  }
};

  return (
    <div className="email-step1-container">
      <div className="email-step1-box">
        <h1 className="email-step1-title">OHJOE</h1>
        <p className="email-step1-subtitle">이메일을 인증해주세요</p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소"
          className="email-step1-input"
          required
        />
        <button onClick={handleRequestCode} className="email-step1-btn">
          인증번호 요청
        </button>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="인증번호 입력"
          className="email-step1-input"
          required
        />
        <button onClick={handleVerifyCode} className="email-step1-btn">
          인증번호 확인
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

export default EmailSignupStep1;