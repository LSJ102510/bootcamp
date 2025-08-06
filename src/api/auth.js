import axios from 'axios';
// axios 인스턴스 생성

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터로 자동 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 이메일 로그인 - api 인스턴스 사용하도록 수정
export const loginWithEmail = (data) =>
  api.post('/api/auth/signin', data);

// 이메일 코드 요청
export const requestEmailCode = (email) =>
  api.post('/api/auth/email/send', { email });

// 이메일 코드 인증
export const verifyEmailCode = (data) =>
  api.post('/api/auth/email/verify', data);

// 회원가입 - api 인스턴스 사용하도록 수정
export const registerWithEmail = (data) => {
  return api.post('/api/auth/register', data);
};

// 로그아웃 - 간단하게 수정 (인터셉터가 토큰 자동 추가)
export const logout = () => {
  return api.post('/api/auth/logout');
};

// 카카오 로그인 (리디렉션 방식)
export const loginWithKakao = () => {
  const kakaoAuthUrl = 'http://auth.junhwan.me/oauth2/authorization/kakao';
  window.location.href = kakaoAuthUrl;
};

// src/api/auth.js (예시)
export const fetchMyInfo = () => {
  return api.get('/api/user/me'); // 토큰이 자동 첨부됨
};

