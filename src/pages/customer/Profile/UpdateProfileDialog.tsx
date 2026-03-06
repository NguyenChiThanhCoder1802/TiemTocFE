import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack
} from '@mui/material'
import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { updateProfile } from '../../../api/UserAPI'
import { Snackbar, Alert } from '@mui/material'
interface Props {
  open: boolean
  onClose: () => void
}

const UpdateProfileDialog = ({ open, onClose }: Props) => {
  const { user, updateAuthUser } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    gender: ''
  })
  const [errors, setErrors] = useState<{
  name?: string
  email?: string
  phone?: string
  gender?: string
}>({})
const [successOpen, setSuccessOpen] = useState(false)
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || ''
      })
    }
  }, [user])

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value })
       setErrors({ ...errors, [field]: '' })
    }
    const validateForm = () => {
    const newErrors: any = {}

    if (!form.name.trim()) {
      newErrors.name = 'Họ tên không được để trống'
    }

    if (form.phone && !/^[0-9]{9,15}$/.test(form.phone)) {
      newErrors.phone = 'Số điện thoại phải từ 9–15 chữ số'
    }

    if (!form.gender) {
      newErrors.gender = 'Vui lòng chọn giới tính'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = async () => {
     if (!validateForm()) return
    try {
      const updatedUser = await updateProfile(form)

      // cập nhật lại user trong context
      updateAuthUser(updatedUser)
      setErrors({})
      setSuccessOpen(true)
      onClose() 
    } catch (err: any) {
      console.error(err)
      if (err.response?.data?.errors) {

      const backendErrors = err.response.data.errors

      const newErrors: any = {}
 backendErrors.forEach((msg: string) => {
          if (msg.includes('name'))
            newErrors.name = 'Họ tên không hợp lệ'
          if (msg.includes('phone'))
            newErrors.phone = 'Số điện thoại không hợp lệ'
          if (msg.includes('gender'))
            newErrors.gender = 'Giới tính không hợp lệ'
        })

      setErrors(newErrors)
    }
    }
  }

  return (
    <>
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Cập nhật thông tin cá nhân</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Họ tên"
            value={form.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <TextField
            label="Số điện thoại"
            value={form.phone}
            onChange={handleChange('phone')}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
          />

          <TextField
            select
            label="Giới tính"
            value={form.gender}
            onChange={handleChange('gender')}
            fullWidth
          >
            <MenuItem value="male">Nam</MenuItem>
            <MenuItem value="female">Nữ</MenuItem>
            <MenuItem value="other">Khác</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Lưu thay đổi
        </Button>
      </DialogActions>
    </Dialog>
      <Snackbar
      open={successOpen}
      autoHideDuration={3000}
      onClose={() => setSuccessOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={() => setSuccessOpen(false)}
        severity="success"
        variant="filled"
      >
        Cập nhật thông tin thành công
      </Alert>
    </Snackbar>
</>
  )
}

export default UpdateProfileDialog