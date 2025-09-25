import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Divider, Button } from '@mui/material';
import BookingSummary from './BookingSummary';

interface Props {
  services: { id: number; name: string; price: number }[];
  serviceIds: number[];
  comboList: { id: number; name: string; discountedPrice: number }[];
  selectedComboIds: number[];
  totalPrice: number;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export default function SelectedServicesSummary({
  services,
  serviceIds,
  comboList,
  selectedComboIds,
  totalPrice,
  isSubmitting,
  onSubmit
}: Props) {
  const hasSelection = serviceIds.length > 0 || selectedComboIds.length > 0;

  return (
    <Box flex="1" bgcolor="#fafafa" p={2} borderRadius={2} boxShadow={2}>
      {hasSelection ? (
        <>
          <Typography variant="h6" gutterBottom>Dịch vụ đã chọn</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Dịch vụ</TableCell>
                <TableCell align="right">Giá</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.filter(s => serviceIds.includes(s.id)).map(service => (
                <TableRow key={`s-${service.id}`}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell align="right">{service.price.toLocaleString()}đ</TableCell>
                </TableRow>
              ))}
              {comboList.filter(c => selectedComboIds.includes(c.id)).map(combo => (
                <TableRow key={`c-${combo.id}`}>
                  <TableCell>{combo.name}</TableCell>
                  <TableCell align="right">{combo.discountedPrice.toLocaleString()}đ</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider sx={{ my: 2 }} />
          <BookingSummary total={totalPrice} />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt lịch'}
            </Button>
          </Box>
        </>
      ) : (
        <Typography color="text.secondary">
          Vui lòng chọn dịch vụ hoặc combo để hiển thị tóm tắt
        </Typography>
      )}
    </Box>
  );
}
