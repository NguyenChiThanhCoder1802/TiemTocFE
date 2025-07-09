import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { getAllDiscounts } from '../services/discountService';
import type { Discount} from '../types/Discount';
import {
  StyledBox,
  Title,
  DiscountCard,
  DiscountBadge,
  DiscountDetails,
  DiscountCode,
  SaveButton,
} from '../styles/discount';

const DiscountListPage = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const data = await getAllDiscounts();
        setDiscounts(data);
      } catch {
        enqueueSnackbar('❌ Lỗi khi tải danh sách mã giảm giá', { variant: 'error' });
      }
    };
    fetchDiscounts();
  }, [enqueueSnackbar]);

  return (
    <StyledBox>
      <Title>Danh sách mã giảm giá</Title>

      {discounts.length === 0 ? (
        <Typography>Không có mã giảm giá nào.</Typography>
      ) : (
        discounts.map((discount) => (
          <DiscountCard key={discount.id}>
            <DiscountBadge className={discount.percentage >= 50 ? 'orange' : ''}>
              -{discount.percentage}%
            </DiscountBadge>

            <DiscountDetails>
              <Typography variant="body1">
                Mã: <DiscountCode>{discount.code}</DiscountCode>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hết hạn: {new Date(discount.expiryDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tối đa: {discount.maxUsage} lượt dùng
              </Typography>
            </DiscountDetails>

            <SaveButton onClick={() => navigator.clipboard.writeText(discount.code)}>
              Sao chép mã
              
            </SaveButton>
          </DiscountCard>
        ))
      )}
    </StyledBox>
  );
};

export default DiscountListPage;
