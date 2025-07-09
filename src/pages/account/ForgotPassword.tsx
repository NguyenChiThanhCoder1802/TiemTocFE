import { useState } from 'react';
import { forgotPassword } from '../../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage('Vui lòng kiểm tra email của bạn để tiến hành cấp lại mật khẩu mới của bạn.');

      setError('');
    } catch (err: unknown) {
  if (
    typeof err === 'object' &&
    err !== null &&
    'message' in err &&
    typeof (err as { message?: unknown }).message === 'string'
  ) {
    setError((err as { message: string }).message);
  } else {
    setError('Đã xảy ra lỗi không xác định');
  }
  setMessage('');
}

  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quên mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Nhập email đã đăng ký"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Gửi yêu cầu</button>
      </form>

      {message && <div style={{ color: 'green', marginTop: 10 }}>{message}</div>}
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </div>
  );
};

export default ForgotPassword;
