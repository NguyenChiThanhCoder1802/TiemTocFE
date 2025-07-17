import {
  Dialog, DialogTitle, DialogContent, Box,
  TextField, MenuItem, Button
} from '@mui/material';
import type { Service } from '../../../../types/Service';
import type { CreateComboDto } from '../../../../types/Combo';

interface Props {
  open: boolean;
  form: CreateComboDto;
  services: Service[];
  onChange: (form: CreateComboDto) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const ComboFormDialog = ({ open, form, services, onChange, onClose, onSubmit }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Thêm Combo Mới</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Tên combo"
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Mô tả"
            value={form.description}
            onChange={(e) => onChange({ ...form, description: e.target.value })}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Giá khuyến mãi"
            type="number"
            value={form.discountedPrice}
            onChange={(e) =>
              onChange({ ...form, discountedPrice: parseInt(e.target.value) || 0 })
            }
            fullWidth
          />
          <TextField
            label="Ngày bắt đầu"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.startDate}
            onChange={(e) => onChange({ ...form, startDate: e.target.value })}
          />
          <TextField
            label="Ngày kết thúc"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.endDate}
            onChange={(e) => onChange({ ...form, endDate: e.target.value })}
          />
          <TextField
            label="Chọn dịch vụ"
            select
            SelectProps={{ multiple: true }}
            value={form.serviceIds}
            onChange={(e) => {
              const value = e.target.value;
              const selected = Array.isArray(value)
                ? value.map((v) => Number(v))
                : [];
              onChange({ ...form, serviceIds: selected });
            }}
            fullWidth
          >
            {services.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name} ({s.price.toLocaleString()}₫)
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={onSubmit}>Lưu combo</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ComboFormDialog;
