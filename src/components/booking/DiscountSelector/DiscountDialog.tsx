import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack
} from '@mui/material'
import type { DiscountCard } from '../../../types/Discount/Discount'
import DiscountCardItem from './DiscountCardItem'

interface Props {
  open: boolean
  onClose: () => void
  discounts: DiscountCard[]
  selectedCode: string | null
  loadingCode: string | null
  onSelect: (code: string) => void
}

export default function DiscountDialog({
  open,
  onClose,
  discounts,
  selectedCode,
  loadingCode,
  onSelect
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Danh sách ưu đãi</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {discounts.map(voucher => (
            <DiscountCardItem
              key={voucher._id}
              voucher={voucher}
              selected={selectedCode === voucher.code}
              loading={loadingCode === voucher.code}
              onSelect={onSelect}
            />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}