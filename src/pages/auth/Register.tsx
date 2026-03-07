import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress
} from '@mui/material'
import {
  PersonOutline,
  LockOutlined,
  Visibility,
  VisibilityOff,
  EmailOutlined
} from '@mui/icons-material'
import { useToast } from "../../hooks/useToast"
import { registerApi } from '../../api/AuthAPI'


/* ================= COMPONENT ================= */

const Register = () => {

  const navigate = useNavigate()
  const { showToast } = useToast()
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  /* ================= HANDLERS ================= */

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirm) {
      showToast(' Mật khẩu không khớp',"error")
      return
    }

    try {
      setLoading(true)
      showToast('')
        await registerApi({
          email,
          name,
          password,
          confirmpassword: confirm,
        })
        showToast('Đăng ký thành công - Xác thực OTP!')
          localStorage.setItem('pendingEmail', email)
          navigate('/otp', { state: { email } })
        } catch (err: unknown) {
        if (err instanceof Error) {
          showToast(err.message,"error")
        } else {
         showToast("Có lỗi xảy ra", "error")
        }
      } finally {
            setLoading(false)
          }
        }

  /* ================= RENDER ================= */

  return (
    <>
      <Box textAlign="center" mb={3}>
        <Typography variant="h5">
         Đăng ký tài khoản
        </Typography>
      </Box>

      <form onSubmit={handleRegister}>
        {/* EMAIL */}
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

        {/* NAME */}
        <TextField
          label="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        {/* PASSWORD */}
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
                <IconButton onClick={() => setShowPassword(p => !p)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* CONFIRM */}
        <TextField
          label="Xác nhận mật khẩu"
          type={showPassword ? 'text' : 'password'}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1.2, fontWeight: 600, borderRadius: 3 }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            'Đăng ký'
          )}
        </Button>
      </form>

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
