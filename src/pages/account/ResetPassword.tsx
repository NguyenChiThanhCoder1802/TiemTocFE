import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/authService';

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const email = params.get('email') || '';
  const token = params.get('token') || '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }
    try {
      const res = await resetPassword({ email, token, newPassword });
      setMessage(res.message);
      setError('');

      // Chuyển sang trang đăng nhập sau 2 giây
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: unknown) {
  if (
    typeof err === 'object' &&
    err !== null &&
    'message' in err &&
    typeof (err as { message?: unknown }).message === 'string'
  ) {
    setError((err as { message: string }).message);
  } else {
    setError('Lỗi xảy ra khi đặt lại mật khẩu');
  }
}

  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Đặt lại mật khẩu</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!message && (
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Cập nhật mật khẩu</button>
        </form>
      )}
      {message && <div style={{ color: 'green', marginTop: 10 }}>{message}</div>}
    </div>
  );
};

export default ResetPassword;
