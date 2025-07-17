import { useEffect,useState } from 'react';
import { StyledBox, Title, AddButton } from '../../styles/discount';
import DiscountList from '././components/Discount/DiscountList';
import DiscountFormDialog from '././components/Discount/DiscountFormDialog';
import {
  getAllDiscounts, createDiscount, updateDiscount, deleteDiscount
} from '../../services/discountService';
import type { Discount, CreateDiscountDto } from '../../types/Discount';

const DiscountManager = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [form, setForm] = useState<CreateDiscountDto>({
    code: '', percentage: 0, amount: 0, expiryDate: '', maxUsage: 0
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
    useEffect(() => {
      fetchDiscounts();
    }, []);
  const fetchDiscounts = async () => {
    const data = await getAllDiscounts();
    setDiscounts(data);
  };

  const handleSubmit = async () => {
    const dto = { ...form };
    if (isEditing && selectedId !== null) {
      await updateDiscount(selectedId, dto);
    } else {
      await createDiscount(dto);
    }
    fetchDiscounts();
    setDialogOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xoá mã này?')) return;
    await deleteDiscount(id);
    fetchDiscounts();
  };

  const openEditDialog = (d: Discount) => {
    setForm({
      code: d.code,
      percentage: d.percentage,
      amount: d.amount ?? 0,
      expiryDate: d.expiryDate.slice(0, 10),
      maxUsage: d.maxUsage
    });
    setEditing(true);
    setSelectedId(d.id);
    setDialogOpen(true);
  };

  return (
    <StyledBox>
      <Title>Quản lý mã giảm giá</Title>
      <AddButton variant="contained" onClick={() => {
        setForm({ code: '', percentage: 0, amount: 0, expiryDate: '', maxUsage: 0 });
        setEditing(false);
        setSelectedId(null);
        setDialogOpen(true);
      }}>
        Thêm mã
      </AddButton>

      <DiscountList discounts={discounts} onEdit={openEditDialog} onDelete={handleDelete} />

      <DiscountFormDialog
        open={isDialogOpen}
        form={form}
        isEditing={isEditing}
        onClose={() => setDialogOpen(false)}
        onChange={(field, value) => setForm(prev => ({ ...prev, [field]: value }))}
        onSubmit={handleSubmit}
      />
    </StyledBox>
  );
};

export default DiscountManager;
