// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
        <header id = 'title'>
            <h1>우당탕탕 5조 홈페이지</h1>
        </header>
        <div style={{ marginTop: '20px' }}>
            <Link to="/login">로그인</Link> | <Link to="/register">회원가입</Link>
        </div>
    </div>
  );
};

export default HomePage;