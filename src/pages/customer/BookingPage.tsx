import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { createBooking } from '../../services/bookingService';
import { useNavigate, useParams } from 'react-router-dom';
import BookingForm from '../../components/Booking/BookingForm';
import ServiceSelector from '../../components/Booking/ServiceSelector';
import ComboSelector from '../../components/Booking/ComboSelector';
import SelectedServicesSummary from '../../components/Booking/SelectedServicesSummary';
import { useBookingData } from '../../hooks/useBookingData';
import BackButton from '../../components/Common/BackButton';
import React from 'react';
const LOCAL_STORAGE_KEY = 'temporaryBookingServices';
export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { form, setForm, services, serviceIds, setServiceIds, comboList, selectedComboIds, setSelectedComboIds, totalPrice } = useBookingData(id);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.appointmentTime || (serviceIds.length === 0 && selectedComboIds.length === 0)) {
      enqueueSnackbar('Vui lòng chọn thời gian và ít nhất 1 dịch vụ hoặc combo', { variant: 'warning' });
      return;
    }

    setIsSubmitting(true);
    try {
      const booking = await createBooking({
        ...form,
        serviceIds,
        comboIds: selectedComboIds
      });

      enqueueSnackbar('Đặt lịch thành công', { variant: 'success' });
      setForm({ customerName: form.customerName, phone: form.phone, appointmentTime: '', note: '' });
      setServiceIds([]);
      setSelectedComboIds([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      navigate(`/booking/${booking.id}`);
    } catch {
      enqueueSnackbar('Lỗi khi đặt lịch', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box maxWidth={1200} mx="auto" mt={4}>
      <BackButton/>
      <Typography variant="h5" gutterBottom>Đặt lịch hẹn</Typography>
      <Box display="flex" gap={4} alignItems="flex-start">
        {/* Cột trái thông tin dịch vụ khách đặt */}
        <Box flex="1">
          <BookingForm {...form} onChange={handleChange} />
          <ServiceSelector
            services={services}
            selected={serviceIds}
            onChange={(ids) => {
              setServiceIds(ids);
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
            }}
          />
          <ComboSelector combos={comboList} selected={selectedComboIds} onChange={setSelectedComboIds} />
        </Box>

        {/* Cột phải - Tóm tắt */}
        <SelectedServicesSummary
          services={services}
          serviceIds={serviceIds}
          comboList={comboList}
          selectedComboIds={selectedComboIds}
          totalPrice={totalPrice}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
}
