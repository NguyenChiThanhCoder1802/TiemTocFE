import { useEffect, useState } from 'react';
import { StyledBox, Title, AddButton } from '../../styles/discount';
import DiscountList from '././components/Discount/DiscountList';
import DiscountFormDialog from '././components/Discount/DiscountFormDialog';
import {
  getAllDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} from '../../api/discountAPI';
import type { Discount, CreateDiscountDto } from '../../types/Discount';
import { useSnackbar } from 'notistack';
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
const DiscountManager = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [form, setForm] = useState<CreateDiscountDto>({
    code: '',
    percentage: 0,
    amount: 0,
    expiryDate: '',
    maxUsage: 0,
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { enqueueSnackbar } = useSnackbar();
   const { ConfirmDialogComponent, openConfirmDialog } = useConfirmDialog();
  useEffect(() => {
    fetchDiscounts();
  });

  const fetchDiscounts = async () => {
    try {
      const data = await getAllDiscounts();
      setDiscounts(data);
    } catch {
      enqueueSnackbar('Không thể tải danh sách mã giảm giá', { variant: 'error' });
    }
  };

  const handleSubmit = async () => {
    const dto = { ...form };
    try {
      if (isEditing && selectedId !== null) {
        await updateDiscount(selectedId, dto);
        enqueueSnackbar('Cập nhật mã giảm giá thành công', { variant: 'success' });
      } else {
        await createDiscount(dto);
        enqueueSnackbar('Thêm mã giảm giá thành công', { variant: 'success' });
      }
      fetchDiscounts();
      setDialogOpen(false);
    } catch {
      enqueueSnackbar('Không thể lưu mã giảm giá', { variant: 'error' });
    }
  };

  const handleDelete = (id: number) => {
    openConfirmDialog({
      title: "Xác nhận xoá",
      message: "Bạn có chắc chắn muốn xoá mã giảm giá này không?",
      onConfirm: async () => {
        try {
          await deleteDiscount(id);
          enqueueSnackbar("Xóa mã giảm giá thành công", { variant: "success" });
          fetchDiscounts();
        } catch {
          enqueueSnackbar("Không thể xoá mã giảm giá", { variant: "error" });
        }
      },
    });
  };

  const openEditDialog = (d: Discount) => {
    setForm({
      code: d.code,
      percentage: d.percentage,
      amount: d.amount ?? 0,
      expiryDate: d.expiryDate.slice(0, 10),
      maxUsage: d.maxUsage,
    });
    setEditing(true);
    setSelectedId(d.id);
    setDialogOpen(true);
  };

  return (
    <StyledBox>
      <Title>Quản lý mã giảm giá</Title>

      <AddButton
        variant="contained"
        onClick={() => {
          setForm({ code: '', percentage: 0, amount: 0, expiryDate: '', maxUsage: 0 });
          setEditing(false);
          setSelectedId(null);
          setDialogOpen(true);
        }}
      >
        Thêm mã
      </AddButton>

      <DiscountList discounts={discounts} onEdit={openEditDialog} onDelete={handleDelete} />

      <DiscountFormDialog
        open={isDialogOpen}
        form={form}
        isEditing={isEditing}
        onClose={() => setDialogOpen(false)}
        onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
        onSubmit={handleSubmit}
      />
      {ConfirmDialogComponent}
    </StyledBox>
  );
};

export default DiscountManager;
