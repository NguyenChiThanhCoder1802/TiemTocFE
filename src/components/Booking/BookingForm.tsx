import { TextField, Box } from '@mui/material';

interface Props {
  customerName: string;
  phone: string;
  appointmentTime: string;
  note: string;
  onChange: (field: string, value: string) => void;
}

const BookingForm = ({ customerName, phone, appointmentTime, note, onChange }: Props) => {
  const getMinDateTime = () => {
    const now = new Date();
    now.setSeconds(0, 0); // Loại bỏ giây và mili giây
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  };

  return (
    <Box component="form" noValidate>
      <TextField
        label="Họ tên"
        value={customerName}
        onChange={(e) => onChange('customerName', e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Số điện thoại"
        value={phone}
        onChange={(e) => onChange('phone', e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Thời gian hẹn"
        type="datetime-local"
        value={appointmentTime}
        onChange={(e) => onChange('appointmentTime', e.target.value)}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: getMinDateTime() }}
      />
      <TextField
        label="Ghi chú"
        value={note}
        onChange={(e) => onChange('note', e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={3}
        placeholder="VD: Muốn chọn stylist A..."
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
};

export default BookingForm;
