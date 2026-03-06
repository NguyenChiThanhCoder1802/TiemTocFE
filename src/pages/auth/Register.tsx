import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Box,
  MenuItem,
  CircularProgress
} from '@mui/material'
import {
  PersonOutline,
  LockOutlined,
  Visibility,
  VisibilityOff,
  EmailOutlined
} from '@mui/icons-material'

import { registerApi, staffRegisterApi } from '../../api/AuthAPI'


type StaffPosition = 'stylist' | 'assistant' | 'manager'

interface StaffRegisterPayload {
  email: string
  name: string
  password: string
  confirmpassword: string
  experienceYears: number
  skills: string[]
  position: StaffPosition
}

/* ================= CONSTANTS ================= */

const STAFF_POSITIONS: { label: string; value: StaffPosition }[] = [
  { label: 'Stylist', value: 'stylist' },
  { label: 'Assistant', value: 'assistant' },
  { label: 'Manager', value: 'manager' }
]

/* ================= COMPONENT ================= */

const Register = () => {
  const [searchParams] = useSearchParams()
  const isStaff = searchParams.get('applyAsStaff') === 'true'

  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')

  // Staff-only
  const [experienceYears, setExperienceYears] = useState<number>(0)
  const [skillsInput, setSkillsInput] = useState<string>('')
  const [position, setPosition] = useState<StaffPosition>('stylist')

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  /* ================= HANDLERS ================= */

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirm) {
      setMessage(' Mật khẩu không khớp')
      return
    }

    try {
      setLoading(true)
      setMessage('')

      if (isStaff) {
        const payload: StaffRegisterPayload = {
          email,
          name,
          password,
          confirmpassword: confirm,
          experienceYears,
          skills: skillsInput
            .split(',')
            .map(s => s.trim())
            .filter(Boolean),
          position
        }

        await staffRegisterApi(payload)
      } else {
        await registerApi({
          email,
          name,
          password,
          confirmpassword: confirm,
        })
      }

      localStorage.setItem('pendingEmail', email)
      navigate('/otp', { state: { email } })
    } catch (err: unknown) {
  if (err instanceof Error) {
    setMessage(err.message)
  } else {
    setMessage('Có lỗi xảy ra')
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
          {isStaff ? 'Đăng ký nhân viên' : 'Đăng ký'}
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

        {/* STAFF FIELDS */}
        {isStaff && (
          <>
            <TextField
              label="Số năm kinh nghiệm"
              type="number"
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              fullWidth
              margin="normal"
              inputProps={{ min: 0 }}
            />

            <TextField
              label="Kỹ năng (cách nhau bằng dấu ,)"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              fullWidth
              margin="normal"
              placeholder="Cắt tóc nam, uốn, nhuộm..."
            />

            <TextField
              select
              label="Vị trí"
              value={position}
              onChange={(e) =>
                setPosition(e.target.value as StaffPosition)
              }
              fullWidth
              margin="normal"
            >
              {STAFF_POSITIONS.map(p => (
                <MenuItem key={p.value} value={p.value}>
                  {p.label}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}

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
            isStaff ? 'Đăng ký nhân viên' : 'Đăng ký'
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
