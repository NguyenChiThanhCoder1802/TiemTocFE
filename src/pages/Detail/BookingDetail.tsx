import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookingById } from "../../services/bookingService";
import type { BookingDetailDto } from "../../types/Booking";
import { Box, Typography, Paper, CircularProgress, Button, Divider, List, ListItem, ListItemText, Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BookingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<BookingDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        if (!id) throw new Error("Không tìm thấy ID");
        const data = await fetchBookingById(Number(id));
        setBooking(data);
      } catch (err: unknown) {
        if (
          typeof err === "object" &&
          err !== null &&
          "message" in err &&
          typeof (err as { message?: unknown }).message === "string"
        ) {
          setError((err as { message: string }).message);
        } else {
          setError("Đã xảy ra lỗi không xác định");
        }

      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [id]);

  const formatDateTime = (date: string) => {
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  };

  const handleBack = () => navigate(-1);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box maxWidth="600px" mx="auto" mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  if (!booking)
    return (
      <Box maxWidth="600px" mx="auto" mt={4}>
        <Typography>Không tìm thấy lịch đặt.</Typography>
      </Box>
    );

  return (
    <Box maxWidth="700px" mx="auto" mt={5} px={2}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          📝 Chi tiết lịch đặt #{booking.id}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography><strong>👤 Khách hàng:</strong> {booking.customerName}</Typography>
        <Typography><strong>📞 Số điện thoại:</strong> {booking.phone}</Typography>
        <Typography><strong>🕒 Thời gian hẹn:</strong> {formatDateTime(booking.appointmentTime)}</Typography>
        <Typography><strong>📌 Trạng thái:</strong> {booking.status}</Typography>
        <Typography><strong>📝 Ghi chú:</strong> {booking.note || "(Không có)"}</Typography>
        <Typography><strong>👤 Người dùng hệ thống:</strong> {booking.userName}</Typography>

        <Typography variant="h6" mt={3} mb={1}>📋 Dịch vụ đã chọn:</Typography>
        <List dense>
          {booking.services.map((s) => (
            <ListItem key={s.id} sx={{ pl: 0 }}>
              <ListItemText
                primary={`${s.name} — ${s.price.toLocaleString()} VND`}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" color="error">
          💵 Tổng tiền: {booking.total.toLocaleString()} VND
        </Typography>

        <Box mt={3}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Quay lại
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookingDetail;
