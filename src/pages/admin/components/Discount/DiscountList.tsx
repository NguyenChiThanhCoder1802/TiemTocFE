import DiscountItem from '../Discount/DiscountItem';
import type { Discount } from '../../../../types/Discount';

interface Props {
  discounts: Discount[];
  onEdit: (d: Discount) => void;
  onDelete: (id: number) => void;
}

const DiscountList = ({ discounts, onEdit, onDelete }: Props) => {
  return (
    <>
      {discounts.map(d => (
        <DiscountItem key={d.id} discount={d} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </>
  );
};

export default DiscountList;
