import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Divider,
  Stack,
  Typography
} from '@mui/material'

import type { User } from '../../types/Auth/User'
import type { Staff } from '../../types/Staff/Staff'
import type { Service } from '../../types/HairService/Service'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  loading?: boolean

  user: User
  staff?: Staff | null
  services: Service[]
  startTime: string
  paymentMethod: 'cash' | 'vnpay' | 'momo'
  totalDuration: number
  endTime?: string | null
  originalAmount: number
  afterServiceDiscount: number
  discountAmount: number
  finalAmount: number
  discountCode?: string | null
}

export default function BookingReviewDialog({
  open,
  onClose,
  onConfirm,
  loading = false,
  user,
  staff,
  services,
  startTime,
  paymentMethod,
  totalDuration,
  endTime,
  originalAmount,
  afterServiceDiscount,
  discountAmount,
  finalAmount,
  discountCode
}: Props) {
  if (!user || services.length === 0) return null

  

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Xác nhận thông tin</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={1.5}>
          <Typography>
             <b>Khách hàng:</b> {user.name} ({user.email})
          </Typography>

          <Typography>
             <b>Nhân viên:</b>{' '}
            {staff
              ? `${staff.user.name} – ${staff.position}`
              : 'Hệ thống tự sắp xếp'}
          </Typography>

          <Divider />

          <Typography fontWeight={600}>
             Dịch vụ đã chọn:
          </Typography>

          {services.map(s => (
            <Box key={s._id} ml={2}>
              <Typography>
                • {s.name} – {s.duration} phút
              </Typography>
              <Typography>
                Giá: {s.finalPrice.toLocaleString()}đ
              </Typography>
            </Box>
          ))}

          <Divider />

          <Typography>
             <b>Bắt đầu:</b>{' '}
            {new Date(startTime).toLocaleString()}
          </Typography>
          <Typography>
               <b>Tổng thời gian:</b> {totalDuration} phút
            </Typography>

            {endTime && (
              <Typography>
                 <b>Kết thúc dự kiến:</b>{' '}
                {new Date(endTime).toLocaleString()}
              </Typography>
            )}
            <Divider sx={{ my: 1 }} />
          <Typography>
             <b>Thanh toán:</b>{' '}
            {paymentMethod === 'cash' && 'Tại tiệm'}
            {paymentMethod === 'vnpay' && 'VNPay'}
            {paymentMethod === 'momo' && 'MoMo'}
            {paymentMethod === 'vnpay' && (
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'warning',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'warning.main'
                }}
              >
                <Typography fontWeight={600}>
                  ⚠️ Bạn chưa bị trừ tiền ở bước này
                </Typography>
                <Typography variant="body2">
                  Sau khi xác nhận, bạn sẽ được chuyển đến cổng thanh toán VNPay
                  để hoàn tất giao dịch.
                </Typography>
              </Box>
            )}
          </Typography>

         <Divider sx={{ my: 1 }} />

          <Stack spacing={0.5}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Giá gốc</Typography>
              <Typography>
                {originalAmount.toLocaleString()}đ
              </Typography>
            </Stack>
            {originalAmount > afterServiceDiscount && (
            <Stack direction="row" justifyContent="space-between">
              <Typography color="warning.main">
                Giảm dịch vụ
              </Typography>
              <Typography color="warning.main">
                -{(originalAmount - afterServiceDiscount).toLocaleString()}đ
              </Typography>
            </Stack>
          )}
            {discountAmount > 0 && (
              <>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="primary">
                    Giảm giá {discountCode && `(${discountCode})`}
                  </Typography>
                  <Typography color="primary">
                    -{discountAmount.toLocaleString()}đ
                  </Typography>
                </Stack>

               
              </>
            )}

            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={700}>
                Tổng thanh toán
              </Typography>
              <Typography fontWeight={700} color="primary">
                {finalAmount.toLocaleString()}đ
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Huỷ
        </Button>

        <Button
            variant="contained"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? 'Đang xử lý...'
              : paymentMethod === 'vnpay'
                ? 'Thực hiện thanh toán'
                : 'Xác nhận đặt lịch'}
          </Button>
      </DialogActions>
    </Dialog>
  )
}