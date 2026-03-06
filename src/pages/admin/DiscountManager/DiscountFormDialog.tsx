import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem
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
  onUpdate: (id: string, payload: Partial<CreateDiscountCardPayload> & { isActive?: boolean }) => void
}

export function DiscountFormDialog({
  open,
  initialData,
  onClose,
  onCreate,
  onUpdate
}: Props) {
  const [form, setForm] = useState<CreateDiscountCardPayload>({
  code: '',
  name: '',
  description: '',
  discountType: 'percent',
  discountValue: 0,
  maxDiscountAmount: undefined,
  minValue: 0,
  serviceIds: [],
  quantity: 1,
  userLimit: 1,
  startDate: '',
  endDate: ''
})


  useEffect(() => {
  if (!initialData) return

  setForm({
    code: initialData.code,
    name: initialData.name,
    description: initialData.description,
    discountType: initialData.discountType,
    discountValue: initialData.discountValue,
    maxDiscountAmount: initialData.maxDiscountAmount,
    minValue: initialData.minValue,
    serviceIds: initialData.serviceIds,
    quantity: initialData.quantity,
    userLimit: initialData.userLimit,
    startDate: initialData.startDate.slice(0, 10),
    endDate: initialData.endDate.slice(0, 10)
  })
}, [initialData])


 const handleSubmit = () => {
  if (initialData) {
    const {
      name,
      description,
      discountValue,
      maxDiscountAmount,
      minValue,
      quantity,
      userLimit,
      startDate,
      endDate
    } = form

    onUpdate(initialData._id, {
      name,
      description,
      discountValue,
      maxDiscountAmount,
      minValue,
      quantity,
      userLimit,
      startDate,
      endDate
    })
  } else {
    onCreate(form)
  }
}


  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? 'Cập nhật mã giảm giá' : 'Tạo mã giảm giá'}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Mã giảm giá"
            value={form.code}
            onChange={(e) =>
              setForm({ ...form, code: e.target.value.toUpperCase() })
            }
            disabled={!!initialData}
          />

          <TextField
            label="Tên chương trình"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <TextField
            select
            label="Loại giảm giá"
            value={form.discountType}
            onChange={(e) =>
              setForm({
                ...form,
                discountType: e.target.value as 'percent' | 'fixed'
              })
            }
          >
            <MenuItem value="percent">Giảm theo %</MenuItem>
            <MenuItem value="fixed">Giảm tiền cố định</MenuItem>
          </TextField>

          <TextField
            label="Giá trị giảm"
            type="number"
            value={form.discountValue}
            onChange={(e) =>
              setForm({
                ...form,
                discountValue: Number(e.target.value)
              })
            }
          />

          <TextField
            label="Giá trị tối thiểu"
            type="number"
            value={form.minValue}
            onChange={(e) =>
              setForm({
                ...form,
                minValue: Number(e.target.value)
              })
            }
          />
            <TextField
              label="Số lượt sử dụng"
              type="number"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
            />

            <TextField
              label="Giới hạn mỗi người dùng"
              type="number"
              value={form.userLimit}
              onChange={(e) =>
                setForm({ ...form, userLimit: Number(e.target.value) })
              }
            />

            {form.discountType === 'percent' && (
              <TextField
                label="Giảm tối đa"
                type="number"
                value={form.maxDiscountAmount || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    maxDiscountAmount: Number(e.target.value)
                  })
                }
              />
            )}
          <TextField
            label="Service IDs (phân cách bằng dấu ,)"
            value={form.serviceIds?.join(',') || ''}
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

          <TextField
            label="Ngày bắt đầu"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.startDate}
            onChange={(e) =>
              setForm({ ...form, startDate: e.target.value })
            }
          />

          <TextField
            label="Ngày kết thúc"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.endDate}
            onChange={(e) =>
              setForm({ ...form, endDate: e.target.value })
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
