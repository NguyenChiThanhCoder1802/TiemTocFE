import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  Box,
  Button,
  Stack
} from "@mui/material"

import type { AdminBooking } from "../../../types/Booking/AdminBooking"

import {
  approveBookingApi,
  cancelBookingApi,
  completeBookingApi
} from "../../../api/AdminAPI"

interface Props {
  booking: AdminBooking | null
  onClose: () => void
  onUpdated: () => void
}

export default function BookingDetailDialog({
  booking,
  onClose,
  onUpdated
}: Props) {
  if (!booking) return null

  const handleApprove = async () => {
    await approveBookingApi(booking._id)
    onClose()
    onUpdated()
  }

  const handleCancel = async () => {
    await cancelBookingApi(booking._id, "Admin huỷ")
    onClose()
    onUpdated()
  }

  const handleComplete = async () => {
    await completeBookingApi(booking._id)
    onClose()
    onUpdated()
  }

  return (
    <Dialog
      open={!!booking}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Chi tiết booking</DialogTitle>

      <DialogContent dividers>

        {/* ===== BASIC INFO ===== */}
        <Stack spacing={1}>
          <Typography><b>ID:</b> {booking._id}</Typography>
          <Typography><b>Khách hàng:</b> {booking.customer?.name}</Typography>
          <Typography><b>Email:</b> {booking.customer?.email}</Typography>
          <Typography><b>Nhân viên:</b> {booking.staff?.user?.name ?? "Chưa gán"}</Typography>
          <Typography><b>Loại:</b> {booking.bookingType}</Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* ===== SERVICES ===== */}
        <Typography fontWeight={600}>Dịch vụ</Typography>

        {booking.services.map((s, index) => (
          <Box
            key={index}
            mt={1}
            p={2}
            border="1px solid #eee"
            borderRadius={2}
          >
            <Typography><b>Tên:</b> {s.nameSnapshot}</Typography>
            <Typography>
              <b>Giá gốc:</b>{" "}
              {s.originalPriceSnapshot?.toLocaleString() ?? 0}đ
            </Typography>
            <Typography>
              <b>Giảm %:</b> {s.serviceDiscountPercent ?? 0}%
            </Typography>
            <Typography>
              <b>Sau giảm:</b>{" "}
              {s.priceAfterServiceDiscount?.toLocaleString() ?? 0}đ
            </Typography>
            <Typography>
              <b>Thời lượng:</b> {s.durationSnapshot ?? 0} phút
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* ===== TIME INFO ===== */}
        <Typography>
          <b>Bắt đầu:</b>{" "}
          {new Date(booking.startTime).toLocaleString()}
        </Typography>

        <Typography>
          <b>Kết thúc:</b>{" "}
          {booking.endTime
            ? new Date(booking.endTime).toLocaleString()
            : "-"}
        </Typography>

        <Typography>
          <b>Thời lượng:</b> {booking.duration} phút
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* ===== PRICE ===== */}
        <Typography fontWeight={600}>Giá</Typography>

        <Typography>
          Giá gốc:{" "}
          {booking.price?.original?.toLocaleString() ?? 0}đ
        </Typography>

        <Typography>
          Sau giảm dịch vụ:{" "}
          {booking.price?.afterServiceDiscount?.toLocaleString() ?? 0}đ
        </Typography>

        <Typography>
          Giảm thêm:{" "}
          {booking.price?.discountAmount?.toLocaleString() ?? 0}đ
        </Typography>

        <Typography fontWeight={600}>
          Thanh toán cuối:{" "}
          {booking.price?.final?.toLocaleString() ?? 0}đ
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* ===== STATUS ===== */}
        <Stack spacing={1}>
          <Typography>
            <b>Trạng thái thanh toán:</b> {booking.paymentStatus}
          </Typography>

          <Typography>
            <b>Trạng thái booking:</b> {booking.status}
          </Typography>

          <Typography>
            <b>Ngày tạo:</b>{" "}
            {booking.createdAt
              ? new Date(booking.createdAt).toLocaleString()
              : "-"}
          </Typography>
        </Stack>

      </DialogContent>

      {/* ===== ACTIONS ===== */}
      <DialogActions>

        {booking.status === "pending" && (
          <>
            <Button
              variant="contained"
              onClick={handleApprove}
            >
              Duyệt
            </Button>

            <Button
              color="error"
              variant="outlined"
              onClick={handleCancel}
            >
              Huỷ
            </Button>
          </>
        )}

        {booking.status === "confirmed" && (
          <Button
            color="success"
            variant="contained"
            onClick={handleComplete}
          >
            Hoàn thành
          </Button>
        )}

        <Button onClick={onClose}>
          Đóng
        </Button>

      </DialogActions>
    </Dialog>
  )
}