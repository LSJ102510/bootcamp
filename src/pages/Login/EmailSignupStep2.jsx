import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EmailSignupStep2.css';

const EmailSignupStep2 = () => {
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;
  const handleNext = () => {
  if (!pw || !confirm) {
    alert('비밀번호를 입력해주세요.');
    return;
  }

  if (pw !== confirm) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  // 비밀번호 유효성 검사
  const lengthCheck = pw.length >= 6 && pw.length <= 30;
  const lowerCaseCheck = /[a-z]/.test(pw);
  const upperCaseCheck = /[A-Z]/.test(pw);
  const numberCheck = /\d/.test(pw);
  const specialCharCheck = /[!@#$%^&*()]/.test(pw);

  if (!lengthCheck) {
    alert('비밀번호는 6자 이상 30자 이하여야 합니다.');
    return;
  }

  if (!lowerCaseCheck) {
    alert('비밀번호에 소문자를 포함해야 합니다.');
    return;
  }

  if (!upperCaseCheck) {
    alert('비밀번호에 대문자를 포함해야 합니다.');
    return;
  }

  if (!numberCheck) {
    alert('비밀번호에 숫자를 포함해야 합니다.');
    return;
  }

  if (!specialCharCheck) {
    alert('비밀번호에 특수문자 (!@#$%^&*()) 중 하나를 포함해야 합니다.');
    return;
  }

  navigate('/email-signup/step3', { state: { email, password: pw } });
};

  return (
    <div className="email-step2-container">
      <div className="email-step2-box">
  <h1 className="email-step2-title">OHJOE</h1>
  <p className="email-step2-subtitle">비밀번호를 입력해주세요</p>

  <input
    type="password"
    className="email-step2-input"
    placeholder="비밀번호"
    value={pw}
    onChange={(e) => setPw(e.target.value)}
  />
  <input
    type="password"
    className="email-step2-input"
    placeholder="비밀번호 확인"
    value={confirm}
    onChange={(e) => setConfirm(e.target.value)}
  />

  <button className="email-step2-btn" onClick={handleNext}>
    다음
  </button>

  <div className="password-rules">
    <ul>
      <li>최소 6자 이상, 최대 30자</li>
      <li>소문자 포함</li>
      <li>대문자 포함</li>
      <li>숫자 포함</li>
      <li>특수문자 포함: !@#$%^&*()</li>
    </ul>
  </div>
  <button
            className="start-page-btn"
            onClick={() => navigate('/login')}>
            OHJOE
          </button>
</div>
    </div>
  );
};

export default EmailSignupStep2;