import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Button
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import ReplayIcon from '@mui/icons-material/Replay'

import dayjs from 'dayjs'
import type { Booking } from '../../../types/Booking/Booking'
import { useNavigate } from 'react-router-dom'

interface Props {
  booking: Booking
  showRetry?: boolean
}

export default function BookingDetailResult({
  booking,
  showRetry
}: Props) {
  const navigate = useNavigate()

  const customer =
    typeof booking.customer === 'string'
      ? null
      : booking.customer

  const staff =
    typeof booking.staff === 'string'
      ? null
      : booking.staff

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          {/* ===== HEADER ===== */}
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Thông tin đặt lịch
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mã booking: <b>{booking._id}</b>
            </Typography>
          </Box>

          <Divider />

          {/* ===== KHÁCH HÀNG ===== */}
          {customer && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Box>
                <Typography fontWeight={500}>
                  {customer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {customer.email}
                </Typography>
              </Box>
            </Stack>
          )}

          {/* ===== NHÂN VIÊN ===== */}
          {staff && (
            <>
              <Divider />
              <Stack direction="row" spacing={2} alignItems="center">

                <Box>
                  <Typography fontWeight={500}>
                    {staff?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nhân viên phục vụ
                  </Typography>
                </Box>
              </Stack>
            </>
          )}

          <Divider />

          {/* ===== DỊCH VỤ ===== */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <ContentCutIcon fontSize="small" />
              <Typography fontWeight={500}>Dịch vụ</Typography>
            </Stack>

            {booking.bookingType === 'service' &&
              booking.services.map((s, idx) => (
                <Typography key={idx} variant="body2">
                  • {s.nameSnapshot} – {s.priceAfterServiceDiscount?.toLocaleString()}₫
                </Typography>
              ))}

            {booking.bookingType === 'combo' && booking.combo && (
              <Typography variant="body2">
                • Combo: {booking.combo.name}
              </Typography>
            )}
          </Box>

          <Divider />

          {/* ===== THỜI GIAN ===== */}
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon fontSize="small" />
              <Typography>
                Bắt đầu:{' '}
                {dayjs(booking.startTime).format(
                  'HH:mm DD/MM/YYYY'
                )}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Kết thúc:{' '}
              {dayjs(booking.endTime).format(
                'HH:mm DD/MM/YYYY'
              )}
            </Typography>
          </Stack>

          <Divider />

          {/* ===== THANH TOÁN ===== */}
          <Stack spacing={0.5}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Giá gốc</Typography>
              <Typography>
                {booking.price.original.toLocaleString()}₫
              </Typography>
            </Stack>

            {booking.price.original >
              booking.price.afterServiceDiscount && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="warning.main">
                    Giảm dịch vụ
                  </Typography>
                  <Typography color="warning.main">
                    -{(
                      booking.price.original -
                      booking.price.afterServiceDiscount
                    ).toLocaleString()}₫
                  </Typography>
                </Stack>
              )}

            {booking.price.discountAmount > 0 && (
              <Stack direction="row" justifyContent="space-between">
                <Typography color="primary">
                  Giảm mã ({booking.discount?.code})
                </Typography>
                <Typography color="primary">
                  -{booking.price.discountAmount.toLocaleString()}₫
                </Typography>
              </Stack>
            )}

            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={700}>
                Thanh toán
              </Typography>
              <Typography fontWeight={700} color="primary">
                {booking.price.final.toLocaleString()}₫
              </Typography>
            </Stack>
          </Stack>
          {/* ===== ACTIONS ===== */}
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="outlined"
              onClick={() => navigate('/customer/bookinghistory')}
            >
              Xem trạng thái đặt lịch
            </Button>

            {showRetry && (
              <Button
                variant="contained"
                color="warning"
                startIcon={<ReplayIcon />}
                onClick={() =>
                  navigate(`/booking/${booking._id}/pay`)
                }
              >
                Thanh toán lại
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
