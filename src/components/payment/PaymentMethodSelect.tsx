import { Box, Stack, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import type { PaymentMethod } from '../../types/Payment/Payment'

interface Props {
  value: PaymentMethod
  onChange: (value: PaymentMethod) => void
}

export default function PaymentMethodSelect({ value, onChange }: Props) {
  return (
    <Box>
      <Typography fontWeight={600} mb={1}>
        Phương thức thanh toán
      </Typography>

      <RadioGroup
        value={value}
        onChange={e => onChange(e.target.value as PaymentMethod)}
      >
        <Stack spacing={1}>
          <FormControlLabel
            value="cash"
            control={<Radio />}
            label="💵 Thanh toán tiền mặt tại tiệm"
          />

          <FormControlLabel
            value="vnpay"
            control={<Radio />}
            label="🏦 Thanh toán qua VNPay"
          />

          <FormControlLabel
            value="momo"
            control={<Radio />}
            label="📱 Ví MoMo (sắp ra mắt)"
            disabled
          />
        </Stack>
      </RadioGroup>
    </Box>
  )
}
