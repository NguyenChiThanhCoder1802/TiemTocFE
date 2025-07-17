import { Box, TextField, Button } from '@mui/material';

interface Props {
  code: string;
  error: string;
  onChange: (value: string) => void;
  onApply: () => void;
}

const DiscountSection = ({ code, error, onChange, onApply }: Props) => (
  <Box mt={3} display="flex" gap={2} alignItems="center">
    <TextField
      label="Mã giảm giá"
      variant="outlined"
      size="small"
      value={code}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error}
    />
    <Button variant="outlined" onClick={onApply}>Áp dụng</Button>
  </Box>
);

export default DiscountSection;
