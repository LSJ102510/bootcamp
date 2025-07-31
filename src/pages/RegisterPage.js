// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const { confirmPassword, ...registerData } = form;

    registerMutation.mutate(registerData, {
      onSuccess: () => {
        alert('회원가입 성공!');
        navigate('/login');
      },
      onError: (err) => {
        alert('회원가입 실패: ' + err.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
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
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />
      <button type="submit" disabled={registerMutation.isLoading}>
        회원가입
      </button>
    </form>
  );
};

export default RegisterPage;