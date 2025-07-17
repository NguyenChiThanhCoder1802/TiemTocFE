import {AppBar,Toolbar,Typography,Box,Menu,MenuItem,IconButton,Container,Avatar,InputBase,alpha,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { getUserRoleFromToken } from '../../auth/authUtils';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const token = useAuth().getToken();
  const role = getUserRoleFromToken(token);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);
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
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 243, 224, 0.6)',
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid rgba(255,255,255,0.3)',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ minHeight: 72, justifyContent: 'space-between' }}>
          {/* Left - Logo và tên */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <img
              src="/iconnen.jpg"
              alt="Hair Salon"
              style={{ width: 32, height: 32, marginRight: 8 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#5D4037',
              }}
            >
              Tiệm Tóc Xin Chào
            </Typography>
          </Box>

          {/* Middle - Thanh tìm kiếm */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2,
              backgroundColor: alpha('#FFF', 0.5),
              '&:hover': {
                backgroundColor: alpha('#FFF', 0.7),
              },
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 0.5,
              mx: 3,
              minWidth: 200,
            }}
          >
            <SearchIcon sx={{ mr: 1, color: '#5D4037' }} />
            <InputBase
              placeholder="Tìm kiếm..."
              inputProps={{ 'aria-label': 'search' }}
              sx={{ fontSize: '0.95rem', color: '#5D4037', width: '100%' }}
            />
          </Box>

          {/* Right - Avatar hoặc Menu icon */}
          <Box>
            {isLoggedIn ? (
              <IconButton onClick={handleMenuOpen}>
                <Avatar sx={{ width: 36, height: 36 }} />
              </IconButton>
            ) : (
              <IconButton onClick={handleMenuOpen}>
                <MenuIcon sx={{ color: '#4E342E' }} />
              </IconButton>
            )}
          </Box>

          {/* Menu người dùng */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {!isLoggedIn ? (
              <>
                <MenuItem onClick={() => handleNavigate('/login')}>Đăng nhập</MenuItem>
                <MenuItem onClick={() => handleNavigate('/register')}>Đăng ký</MenuItem>
              </>
            ) : role === 'Admin' ? (
              <>
                <MenuItem onClick={() => handleNavigate('/admin/dashboard')}>Dashboard</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => handleNavigate('/my-profile')}>Hồ sơ cá nhân</MenuItem>
                <MenuItem onClick={() => handleNavigate('/change-password')}>Đổi mật khẩu</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;