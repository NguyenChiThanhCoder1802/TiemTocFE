import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Box
} from '@mui/material'
import {
  LockOutlined,
  PersonOutline,
  Visibility,
  VisibilityOff
} from '@mui/icons-material'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import { loginApi } from '../../api/AuthAPI'
import { useToast } from '../../hooks/useToast'

const Login = () => {
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
     const { accessToken, refreshToken, user } =
      await loginApi({ email, password })

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('auth_user', JSON.stringify(user))
      showToast('Đăng nhập thành công', 'success')
      const role = Array.isArray(user.role)
        ? user.role[0]
        : user.role

      if (role === 'admin') navigate('/admin/dashboard')
      else if (role === 'staff') navigate('/staff/home')
      else navigate('/')
    } catch (err: any) {
    showToast(
      err?.message,
      'error'
    )}
  }

  return (
    <Box sx={{ width: 360 }}>
     <Box textAlign="center" mb={3}>
        <ContentCutIcon
          sx={{
            fontSize: 48,
            color: 'primary.main',
            mb: 1
          }}
        />
        <Typography variant="h5" mt={1}>
          Đăng nhập
        </Typography>
      </Box>


      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            py: 1.2,
            fontWeight: 600,
            borderRadius: 3
          }}
        >
          Đăng nhập
        </Button>

      </form>
          
     <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="body2"
          sx={{
            cursor: 'pointer',
            color: 'primary.main',
            fontWeight: 500
          }}
          onClick={() => navigate('/register')}
        >
          Chưa có tài khoản? Đăng ký
        </Typography>

        <Typography
          variant="body2"
          sx={{
            cursor: 'pointer',
            color: 'primary.main',
            fontWeight: 500
          }}
          onClick={() => navigate('/forgot-password')}
        >
          Quên mật khẩu?
        </Typography>
    </Box>

    </Box>
  )
  }

export default Login
