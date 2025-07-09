import { useEffect, useState } from 'react';
import {
  TextField, Button, Dialog, DialogContent, DialogActions, IconButton
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import dayjs from 'dayjs';
import {
  StyledBox, Title, AddButton, DiscountCard, DiscountBadge,
  DiscountDetails, DiscountCode, SaveButton, DialogTitleStyled, ActionButton
} from '../../styles/discount';
import {
  getAllDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount
} from '../../services/discountService';
import type { Discount, CreateDiscountDto } from '../../types/Discount';

const DiscountManager = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [form, setForm] = useState<CreateDiscountDto>({
    code: '',
    percentage: 0,
    expiryDate: '',
    maxUsage: 0
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDiscounts = async () => {
    try {
      const data = await getAllDiscounts();
      setDiscounts(data);
    } catch (err) {
      console.error(err);
      alert('Không thể tải danh sách mã giảm giá! Có thể đã hết hạn đăng nhập.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSend: CreateDiscountDto = {
        code: form.code,
        percentage: form.percentage,
        expiryDate: form.expiryDate,
        maxUsage: form.maxUsage
      };
      if (isEditing && selectedId !== null) {
        await updateDiscount(selectedId, dataToSend);
      } else {
        await createDiscount(dataToSend);
      }
      fetchDiscounts();
      setDialogOpen(false);
      setForm({ code: '', percentage: 0, expiryDate: '',maxUsage: 0 });
      setSelectedId(null);
    } catch (error) {
      console.error(error);
      alert('Không thể lưu mã giảm giá');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xoá mã giảm giá này?')) return;
    try {
      await deleteDiscount(id);
      fetchDiscounts();
    } catch (error) {
      console.error(error);
      alert('Không thể xoá mã giảm giá');
    }
  };

  const openEditDialog = (discount: Discount) => {
    setForm({
      code: discount.code,
      percentage: discount.percentage,
      expiryDate: discount.expiryDate.slice(0, 10),
      maxUsage: discount.maxUsage
    });
    setEditing(true);
    setSelectedId(discount.id);
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setForm({ code: '', percentage: 0, expiryDate: '',maxUsage: 0 });
    setEditing(false);
    setSelectedId(null);
    setDialogOpen(true);
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <StyledBox>
      <Title>Quản lý mã giảm giá</Title>
      <AddButton variant="contained" onClick={openCreateDialog}>Thêm mã</AddButton>

      {discounts.map(d => (
        <DiscountCard key={d.id}>
          <DiscountBadge className={d.percentage === 40 ? 'orange' : ''}>
            {d.percentage}%GIẢM
          </DiscountBadge>
          <DiscountDetails>
            Đơn tối thiểu {d.percentage >= 50 ? '50k' : '1.2tr'}<br />
            Hiệu lực đến {dayjs(d.expiryDate).format('DD-MM-YYYY')}
            Lượt dùng tối đa: {d.maxUsage}
          </DiscountDetails>
          <DiscountCode>Mã: {d.code}</DiscountCode>
          <div>
            <IconButton onClick={() => openEditDialog(d)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(d.id)} color="error">
              <Delete />
            </IconButton>
            <SaveButton onClick={() => { }}>Lưu</SaveButton>
          </div>
        </DiscountCard>
      ))}

      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitleStyled>{isEditing ? 'Sửa mã giảm giá' : 'Thêm mã mới'}</DialogTitleStyled>
        <DialogContent>
          <TextField
            label="Mã"
            value={form.code}
            onChange={e => setForm({ ...form, code: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phần trăm giảm (%)"
            type="number"
            value={form.percentage}
            onChange={e => setForm({ ...form, percentage: +e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Hạn sử dụng"
            type="date"
            value={form.expiryDate}
            onChange={e => setForm({ ...form, expiryDate: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Số lượt sử dụng tối đa"
            type="number"
            value={form.maxUsage}
            onChange={e => setForm({ ...form, maxUsage: +e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Hủy</Button>
          <ActionButton variant="contained" onClick={handleSubmit}>
            {isEditing ? 'Cập nhật' : 'Thêm mới'}
          </ActionButton>
        </DialogActions>
      </Dialog>
    </StyledBox>
  );
};

export default DiscountManager;
