import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider
} from '@mui/material'
import { getMyPayments } from '../../../api/PaymentAPI'
import type { Payment } from '../../../types/Payment/Payment'

const methodLabelMap = {
  vnpay: 'VNPay',
  momo: 'MoMo',
  cash: 'Tiền mặt'
}

const statusLabelMap = {
  pending: 'Đang xử lý',
  success: 'Thành công',
  failed: 'Thất bại'
}

const statusColorMap = {
  pending: 'warning',
  success: 'success',
  failed: 'error'
} as const

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getMyPayments()
        setPayments(data)
      } catch (error) {
        console.error('Lỗi lấy payment:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  if (loading) return <Typography>Đang tải...</Typography>

  if (!payments.length)
    return <Typography>Chưa có lịch sử thanh toán</Typography>

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Lịch sử thanh toán
      </Typography>

      <Stack spacing={3}>
        {payments.map((payment) => {
          const booking =
            typeof payment.booking === 'object'
              ? payment.booking
              : null

          const serviceNames =
            booking?.services?.map(
              (s: any) => s.nameSnapshot
            ) || []

          return (
            <Card
              key={payment._id}
              sx={{ borderRadius: 3 }}
            >
              <CardContent>
                <Stack spacing={1}>
                  {/* Service name */}
                  <Typography fontWeight={600}>
                    Dịch vụ:{' '}
                    {serviceNames.length
                      ? serviceNames.join(', ')
                      : 'Không có'}
                  </Typography>

                  <Divider />

                  <Typography>
                    Phương thức:{' '}
                    {methodLabelMap[payment.method]}
                  </Typography>

                  <Typography>
                    Số tiền:{' '}
                    {payment.amount.toLocaleString(
                      'vi-VN'
                    )}
                    đ
                  </Typography>

                  <Typography>
                    Ngân hàng:{' '}
                    {payment.bankCode ?? '—'}
                  </Typography>

                  <Typography>
                    Thanh toán lúc:{' '}
                    {payment.paidAt
                      ? new Date(
                          payment.paidAt
                        ).toLocaleString('vi-VN')
                      : '—'}
                  </Typography>

                  <Chip
                    label={statusLabelMap[payment.status]}
                    color={
                      statusColorMap[payment.status]
                    }
                    size="small"
                    sx={{ width: 'fit-content' }}
                  />
                </Stack>
              </CardContent>
            </Card>
          )
        })}
      </Stack>
    </Box>
  )
}