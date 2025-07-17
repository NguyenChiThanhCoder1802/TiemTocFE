import { useEffect, useState } from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Typography, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, Chip, Stack
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { getAllUsers, lockUser, unlockUser, assignRole } from '../../services/UserService';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
interface User {
  id: string;
  email: string;
  fullName: string;
  emailConfirmed: boolean;
  lockoutEnd: string | null;
  role: string; 
}

const UserManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [actionType, setActionType] = useState<'lock' | 'unlock' | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMsg, setSnackbarMsg] = useState('');

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error('Lỗi lấy danh sách người dùng:', err);
    }
  };

  const handleConfirm = async () => {
    if (!selectedUser || !actionType) return;

    try {
      if (actionType === 'lock') await lockUser(selectedUser.id);     // ✅ dùng user.id
      else if (actionType === 'unlock') await unlockUser(selectedUser.id); // ✅
      await fetchUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setOpenConfirm(false);
    }
  };

  const handleAssignRole = async (userId: string, role: string) => {
  try {
    await assignRole(userId, role);
    setSnackbarMsg(`Cập nhật vai trò thành công: ${role}`);
    setSnackbarOpen(true);
    await fetchUsers(); // cập nhật lại giao diện
  } catch (err) {
    console.error('Cập nhật vai trò thất bại:', err);
    setSnackbarMsg('Cập nhật vai trò thất bại');
    setSnackbarOpen(true);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>👥 Quản lý người dùng</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Họ tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => {
            const isLocked = !!user.lockoutEnd;
            return (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {isLocked
                    ? <Chip label="Đã khoá" color="error" />
                    : <Chip label="Hoạt động" color="success" />}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {isLocked ? (
                      <IconButton color="primary" onClick={() => {
                        setSelectedUser(user);
                        setActionType('unlock');
                        setOpenConfirm(true);
                      }}>
                        <LockOpenIcon />
                      </IconButton>
                    ) : (
                      <IconButton color="error" onClick={() => {
                        setSelectedUser(user); // ✅ đúng
                        setActionType('lock');
                        setOpenConfirm(true);
                      }}>
                        <LockIcon />
                      </IconButton>
                    )}
                    <FormControl size="small" fullWidth>
                    <InputLabel id={`role-label-${user.id}`}>Vai trò</InputLabel>
                    <Select
                      labelId={`role-label-${user.id}`}
                      value={user.role}
                      label="Vai trò"
                      onChange={(e) => {
                        const selectedRole = e.target.value as 'Staff' | 'Customer';
                        handleAssignRole(user.id, selectedRole);
                      }}
                    >
                      <MenuItem value="Staff">Nhân viên</MenuItem>
                      <MenuItem value="Customer">Khách hàng</MenuItem>
                    </Select>
                  </FormControl>

                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Hộp xác nhận khoá/mở khoá */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          Bạn có chắc muốn {actionType === 'lock' ? 'khoá' : 'mở khoá'} tài khoản: <b>{selectedUser?.email}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Huỷ</Button>
          <Button onClick={handleConfirm} color={actionType === 'lock' ? 'error' : 'primary'}>
            {actionType === 'lock' ? 'Khoá' : 'Mở khoá'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
  open={snackbarOpen}
  autoHideDuration={3000}
  onClose={() => setSnackbarOpen(false)}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
>
  <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
    {snackbarMsg}
  </Alert>
</Snackbar>
    </div>
  );
};

export default UserManager;
