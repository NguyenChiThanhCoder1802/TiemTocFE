import { useState, useEffect } from 'react';
import { Typography, Alert, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { fetchServices } from '../../api/apiService';
import { createBooking } from '../../services/bookingService';
import { LoginWrapper, LoginContainer, AvatarCircle } from '../../styles/LoginStyles';
import ServiceSelector from '../../components/Booking/ServiceSelector';
import BookingForm from '../../components/Booking/BookingForm';
import BookingSummary from '../../components/Booking/BookingSummary';
import type { Service } from '../../types/Service';
import { useSnackbar } from 'notistack';
const BookingPage = () => {
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    appointmentTime: '',
    note: '',
  });
  const [services, setServices] = useState<Service[]>([]);
  const [serviceIds, setServiceIds] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchServices().then(setServices).catch(console.error);
  }, []);

  useEffect(() => {
    const total = services
      .filter((s) => serviceIds.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);
    setTotalPrice(total);
  }, [serviceIds, services]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createBooking({
        ...form,
        serviceIds,
      });
      enqueueSnackbar('Đặt lịch thành công!', { variant: 'success', autoHideDuration: 1000 });
      setForm({ customerName: '', phone: '', appointmentTime: '', note: '' });
      setServiceIds([]);
    } catch {
      setMessage('❌ Lỗi khi đặt lịch');
    }
  };

  return (
    <LoginWrapper sx={{ py: 6 }}>
      <LoginContainer elevation={6}>
        <AvatarCircle>
          <CalendarMonthIcon fontSize="large" color="primary" />
        </AvatarCircle>
        <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
          Đặt lịch hẹn
        </Typography>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <BookingForm
            customerName={form.customerName}
            phone={form.phone}
            appointmentTime={form.appointmentTime}
            note={form.note}
            onChange={handleChange}
          />
          <ServiceSelector
            services={services}
            selected={serviceIds}
            onChange={setServiceIds}
          />
          <BookingSummary total={totalPrice} />
         <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, borderRadius: 2 }}
            >
              Xác nhận đặt lịch
            </Button>
        </form>
        {message && (
          <Alert
            severity={message.includes('✅') ? 'success' : 'error'}
            sx={{ mt: 2 }}
          >
            {message}
          </Alert>
        )}
      </LoginContainer>
    </LoginWrapper>
  );
};

export default BookingPage;
