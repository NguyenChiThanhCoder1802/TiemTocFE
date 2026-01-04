import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  CircularProgress
} from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { verifyOtpApi } from '../../api/AuthAPI'
const OtpVerification = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const email =
    location.state?.email || localStorage.getItem('pendingEmail')

  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if (!email) navigate('/register', { replace: true })
  }, [email, navigate])

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join('')

    if (otpCode.length !== 6) {
      setMessage('❌ Vui lòng nhập đủ 6 số OTP')
      return
    }

    try {
      setLoading(true)
      setMessage('')
      await verifyOtpApi({
      email: email.toLowerCase(),
      otp: otpCode
    })
      localStorage.removeItem('pendingEmail')
      setMessage('✅ Xác minh thành công!')

      setTimeout(() => navigate('/login'), 1500)
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : 'Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box textAlign="center" mb={3}>
        <LockOutlined color="primary" sx={{ fontSize: 40 }} />
        <Typography variant="h5" mt={1}>
          Xác nhận OTP
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Nhập mã 6 chữ số đã gửi về email
        </Typography>
      </Box>

      <form onSubmit={handleVerify}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1,
            mb: 3
          }}
        >
          {otp.map((digit, index) => (
            <TextField
              key={index}
              value={digit}
              inputRef={(el) => (inputsRef.current[index] = el)}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) =>
                handleKeyDown(
                  e as React.KeyboardEvent<HTMLInputElement>,
                  index
                )
              }
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: 'center',
                  fontSize: 22,
                  fontWeight: 600
                }
              }}
              sx={{ width: 48 }}
            />
          ))}
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ py: 1.2, borderRadius: 2 }}
        >
          {loading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            'Xác nhận'
          )}
        </Button>
      </form>

      {message && (
        <Alert
          severity={message.includes('✅') ? 'success' : 'error'}
          sx={{ mt: 2 }}
        >
          {message}
        </Alert>
      )}
    </Box>
  )
}

export default OtpVerification
