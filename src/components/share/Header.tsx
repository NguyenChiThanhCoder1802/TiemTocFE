import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isLoggedIn, logout } = useAuth();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFCC80', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          💇‍♀️ Quản Lý Tiệm Tóc
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" onClick={() => navigate('*')}>Trang chủ</Button>
          <Button color="inherit" onClick={() => navigate('/services')}>Dịch vụ</Button>
          <Button color="inherit" onClick={() => navigate('/product')}>Sản phẩm</Button>
          <Button color="inherit" onClick={() => navigate('/cart')}>Giỏ hàng</Button>
          <Button color="inherit" onClick={() => navigate('/booking')}>Đặt lịch</Button>
          <Button color="inherit" onClick={() => navigate('/applydiscount')}>Xem mã giảm giá</Button>

          <IconButton color="inherit" onClick={handleMenuOpen} sx={{ ml: 1 }}>
            <MenuIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {!isLoggedIn ? (
              <>
                <MenuItem onClick={() => handleNavigate('/login')}>Đăng nhập</MenuItem>
                <MenuItem onClick={() => handleNavigate('/register')}>Đăng ký</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => handleNavigate('/profile')}>Hồ sơ cá nhân</MenuItem>
                <MenuItem onClick={() => handleNavigate('/cart')}>Giỏ hàng</MenuItem>
                <MenuItem onClick={() => handleNavigate('/my-booking')}>Lịch sử đặt lịch</MenuItem>
                <MenuItem onClick={() => handleNavigate('/my-orders')}>Lịch sử đặt hàng</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
