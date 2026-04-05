import { useEffect, useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack
} from "@mui/material"
import { updateStaffApi } from "../../../api/AdminAPI"
import type { Staff } from "../../../types/Staff/Staff"
import { useToast } from "../../../hooks/useToast"
interface Props {
  open: boolean
  onClose: () => void
  staff: Staff | null
  onUpdated?: () => void
}

const UpdateStaffDialog = ({ open, onClose, staff, onUpdated }: Props) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experienceYears: 0
  })

  const [file, setFile] = useState<File | null>(null)
  const { showToast } = useToast()
  useEffect(() => {
    if (staff) {
      setForm({
        name: staff.name || "",
        email: staff.email || "",
        phone: staff.phone || "",
        position: staff.position || "",
        experienceYears: staff.experienceYears || 0
      })
    }
  }, [staff])

  const handleChange = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

 const handleSubmit = async () => {
  if (!staff) return

  try {
    const formData = new FormData()

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    if (file) {
      formData.append("avatar", file)
    }

    const res = await updateStaffApi(staff._id, formData)

    showToast(res.data.message || "Cập nhật thành công", "success")

    onUpdated?.()
    onClose()
  } catch (err: any) {
    showToast(
      err?.response?.data?.message || "Cập nhật thất bại",
      "error"
    )
  }
}
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cập nhật nhân viên</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Tên" value={form.name} onChange={e => handleChange("name", e.target.value)} />
          <TextField label="Email" value={form.email} onChange={e => handleChange("email", e.target.value)} />
          <TextField label="SĐT" value={form.phone} onChange={e => handleChange("phone", e.target.value)} />
          <TextField label="Vị trí" value={form.position} onChange={e => handleChange("position", e.target.value)} />
          <TextField
            label="Kinh nghiệm"
            type="number"
            value={form.experienceYears}
            onChange={e => handleChange("experienceYears", Number(e.target.value))}
          />

          <Button component="label">
            Đổi avatar
            <input type="file" hidden onChange={e => setFile(e.target.files?.[0] || null)} />
          </Button>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateStaffDialog