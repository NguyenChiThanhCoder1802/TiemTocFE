import { Box, Divider, Stack, Typography } from '@mui/material'
import type { User } from '../../types/Auth/User'
import type { Staff } from '../../types/Staff/Staff'
import type { Service } from '../../types/HairService/Service'

interface Props {
  user: User
  staff?: Staff | null
  service?: Service
  startTime: string
  paymentMethod: 'cash' | 'vnpay' | 'momo'
}

export default function BookingReview({
  user,
  staff,
  service,
  startTime,paymentMethod
}: Props) {
  console.log({ user, staff, service, startTime })
  if (!user || !service) {
    return (
      <Typography color="error">
        ❌ Thiếu thông tin để xác nhận booking
      </Typography>
    )
  }

  return (
    <Box p={3} border="1px solid #eee" borderRadius={2}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        3. Xác nhận thông tin
      </Typography>

      <Stack spacing={1.2}>
        <Typography>
          👤 <b>Khách hàng:</b> {user.name} ({user.email})
        </Typography>

        <Typography>
          💇 <b>Nhân viên:</b>{' '}
          {staff
            ? `${staff.user.name} – ${staff.position}`
            : 'Hệ thống tự sắp xếp'}
        </Typography>

        <Divider />

        <Typography>
          💅 <b>Dịch vụ:</b> {service.name}
        </Typography>

        <Typography>
          📂 <b>Danh mục:</b>{' '}
          {typeof service.category === 'string'
            ? service.category
            : service.category.name}
        </Typography>

        <Typography>
          ⏱️ <b>Thời lượng:</b> {service.duration} phút
        </Typography>

        <Typography>
          💰 <b>Giá:</b>{' '}
          <s>{service.price.toLocaleString()}đ</s>{' '}
          <b>{service.finalPrice.toLocaleString()}đ</b>
        </Typography>

        <Typography>
          📅 <b>Thời gian:</b> {new Date(startTime).toLocaleString()}
        </Typography>
        <Typography>
          💳 <b>Phương thức thanh toán:</b>{' '}
          {paymentMethod === 'cash' && 'Thanh toán tại tiệm'}
          {paymentMethod === 'vnpay' && 'VNPay'}
          {paymentMethod === 'momo' && 'MoMo'}
        </Typography>

      </Stack>
    </Box>
  )
}
