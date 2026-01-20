import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Autocomplete,
  Typography,
  MenuItem
} from '@mui/material'
import { useMemo, useState, useEffect } from 'react'
import type { Service } from '../../../types/HairService/Service'
import type { Category } from '../../../types/Category/Category'

interface Props {
  open: boolean
  services: Service[]
  categories: Category[]
  onClose: () => void
  onSubmit: (formData: FormData) => Promise<void>
}

const ComboDialog = ({
  open,
  services = [],
  categories,
  onClose,
  onSubmit
}: Props) => {
  /* ================== STATE ================== */
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [selectedServices, setSelectedServices] = useState<Service[]>([])
  const [comboPrice, setComboPrice] = useState<number>(0)
  const [endAt, setEndAt] = useState<string>('')

  /* ================== RESET WHEN OPEN ================== */
  useEffect(() => {
    if (open) {
      setName('')
      setCategoryId('')
      setSelectedServices([])
      setComboPrice(0)
      setEndAt('')
    }
  }, [open])

  /* ================== CALC ORIGINAL PRICE ================== */
  const originalPrice = useMemo(() => {
    return selectedServices.reduce(
      (sum, s) => sum + (s.finalPrice || s.price),
      0
    )
  }, [selectedServices])

  /* ================== SUBMIT ================== */
  const handleSubmit = async () => {
    const formData = new FormData()

    /* BASIC */
    formData.append('name', name)
    formData.append('category', categoryId)
    formData.append('isCombo', 'true')

    /* COMBO INFO */
    formData.append('combo[comboPrice]', String(comboPrice))
    formData.append('combo[originalPrice]', String(originalPrice))

    if (endAt) {
      formData.append(
        'combo[endAt]',
        new Date(endAt).toISOString()
      )
    }

    /* INCLUDED SERVICES */
    selectedServices.forEach((s) => {
      formData.append('includedServices[]', s._id)
    })

    await onSubmit(formData)
  }

  /* ================== UI ================== */
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Tạo combo dịch vụ</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {/* NAME */}
          <TextField
            label="Tên combo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />

          {/* CATEGORY */}
          <TextField
            select
            label="Danh mục"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            fullWidth
            required
          >
            {categories.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>

          {/* SERVICES */}
          <Autocomplete
            multiple
            options={services.filter(
              (s) => !s.isCombo && s.isActive
            )}
            getOptionLabel={(s) => s.name}
            value={selectedServices}
            onChange={(_, value) => setSelectedServices(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Dịch vụ trong combo"
                placeholder="Chọn ít nhất 2 dịch vụ"
              />
            )}
          />

          {/* PRICE INFO */}
          <Typography>
            Giá gốc:{' '}
            <b>{originalPrice.toLocaleString()}đ</b>
          </Typography>

          <TextField
            label="Giá combo"
            type="number"
            value={comboPrice}
            onChange={(e) => setComboPrice(Number(e.target.value))}
            fullWidth
            required
          />

          {/* END DATE */}
          <TextField
            label="Ngày hết hạn"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            !name ||
            !categoryId ||
            selectedServices.length < 2 ||
            comboPrice <= 0 ||
            comboPrice >= originalPrice
          }
        >
          Tạo combo
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ComboDialog
