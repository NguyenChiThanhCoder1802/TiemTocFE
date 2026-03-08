import { useState } from 'react'
import { Box, Button, TextField, Typography, Alert,CircularProgress  } from '@mui/material'
import { forgotPasswordApi } from '../../api/AuthAPI'
import { useNavigate } from 'react-router-dom'
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setMessage('')
      setError('')
       const res = await forgotPasswordApi(email)

      setMessage(res.message || 'Tiếp tục đặt lại mật khẩu')
      setTimeout(() => {
        navigate(`/reset-password`,{state:{email}})
      }, 1000)
    } catch (err: unknown) {
      setError( 
        err instanceof Error ? err.message : 'Email không tồn tại'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Typography variant="h5" textAlign="center" mb={1}>
        Quên mật khẩu
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        mb={3}
      >
        Nhập email đã đăng ký để tiếp tục đặt lại mật khẩu
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ mt: 2, py: 1.2, borderRadius: 3 }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : 'Gửi yêu cầu'}
        </Button>
      </Box>
       
      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </>
  )
}
export default ForgotPassword
