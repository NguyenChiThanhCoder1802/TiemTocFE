import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material'
import { resetPasswordApi } from '../../api/AuthAPI'

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state?.email || ''
    const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) {
      setError('Vui lòng nhập OTP')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp')
      return
    }

    try {
      setLoading(true)
      setError('')
      setMessage('')

      const res = await resetPasswordApi({
        email,
        otp,
        newPassword
      })

      setMessage(res.message)

      setTimeout(() => {
        navigate('/login')
      }, 2000)

    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof (err as { message?: unknown }).message === 'string'
      ) {
        setError((err as { message: string }).message)
      } else {
        setError('Lỗi xảy ra khi đặt lại mật khẩu')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box maxWidth={400} mx="auto">
      <Typography variant="h5" textAlign="center" mb={3}>
        Đặt lại mật khẩu
      </Typography>

      <Box component="form" onSubmit={handleReset}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          disabled
          margin="normal"
        />

        <TextField
          fullWidth
          label="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          type="password"
          label="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          type="password"
          label="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          margin="normal"
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 2, py: 1.2, borderRadius: 3 }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : 'Cập nhật mật khẩu'}
        </Button>
      </Box>

      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  )
}

export default ResetPassword