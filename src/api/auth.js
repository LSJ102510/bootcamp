// src/api/auth.js
import axios from 'axios';

const BASE_URL = 'http://localhost:4000'; // 서버 주소에 맞게 수정

export const login = async (data) => {
  const res = await axios.post(`${BASE_URL}/login`, data);
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post(`${BASE_URL}/register`, data);
  return res.data;
};