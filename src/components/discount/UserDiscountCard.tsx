import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip
} from '@mui/material'
import { useState } from 'react'
import type { DiscountCard } from '../../types/Discount/Discount'

interface Props {
  discount: DiscountCard
}

export function UserDiscountCard({ discount }: Props) {
  const [copied, setCopied] = useState(false)

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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(discount.code)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
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
              onClick={handleCopy}
            >
              {copied ? 'Đã sao chép' : 'Sao chép mã'}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}