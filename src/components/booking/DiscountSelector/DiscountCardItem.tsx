import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  CircularProgress
} from '@mui/material'
import type { DiscountCard } from '../../../types/Discount/Discount'

interface Props {
  voucher: DiscountCard
  selected: boolean
  loading: boolean
  onSelect: (code: string) => void
}

export default function DiscountCardItem({
  voucher,
  selected,
  loading,
  onSelect
}: Props) {
  const isPercent = voucher.discountType === 'percent'

  return (
    <Card
      variant={selected ? 'outlined' : undefined}
      sx={{
        borderColor: selected ? 'primary.main' : undefined,
        opacity: voucher.isActive ? 1 : 0.6
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          {/* Mã voucher */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={600}>{voucher.code}</Typography>

            {selected && <Chip label="Đã chọn" color="primary" size="small" />}
          </Stack>

          {/* Giá trị giảm */}
          <Typography variant="body2">
            Giảm{' '}
            {isPercent
              ? `${voucher.discountValue}%`
              : `${voucher.discountValue.toLocaleString()}đ`}
          </Typography>

          {/* Điều kiện */}
          {voucher.minValue > 0 && (
            <Typography variant="caption" color="text.secondary">
              Áp dụng cho đơn từ {voucher.minValue.toLocaleString()}đ
            </Typography>
          )}

          {/* Nút chọn */}
          <Button
            variant={selected ? 'contained' : 'outlined'}
            size="small"
            disabled={!voucher.isActive || loading}
            onClick={() => onSelect(voucher.code)}
          >
            {loading ? <CircularProgress size={18} /> : selected ? 'Đã chọn' : 'Chọn'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}