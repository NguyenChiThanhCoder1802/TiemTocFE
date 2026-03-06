import { useState } from 'react'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { useDiscountManager } from '../../../hooks/useDiscountManager'
import { DiscountTable } from './DiscountTable'
import { DiscountFormDialog } from './DiscountFormDialog'
import type { DiscountCard, CreateDiscountCardPayload, UpdateDiscountCardPayload } from '../../../types/Discount/Discount'

export default function DiscountCardManager() {
  const { discounts, loading, create, update, remove } = useDiscountManager()

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<DiscountCard | null>(null)

  const handleCreate = async (payload: CreateDiscountCardPayload) => {
    await create(payload)
    setOpen(false)
  }

  const handleUpdate = async (
    id: string,
    payload: UpdateDiscountCardPayload
  ) => {
    await update(id, payload)
    setEditing(null)
    setOpen(false)
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Quản lý thẻ giảm giá</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Thêm mã giảm giá
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <DiscountTable
          discounts={discounts}
          onEdit={(discount) => {
            setEditing(discount)
            setOpen(true)
          }}
          onDelete={remove}
          onToggleActive={(id, isActive) =>
            update(id, { isActive })
          }
        />
      )}

      <DiscountFormDialog
        open={open}
        initialData={editing}
        onClose={() => {
          setOpen(false)
          setEditing(null)
        }}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />
    </Box>
  )
}
