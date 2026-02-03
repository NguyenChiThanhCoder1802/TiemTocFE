import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip
} from '@mui/material'
import type { DiscountCard } from '../../types/Discount/Discount'

interface Props {
  discount: DiscountCard
  onApply: (code: string) => void
}

export function UserDiscountCard({ discount, onApply }: Props) {
  const expired =
    new Date(discount.endDate) < new Date()

  const outOfStock =
    discount.usedQuantity >= discount.quantity

  const disabled =
    expired || outOfStock || !discount.isActive

  const renderDiscountText = () => {
    if (discount.discountType === 'percent') {
      return `Giảm ${discount.discountValue}%${
        discount.maxDiscountAmount
          ? ` (tối đa ${discount.maxDiscountAmount.toLocaleString()}đ)`
          : ''
      }`
    }
    return `Giảm ${discount.discountValue.toLocaleString()}đ`
  }

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        opacity: disabled ? 0.5 : 1
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6">
            {discount.code}
          </Typography>

          <Typography>{renderDiscountText()}</Typography>

          {discount.minValue > 0 && (
            <Typography variant="body2">
              Đơn tối thiểu{' '}
              {discount.minValue.toLocaleString()}đ
            </Typography>
          )}

          <Typography variant="body2">
            HSD:{' '}
            {new Date(discount.endDate).toLocaleDateString()}
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Chip
              size="small"
              label={
                expired
                  ? 'Hết hạn'
                  : outOfStock
                  ? 'Hết lượt'
                  : 'Còn dùng'
              }
              color={
                expired || outOfStock
                  ? 'default'
                  : 'success'
              }
            />

            <Button
              size="small"
              variant="contained"
              disabled={disabled}
              onClick={() => onApply(discount.code)}
            >
              Dùng ngay
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
