import {Box,Typography,Button,Card,List,ListItemButton,ListItemIcon,ListItemText,Divider,Paper,} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {Dashboard,Brush,Store,ShoppingCart,Group,CalendarToday,LocalOffer,BarChart,Category}from '@mui/icons-material';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { text: 'Tổng Quan', icon: <Dashboard />, path: '/admin' },
    { text: 'Dịch Vụ', icon: <Brush />, path: '/admin/services' },
    { text: 'Combo làm đẹp', icon: <FaceRetouchingNaturalIcon />, path: '/admin/beautycombo' },
    { text: 'Sản Phẩm', icon: <Store />, path: '/admin/products' },
    { text: 'Đơn Hàng', icon: <ShoppingCart />, path: '/admin/orders' },
    { text: 'Người Dùng', icon: <Group />, path: '/admin/users' },
    { text: 'Lịch Đặt', icon: <CalendarToday />, path: '/admin/bookings' },
    { text: 'Mã Giảm Giá', icon: <LocalOffer />, path: '/admin/discount' },
    { text: 'Doanh Thu', icon: <BarChart />, path: '/admin/revenue' },
  ];

  const dashboardCards = [
    {
      title: 'Quản Lý Dịch Vụ',
      icon: <Brush fontSize="large" color="primary" />,
      path: '/admin/services',
    },
    {
      title: 'Quản Lý Sản Phẩm',
      icon: <Store fontSize="large" color="secondary" />,
      path: '/admin/products',
    },
    {
      title: 'Quản Lý Danh Mục',
      icon: <Category fontSize="large" sx={{ color: '#9c27b0' }} />,
      path: '/admin/categories',
    },
    {
      title: 'Quản Lý Đơn Hàng',
      icon: <ShoppingCart fontSize="large" color="success" />,
      path: '/admin/orders',
    },
    {
      title: 'Quản Lý Người Dùng',
      icon: <Group fontSize="large" color="error" />,
      path: '/admin/users',
    },
    {
      title: 'Quản Lý Lịch Đặt',
      icon: <CalendarToday fontSize="large" color="warning" />,
      path: '/admin/booking',
    },
    {
      title: 'Mã Giảm Giá',
      icon: <LocalOffer fontSize="large" color="info" />,
      path: '/admin/discount',
    },
    {
      title: 'Doanh Thu',
      icon: <BarChart fontSize="large" sx={{ color: '#9c27b0' }} />, // tím
      path: '/admin/revenue',
    },
  ];

  return (
    <Box display="flex" sx={{ background: 'linear-gradient(to right bottom, #e0f7fa, #ff7043)', minHeight: '100vh' }}>
      <Paper
        elevation={3}
        sx={{
          width: 240,
          minHeight: '100vh',
          paddingTop: 3,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          🛠 Quản Trị
        </Typography>
        <Divider />
        <List>
          {sidebarItems.map((item) => (
            <ListItemButton
              key={item.text}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* Main content */}
      <Box flex={1} p={4}>
        <Typography variant="h4" gutterBottom>
          Bảng Điều Khiển
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={3}>
          {dashboardCards.map((item, index) => (
            <Card
              key={index}
              sx={{
                width: 260,
                height: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 2,
              }}
              elevation={4}
            >
              <Box display="flex" alignItems="center" gap={1}>
                {item.icon}
                <Typography variant="h6">{item.title}</Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => navigate(item.path)}
                sx={{ mt: 2 }}
              >
                Quản lý
              </Button>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
