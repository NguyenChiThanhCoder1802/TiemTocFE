import { TextField} from '@mui/material';

interface Props {
  customerName: string;
  phone: string;
  appointmentTime: string;
  note: string;
  onChange: (field: string, value: string) => void;
}

const BookingForm = ({
  customerName,
  phone,
  appointmentTime,
  note,
  onChange,
}: Props) => (
  <>
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
      InputLabelProps={{ shrink: true }}
      required
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
  </>
);

export default BookingForm;
