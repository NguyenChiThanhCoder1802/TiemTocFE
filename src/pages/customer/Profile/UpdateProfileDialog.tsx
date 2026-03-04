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
    }

  const handleSubmit = async () => {
    try {
      const updatedUser = await updateProfile(form)

      // cập nhật lại user trong context
      updateAuthUser(updatedUser)

      onClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Cập nhật thông tin cá nhân</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Họ tên"
            value={form.name}
            onChange={handleChange('name')}
            fullWidth
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={handleChange('email')}
            fullWidth
          />

          <TextField
            label="Số điện thoại"
            value={form.phone}
            onChange={handleChange('phone')}
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
  )
}

export default UpdateProfileDialog