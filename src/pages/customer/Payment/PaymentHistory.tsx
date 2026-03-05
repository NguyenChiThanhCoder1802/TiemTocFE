import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Card,
  Stack,
  Chip,
  CircularProgress
} from '@mui/material'
import { getMyPayments } from '../../../api/PaymentAPI'
import type { Payment } from '../../../types/Payment/Payment'

const PaymentHistoryPage = () => {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyPayments()
      .then(setPayments)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box maxWidth={700}>
      <Typography variant="h6" mb={2} fontWeight={600}>
        Lịch sử thanh toán
      </Typography>

      {payments.length === 0 && (
        <Typography color="text.secondary">
          Bạn chưa có giao dịch nào
        </Typography>
      )}

      <Stack spacing={2}>
        {payments.map(payment => {
          const booking =
            typeof payment.booking === 'string'
              ? null
              : payment.booking

          return (
            <Card key={payment._id} sx={{ p: 2 }}>
              <Stack spacing={1}>

                {/* Booking */}
                <Typography fontSize={14}>
                  Booking: {booking?._id}
                </Typography>

                {/* Services */}
                {booking?.services?.length ? (
                  <Typography fontSize={14}>
                    Dịch vụ:{' '}
                    {booking.services
                      .map(s => s.nameSnapshot)
                      .join(', ')}
                  </Typography>
                ) : null}

                {/* Amount */}
                <Typography fontSize={14}>
                  Số tiền:{' '}
                  <b>
                    {payment.amount.toLocaleString()} đ
                  </b>
                </Typography>

                {/* Method */}
                <Typography fontSize={14}>
                  Phương thức: {payment.method}
                </Typography>

                {/* Status */}
                <Box>
                  <Chip
                    label={
                      payment.status === 'success'
                        ? 'Thành công'
                        : payment.status === 'pending'
                        ? 'Đang xử lý'
                        : 'Thất bại'
                    }
                    color={
                      payment.status === 'success'
                        ? 'success'
                        : payment.status === 'pending'
                        ? 'warning'
                        : 'error'
                    }
                    size="small"
                  />
                </Box>
              </Stack>
            </Card>
          )
        })}
      </Stack>
    </Box>
  )
}

export default PaymentHistoryPage