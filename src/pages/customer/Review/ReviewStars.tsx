import { Rating } from "@mui/material";

interface Props {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export default function ReviewStars({
  value,
  onChange,
  readOnly = false,
}: Props) {
  return (
    <Rating
      value={value}
      precision={1}
      readOnly={readOnly}
      onChange={(_, newValue) => onChange?.(newValue || 0)}
    />
  );
}
