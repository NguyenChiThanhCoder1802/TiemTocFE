import {
  Typography,
  Divider,
  Stack,
  Paper
} from '@mui/material'

interface Service {
  _id: string
  name: string
  price: number
  duration: number
}

interface Props {
  services: Service[]
  original: number
  afterServiceDiscount: number
  discountAmount: number
  final: number
  totalDuration: number
  endTime?: string | null
}

export default function BookingSummaryPanel({
  services,
  original,
  afterServiceDiscount,
  discountAmount,
  final,
  totalDuration,
  endTime
}: Props) {
  return (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Chi tiết đơn đặt
      </Typography>

      <Stack spacing={1}>
        {services.map(service => (
          <Stack
            key={service._id}
            direction="row"
            justifyContent="space-between"
          >
            <Typography>{service.name}</Typography>
            <Typography>
              {service.price.toLocaleString()}đ
            </Typography>
          </Stack>
        ))}
      </Stack>
        <Stack spacing={1}>
  
      <Divider sx={{ my: 2 }} />

      <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={600}>
            Tổng thời gian
          </Typography>
          <Typography fontWeight={600}>
            {totalDuration} phút
          </Typography>
        </Stack>

        {endTime && (
          <Stack direction="row" justifyContent="space-between">
            <Typography>
              Kết thúc dự kiến
            </Typography>
            <Typography>
              {new Date(endTime).toLocaleString()}
            </Typography>
          </Stack>
        )}
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Tổng giá gốc</Typography>
          <Typography>
            {original.toLocaleString()}đ
          </Typography>
        </Stack>
        {original > afterServiceDiscount && (
            <Stack direction="row" justifyContent="space-between">
              <Typography color="warning.main">
                Giảm dịch vụ
              </Typography>
              <Typography color="warning.main">
                -{(original - afterServiceDiscount).toLocaleString()}đ
              </Typography>
            </Stack>
          )}
        {discountAmount > 0 && (
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography color="primary">
              Giảm giá
            </Typography>
            <Typography color="primary">
              -{discountAmount.toLocaleString()}đ
            </Typography>
          </Stack>
        )}

        <Divider />

        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={700}>
            Tổng thanh toán
          </Typography>
          <Typography fontWeight={700} color="primary">
            {final.toLocaleString()}đ
          </Typography>
        </Stack>
        {(original - final) > 0 && (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="body2" color="primary">
      Tiết kiệm
    </Typography>
    <Typography color="primary">
      {(original - final).toLocaleString()}đ
    </Typography>
  </Stack>
)}
      </Stack>
    </Paper>
  )
}