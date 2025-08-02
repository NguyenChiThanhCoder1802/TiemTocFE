import { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Button, Divider
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { fetchServices } from '../../api/apiService';
import { createBooking } from '../../services/bookingService';
import { getProfile } from '../../api/profileApi';
import { getCombos } from '../../api/comboAPI';
import BookingForm from '../../components/Booking/BookingForm';
import BookingSummary from '../../components/Booking/BookingSummary';
import ServiceSelector from '../../components/Booking/ServiceSelector';
import ComboSelector from '../../components/Booking/ComboSelector';
import type { Service } from '../../types/Service';
import type { ComboDto } from '../../types/Combo';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'temporaryBookingServices';

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    appointmentTime: '',
    note: '',
  });

  const [services, setServices] = useState<Service[]>([]);
  const [serviceIds, setServiceIds] = useState<number[]>([]);
  const [comboList, setComboList] = useState<ComboDto[]>([]);
  const [selectedComboIds, setSelectedComboIds] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load profile, services, and combos
  useEffect(() => {
    const loadData = async () => {
      try {
        const [profile, allServices, combos] = await Promise.all([
          getProfile(),
          fetchServices(),
          getCombos()
        ]);

        setServices(allServices);
        setComboList(combos);

        if (profile?.fullName) setForm(prev => ({ ...prev, customerName: profile.fullName || '' }));
        if (profile?.phoneNumber) setForm(prev => ({ ...prev, phone: profile.phoneNumber || '' }));

        const storedIds = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedIds) {
          const parsed = JSON.parse(storedIds) as number[];
          setServiceIds(parsed);
        }
      } catch {
        enqueueSnackbar('Lỗi khi tải dữ liệu', { variant: 'error' });
      }
    };

    loadData();
  }, [enqueueSnackbar]);

  // Tính tổng giá từ dịch vụ + combo
  useEffect(() => {
    if (id && !isNaN(Number(id))) {
    const selectedId = Number(id);
    setServiceIds([selectedId]);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([selectedId]));
  }
    const serviceTotal = services
      .filter((s) => serviceIds.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);

    const comboTotal = comboList
      .filter((c) => selectedComboIds.includes(c.id))
      .reduce((sum, c) => sum + c.discountedPrice, 0);

    setTotalPrice(serviceTotal + comboTotal);
  }, [serviceIds, selectedComboIds, services, comboList, id]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
    <Box maxWidth={800} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>
        Đặt lịch hẹn
      </Typography>

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
        onChange={(ids) => {
          setServiceIds(ids);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
        }}
      />

      <ComboSelector
        combos={comboList}
        selected={selectedComboIds}
        onChange={setSelectedComboIds}
      />

      {(serviceIds.length > 0 || selectedComboIds.length > 0) && (
        <>
          <Divider sx={{ my: 3 }} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sản phẩm đã chọn</TableCell>
                <TableCell align="right">Giá</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services
                .filter((s) => serviceIds.includes(s.id))
                .map((service) => (
                  <TableRow key={`s-${service.id}`}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell align="right">{service.price.toLocaleString()}đ</TableCell>
                  </TableRow>
                ))}

              {comboList
                .filter((c) => selectedComboIds.includes(c.id))
                .map((combo) => (
                  <TableRow key={`c-${combo.id}`}>
                    <TableCell>{combo.name}</TableCell>
                    <TableCell align="right">{combo.discountedPrice.toLocaleString()}đ</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <BookingSummary total={totalPrice} />

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt lịch'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BookingPage;
