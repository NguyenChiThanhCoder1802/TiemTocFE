import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  InputAdornment
} from '@mui/material'
import { useEffect, useState } from 'react'

import type {
  DiscountCard,
  CreateDiscountCardPayload
} from '../../../types/Discount/Discount'

interface Props {
  open: boolean
  initialData: DiscountCard | null
  onClose: () => void
  onCreate: (payload: CreateDiscountCardPayload) => void
  onUpdate: (id: string, payload: Partial<DiscountCard>) => void
}

const DEFAULT_FORM_STATE = {
  code: '',
  name: '',
  description: '',
  discountType: 'percent' as 'percent' | 'fixed',
  discountValue: 0,
  maxDiscountAmount: undefined as number | undefined,
  minValue: 0,
  serviceIds: [] as string[],
  quantity: 1,
  userLimit: 1,
  startDate: new Date().toISOString().slice(0, 10),
  endDate: ''
}

export function DiscountFormDialog({
  open,
  initialData,
  onClose,
  onCreate,
  onUpdate
}: Props) {
  const [form, setForm] = useState(DEFAULT_FORM_STATE)

  useEffect(() => {
    if (initialData) {
      setForm({
        code: initialData.code || '',
        name: initialData.name || '',
        description: initialData.description || '',
        discountType: initialData.discountType || 'percent',
        discountValue: initialData.discountValue || 0,
        maxDiscountAmount: initialData.maxDiscountAmount,
        minValue: initialData.minValue || 0,
        serviceIds: initialData.serviceIds || [],
        quantity: initialData.quantity || 1,
        userLimit: initialData.userLimit || 1,
        startDate: initialData.startDate ? initialData.startDate.slice(0, 10) : '',
        endDate: initialData.endDate ? initialData.endDate.slice(0, 10) : ''
      })
    } else {
      setForm(DEFAULT_FORM_STATE)
    }
  }, [initialData, open])

  // Xử lý chuyển đổi Loại Giảm Giá
  const handleDiscountTypeChange = (type: 'percent' | 'fixed') => {
    setForm((prev) => ({
      ...prev,
      discountType: type,
      // Tự động clear maxDiscountAmount nếu chuyển sang giảm tiền cố định
      maxDiscountAmount: type === 'fixed' ? undefined : prev.maxDiscountAmount
    }))
  }

  const handleSubmit = () => {
    // Clean payload trước khi gửi lên Backend
    const payload = {
      ...form,
      maxDiscountAmount: form.discountType === 'percent' ? form.maxDiscountAmount : undefined
    }

    if (initialData) {
      onUpdate(initialData._id, payload)
    } else {
      onCreate(payload as CreateDiscountCardPayload)
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? 'Cập nhật mã giảm giá' : 'Tạo mã giảm giá'}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Mã giảm giá"
            value={form.code}
            onChange={(e) =>
              setForm({ ...form, code: e.target.value.toUpperCase() })
            }
            disabled={!!initialData}
            placeholder="VD: SUMMERSALE2026"
            required
          />

          <TextField
            label="Tên chương trình"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <TextField
            label="Mô tả"
            multiline
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <TextField
            select
            label="Loại giảm giá"
            value={form.discountType}
            onChange={(e) =>
              handleDiscountTypeChange(e.target.value as 'percent' | 'fixed')
            }
          >
            <MenuItem value="percent">Giảm theo %</MenuItem>
            <MenuItem value="fixed">Giảm tiền cố định (VNĐ)</MenuItem>
          </TextField>

          {/* Form linh hoạt theo discountType */}
          <TextField
            label={form.discountType === 'percent' ? 'Mức giảm (%)' : 'Số tiền giảm (VNĐ)'}
            type="number"
            value={form.discountValue}
            inputProps={{
              min: 0,
              max: form.discountType === 'percent' ? 100 : undefined
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {form.discountType === 'percent' ? '%' : 'VNĐ'}
                </InputAdornment>
              )
            }}
            onChange={(e) =>
              setForm({ ...form, discountValue: Number(e.target.value) })
            }
            required
          />

          {/* Chỉ hiển thị Giảm Tối Đa khi chọn Giảm theo % */}
          {form.discountType === 'percent' && (
            <TextField
              label="Số tiền giảm tối đa (VNĐ)"
              type="number"
              placeholder="Để trống nếu không giới hạn"
              value={form.maxDiscountAmount ?? ''}
              InputProps={{
                endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>
              }}
              onChange={(e) =>
                setForm({
                  ...form,
                  maxDiscountAmount: e.target.value ? Number(e.target.value) : undefined
                })
              }
            />
          )}

          <TextField
            label="Giá trị đơn hàng tối thiểu"
            type="number"
            value={form.minValue}
            InputProps={{
              endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>
            }}
            onChange={(e) =>
              setForm({ ...form, minValue: Number(e.target.value) })
            }
          />

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="Tổng số lượt sử dụng"
              type="number"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
              required
            />

            <TextField
              fullWidth
              label="Giới hạn / 1 người dùng"
              type="number"
              value={form.userLimit}
              onChange={(e) =>
                setForm({ ...form, userLimit: Number(e.target.value) })
              }
              required
            />
          </Stack>

          <TextField
            label="Service IDs (phân cách bằng dấu phẩy)"
            placeholder="Để trống nếu áp dụng cho tất cả dịch vụ"
            value={form.serviceIds?.join(', ') || ''}
            onChange={(e) =>
              setForm({
                ...form,
                serviceIds: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
              })
            }
          />

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="Ngày bắt đầu"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.startDate}
              onChange={(e) =>
                setForm({ ...form, startDate: e.target.value })
              }
              required
            />

            <TextField
              fullWidth
              label="Ngày kết thúc"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.endDate}
              onChange={(e) =>
                setForm({ ...form, endDate: e.target.value })
              }
              required
            />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Huỷ
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}