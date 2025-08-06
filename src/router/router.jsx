// src/router/router.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';
import EmailLoginPage from '../pages/Login/EmailLoginPage';
import EmailSignupStep1 from '../pages/Login/EmailSignupStep1';
import EmailSignupStep2 from '../pages/Login/EmailSignupStep2';
import EmailSignupStep3 from '../pages/Login/EmailSignupStep3';
import HomePage from '../pages/HomePage';
import ProtectedRoute from '../components/ProtectedRoute'; // ✅ import

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/email-login" element={<EmailLoginPage />} />
      <Route path="/email-signup" element={<EmailSignupStep1 />} />
      <Route path="/email-signup/step2" element={<EmailSignupStep2 />} />
      <Route path="/email-signup/step3" element={<EmailSignupStep3 />} />
      
      {/* ✅ 보호된 페이지 */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}