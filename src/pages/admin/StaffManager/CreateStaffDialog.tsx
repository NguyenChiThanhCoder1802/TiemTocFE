import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack
} from "@mui/material"
import { createStaffApi } from "../../../api/AdminAPI"
import { useToast } from "../../../hooks/useToast"
interface Props {
  open: boolean
  onClose: () => void
  onCreated?: () => void
}

const CreateStaffDialog = ({ open, onClose, onCreated }: Props) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experienceYears: 0,
  })
  const [file, setFile] = useState<File | null>(null)
  const handleChange = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }
  const { showToast } = useToast()

const handleSubmit = async () => {
  try {
    const formData = new FormData()

    formData.append("name", form.name)
    formData.append("email", form.email)
    formData.append("phone", form.phone)
    formData.append("position", form.position)
    formData.append("experienceYears", String(form.experienceYears))

    if (file) {
      formData.append("avatar", file)
    }

    const res = await createStaffApi(formData)

    showToast(res.data.message || "Tạo nhân viên thành công", "success")

    onCreated?.()
    onClose()
  } catch (err: any) {
    showToast(
  err?.response?.data?.message ||
  err?.response?.data ||
  err.message ||
  "Tạo nhân viên thất bại",
  "error"
)
  }
}

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Thêm nhân viên</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Tên"
            value={form.name}
            onChange={e => handleChange("name", e.target.value)}
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={e => handleChange("email", e.target.value)}
          />

          <TextField
            label="Số điện thoại"
            value={form.phone}
            onChange={e => handleChange("phone", e.target.value)}
          />

          <TextField
            label="Vị trí"
            value={form.position}
            onChange={e => handleChange("position", e.target.value)}
          />

          <TextField
            label="Kinh nghiệm (năm)"
            type="number"
            value={form.experienceYears}
            onChange={e =>
              handleChange("experienceYears", Number(e.target.value))
            }
          />
          <Button variant="outlined" component="label">
            Chọn ảnh avatar
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={e => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0])
                }
              }}
            />
          </Button>
          {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                style={{ width: 100, borderRadius: 8 }}
              />
            )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateStaffDialog