import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Stack
} from '@mui/material'
import type { Category } from '../../../types/Category/Category'
import { useEffect, useState } from 'react'

interface Props {
  open: boolean
  category: Category | null
  onClose: () => void
  onSubmit: (payload: {
    name: string
    description?: string
    order?: number
    isActive: boolean
  }) => void
}

const CategoryDialog = ({
  open,
  category,
  onClose,
  onSubmit
}: Props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [order, setOrder] = useState<number | undefined>(0)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (category) {
      setName(category.name)
      setDescription(category.description || '')
      setOrder(category.order)
      setIsActive(category.isActive)
    } else {
      setName('')
      setDescription('')
      setOrder(0)
      setIsActive(true)
    }
  }, [category])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 600 }}>
        {category ? 'Cập nhật danh mục' : 'Thêm danh mục'}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Tên danh mục"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />

          <TextField
            label="Thứ tự"
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            fullWidth
          />

          <FormControlLabel
            control={
              <Switch
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            }
            label="Kích hoạt danh mục"
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          variant="contained"
          onClick={() =>
            onSubmit({
              name,
              description,
              order,
              isActive
            })
          }
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CategoryDialog
