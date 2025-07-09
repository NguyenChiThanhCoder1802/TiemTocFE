import { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Alert,
  InputLabel,
  FormControl,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  MenuItem,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { fetchServices } from '../../api/apiService';
import {
  LoginWrapper,
  LoginContainer,
  AvatarCircle,
} from '../../styles/LoginStyles';

interface Service {
  id: number;
  name: string;
  price: number;
  duration: string;
}

const BookingPage = () => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [note, setNote] = useState('');
  const [serviceIds, setServiceIds] = useState<number[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');

  // Fetch danh sách dịch vụ
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        console.error('Lỗi khi tải dịch vụ:', err);
      }
    };
    load();
  }, []);

  // Tính tổng tiền mỗi khi dịch vụ thay đổi
  useEffect(() => {
    const total = services
      .filter((s) => serviceIds.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);
    setTotalPrice(total);
  }, [serviceIds, services]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerName,
          phone,
          appointmentTime,
          note,
          serviceIds,
        }),
      });

      if (!res.ok) throw new Error('Đặt lịch không thành công');

      setMessage('✅ Đặt lịch thành công!');
      setCustomerName('');
      setPhone('');
      setAppointmentTime('');
      setNote('');
      setServiceIds([]);
    } catch (err) {
      console.error(err);
      setMessage('❌ Lỗi khi đặt lịch');
    }
  };

  const formatDuration = (durationStr: string) => {
    const [hh, mm] = durationStr.split(':');
    return `${parseInt(hh) * 60 + parseInt(mm)} phút`;
  };

  return (
    <LoginWrapper sx={{ py: 6 }}>
      <LoginContainer elevation={6} >
        <AvatarCircle>
          <CalendarMonthIcon fontSize="large" color="primary" />
        </AvatarCircle>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Đặt lịch hẹn
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Họ tên"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Thời gian hẹn"
            type="datetime-local"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Ghi chú"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Dịch vụ</InputLabel>
            <Select
              multiple
              value={serviceIds}
              onChange={(e) => setServiceIds(e.target.value as number[])}
              input={<OutlinedInput label="Dịch vụ" />}
              renderValue={(selected) =>
                services
                  .filter((s) => selected.includes(s.id))
                  .map((s) => s.name)
                  .join(', ')
              }
            >
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  <Checkbox checked={serviceIds.includes(service.id)} />
                  <ListItemText
                    primary={`${service.name} - ${service.price.toLocaleString()}đ`}
                    secondary={`Thời gian: ${formatDuration(service.duration)}`}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Tổng tiền hiển thị tại đây */}
          <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
            Tổng tiền: {totalPrice.toLocaleString()}đ
          </Typography>

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
