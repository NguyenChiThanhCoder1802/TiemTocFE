import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { useState } from 'react';
import ProfileInfoCard from '../../components/Profile/ProfileInfoCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LockResetIcon from '@mui/icons-material/LockReset';
import PersonIcon from '@mui/icons-material/Person';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Thông tin cá nhân', icon: <PersonIcon />, key: 'profile' },
  { label: 'Lịch sử đặt lịch', icon: <CalendarMonthIcon />, route: '/my-booking' },
  { label: 'Đơn hàng của bạn', icon: <InventoryIcon />, route: '/my-orders' },
  { label: 'Kho mã giảm giá', icon: <LocalOfferIcon />, route: '/applydiscount' },
  { label: 'Đổi mật khẩu', icon: <LockResetIcon />, route: '/change-password' },
];

const CustomerDashboard = () => {
  const [selectedKey, setSelectedKey] = useState('profile');
  const navigate = useNavigate();

  const handleMenuClick = (item: (typeof menuItems)[number]) => {
    if (item.route) {
      navigate(item.route);
    } else {
      setSelectedKey(item.key || '');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      minHeight="80vh"
      sx={{ backgroundColor: '#fafafa', p: 2 }}
    >
      {/* Sidebar */}
      <Paper
        elevation={3}
        sx={{
          width: { xs: '100%', md: 280 },
          mr: { md: 3 },
          mb: { xs: 3, md: 0 },
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          My Account
        </Typography>
        <List disablePadding>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.label}
              selected={selectedKey === item.key}
              onClick={() => handleMenuClick(item)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* Nội dung hiển thị */}
      <Box
        flex={1}
        component={motion.div}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {selectedKey === 'profile' && (
          <>
            <Typography variant="h5" gutterBottom>
              Thông tin cá nhân
            </Typography>
            <ProfileInfoCard />
          </>
        )}

        {/* Các key khác nếu muốn thêm tab nội dung tại chỗ */}
      </Box>
    </Box>
  );
};

export default CustomerDashboard;
