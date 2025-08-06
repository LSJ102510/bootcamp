import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import './HomePage.css';

const MyPage = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      alert('로그아웃 되었습니다.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/');
    },
    onError: () => {
      alert('로그아웃 실패');
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };



  return (
    <div className="mypage-container">
      <div className="mypage-box">
        <h1 className="mypage-title">홈페이지</h1>
        <button onClick={handleLogout} className="logout-btn">
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;