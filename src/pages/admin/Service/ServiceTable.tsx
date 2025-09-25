import {
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Button, Typography, Paper, TableContainer
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Service } from '../../../types/Service';
import type { Category } from '../../../types/Category';

interface Props {
  services: Service[];
  categories: Category[];
  onEdit: (s: Service) => void;
  onDelete: (id: number) => void;
}

const ServiceTable = ({
  services,
  categories,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Thời lượng</TableCell>
            <TableCell>Mô tả</TableCell>
            <TableCell>Ảnh</TableCell>
            <TableCell>Danh mục</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service) => {
            const category = categories.find(c => c.id === service.categoryId);
            return (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.price.toLocaleString()} VNĐ</TableCell>
                <TableCell>{service.durationInMinutes} phút</TableCell>
                <TableCell>
                  {service.description || (
                    <Typography variant="body2" color="text.secondary">
                      Không có mô tả
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {service.imageUrl ? (
                    <img
                      src={service.imageUrl}
                      alt="preview"
                      width="60"
                      style={{ borderRadius: 8 }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Không có ảnh
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{category?.name || 'Không rõ'}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onEdit(service)}
                    sx={{ mr: 1 }}
                  >
                    Sửa
                  </Button>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(service.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          {services.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="body1" color="text.secondary">
                  Không có dịch vụ nào.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServiceTable;
