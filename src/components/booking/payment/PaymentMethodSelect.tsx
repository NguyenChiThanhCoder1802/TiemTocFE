import {
  Box,
  Stack,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'

import type { PaymentMethod } from '../../../types/Payment/Payment'
import cashIcon from '../../../assets/paymentIcons/tienmat.png'
import vnpayIcon from '../../../assets/paymentIcons/nganhang.png'

interface Props {
  value: PaymentMethod
  onChange: (value: PaymentMethod) => void
}

export default function PaymentMethodSelect({ value, onChange }: Props) {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        p: 3,
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #eee'
      }}
    >
      <Typography variant="h6" fontWeight={600}>
       Chọn Phương thức thanh toán
      </Typography>

      <RadioGroup
        value={value}
        onChange={e => onChange(e.target.value as PaymentMethod)}
      >
        <Stack spacing={1.5}>

          <FormControlLabel
            value="cash"
            control={<Radio />}
            label={
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  component="img"
                  src={cashIcon}
                  alt="cash"
                  sx={{ width: 24, height: 24, objectFit: 'contain' }}
                />
                <span>Thanh toán tiền mặt tại tiệm</span>
              </Stack>
            }
          />

          <FormControlLabel
            value="vnpay"
            control={<Radio />}
            label={
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  component="img"
                  src={vnpayIcon}
                  alt="vnpay"
                  sx={{ width: 24, height: 24, objectFit: 'contain' }}
                />
                <span>Thanh toán qua VNPay</span>
              </Stack>
            }
          />

          <FormControlLabel
            value="momo"
            control={<Radio />}
            label=" Ví MoMo (sắp ra mắt)"
            disabled
          />

        </Stack>
      </RadioGroup>
    </Box>
  )
}