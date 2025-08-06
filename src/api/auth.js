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
// ✅ 토큰 관리 유틸리티 추가
// src/api/auth.js

export const tokenManager = {
  saveTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  },
  getAccessToken: () => localStorage.getItem('accessToken'),
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common['Authorization'];
  },
};

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
  const kakaoAuthUrl = 'http://auth.junhwan.me/oauth2/authorization/kakao?prompt=login';
  window.location.href = kakaoAuthUrl;
};

// src/api/auth.js (예시)
export const handleOAuth2Redirect = (location, navigate) => {
  const urlParams = new URLSearchParams(location.search);
  const accessToken = urlParams.get('accessToken');
  const refreshToken = urlParams.get('refreshToken');
  const message = urlParams.get('message');

  if (accessToken && refreshToken) {
    tokenManager.saveTokens(accessToken, refreshToken); // ✅ 저장
    navigate('/home', { replace: true });

    if (message === 'login_success') {
      return { success: true, message: '카카오 로그인 성공!' };
    }
  }

  return null;
};
