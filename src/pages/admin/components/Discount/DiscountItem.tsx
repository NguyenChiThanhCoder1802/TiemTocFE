import { IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import dayjs from 'dayjs';
import { DiscountBadge, DiscountCard, DiscountCode, DiscountDetails, SaveButton } from '../../../../styles/discount';
import type { Discount } from '../../../../types/Discount';

interface Props {
  discount: Discount;
  onEdit: (d: Discount) => void;
  onDelete: (id: number) => void;
}

const DiscountItem = ({ discount: d, onEdit, onDelete }: Props) => {
  const getBadgeText = () =>
    d.amount ?? 0 > 0
      ? `GIẢM ${Math.round(d.amount ?? 0 / 1000)}K`
      : `${d.percentage}%GIẢM`;

  return (
    <DiscountCard>
      <DiscountBadge className={d.percentage === 40 || d.amount === 50000 ? 'orange' : ''}>
        {getBadgeText()}
      </DiscountBadge>
      <DiscountDetails>
        Đơn tối thiểu {d.percentage >= 50 ? '50k' : '1.2tr'}<br />
        Hiệu lực đến {dayjs(d.expiryDate).format('DD-MM-YYYY')}<br />
        Lượt dùng tối đa: {d.maxUsage}
      </DiscountDetails>
      <DiscountCode>Mã: {d.code}</DiscountCode>
      <div>
        <IconButton onClick={() => onEdit(d)} color="primary"><Edit /></IconButton>
        <IconButton onClick={() => onDelete(d.id)} color="error"><Delete /></IconButton>
        <SaveButton onClick={() => { }}>Lưu</SaveButton>
      </div>
    </DiscountCard>
  );
};

export default DiscountItem;
