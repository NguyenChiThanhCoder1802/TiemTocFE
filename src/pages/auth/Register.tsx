import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Box
} from '@mui/material'
import {
  PersonOutline,
  LockOutlined,
  Visibility,
  VisibilityOff,
  EmailOutlined
} from '@mui/icons-material'
import { CircularProgress } from '@mui/material'

import { registerApi } from '../../api/AuthAPI'
const Register = () => {
  const [email, setEmail] = useState('')
  const [name, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirm) {
      setMessage('❌ Mật khẩu không khớp')
      return
    }

    try {
      setLoading(true)
      setMessage('')
      await registerApi({
        email,
        name,
        password,
        role: 'customer'
      })

      

      localStorage.setItem('pendingEmail', email)
      navigate('/otp', { state: { email } })
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : 'Có lỗi xảy ra')
    }
  }

  return (
    <>
      <Box textAlign="center" mb={3}>
        <Typography variant="h5" mt={1}>
          Đăng ký
        </Typography>
      </Box>

      <form onSubmit={handleRegister}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined />
              </InputAdornment>
            )
          }}
        />

        <TextField
          label="Họ và tên"
          value={name}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutline />
              </InputAdornment>
            )
          }}
        />

        <TextField
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((p) => !p)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          label="Xác nhận mật khẩu"
          type={showPassword ? 'text' : 'password'}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined />
              </InputAdornment>
            )
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.2,
            fontWeight: 600,
            borderRadius: 3
          }}
        >
         {loading ? (
          <CircularProgress size={22} color="inherit" />
        ) : (
          'Đăng ký'
        )}
        </Button>
      </form>

      {message && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}

      <Typography
        mt={2}
        textAlign="center"
        sx={{ cursor: 'pointer', color: 'primary.main' }}
        onClick={() => navigate('/login')}
      >
        Đã có tài khoản? Đăng nhập
      </Typography>
    </>
  )
}

export default Register
