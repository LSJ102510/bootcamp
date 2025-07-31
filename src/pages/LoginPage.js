// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(form, {
      onSuccess: () => {
        alert('로그인 성공!');
        navigate('/');
      },
      onError: (err) => {
        alert('로그인 실패: ' + err.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit" disabled={loginMutation.isLoading}>
        로그인
      </button>
    </form>
  );
};

export default LoginPage;