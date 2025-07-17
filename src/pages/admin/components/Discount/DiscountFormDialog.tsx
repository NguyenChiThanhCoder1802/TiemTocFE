import {TextField, Dialog, DialogContent, DialogActions, Button
} from '@mui/material';
import { DialogTitleStyled, ActionButton } from '../../../../styles/discount';
import type { CreateDiscountDto } from '../../../../types/Discount';

interface Props {
  open: boolean;
  form: CreateDiscountDto;
  onClose: () => void;
  onChange: (field: keyof CreateDiscountDto, value: unknown) => void;
  onSubmit: () => void;
  isEditing: boolean;
}

const DiscountFormDialog = ({ open, form, onClose, onChange, onSubmit, isEditing }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleStyled>{isEditing ? 'Sửa mã giảm giá' : 'Thêm mã mới'}</DialogTitleStyled>
      <DialogContent>
        <TextField label="Mã" value={form.code} onChange={e => onChange('code', e.target.value)} fullWidth margin="normal" />
        <TextField
          label="Phần trăm giảm (%)"
          type="number"
          value={form.percentage}
          onChange={e => onChange('percentage', +e.target.value)}
          fullWidth
          margin="normal"
          disabled={(form.amount ?? 0) > 0}
        />
        <TextField
          label="Giảm số tiền (VND)"
          type="number"
          value={form.amount}
          onChange={e => onChange('amount', +e.target.value)}
          fullWidth
          margin="normal"
          disabled={(form.percentage ?? 0) > 0}
        />
        <TextField
          label="Hạn sử dụng"
          type="date"
          value={form.expiryDate}
          onChange={e => onChange('expiryDate', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Số lượt sử dụng tối đa"
          type="number"
          value={form.maxUsage}
          onChange={e => onChange('maxUsage', +e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <ActionButton variant="contained" onClick={onSubmit}>
          {isEditing ? 'Cập nhật' : 'Thêm mới'}
        </ActionButton>
      </DialogActions>
    </Dialog>
  );
};

export default DiscountFormDialog;
