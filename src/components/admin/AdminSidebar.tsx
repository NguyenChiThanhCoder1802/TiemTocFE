import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box
} from '@mui/material'
import {
  Dashboard,
  ContentCut,
  People,
  BarChart
} from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

const drawerWidth = 240

const menu = [
  { text: 'Tổng quan', icon: <Dashboard />, path: '/admin/stats' },
  { text: 'Lịch của khách', icon: <ContentCut />, path: '/admin/BookingManager' },
  { text: 'Dịch vụ', icon: <ContentCut />, path: '/admin/ServiceManager/HairSalonService' },
  { text: 'Danh mục', icon: <ContentCut />, path: '/admin/CategoryManager' },
  { text: 'Nhân viên', icon: <People />, path: '/admin/StaffManager/StaffList' },
  { text: 'Tài khoản', icon: <People />, path: '/admin/AccountManager/Accounts' },
  { text: 'Thẻ Giảm Giá', icon: <BarChart />, path: '/admin/DiscountManager' },
]

const AdminSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          bgcolor: '#6b4f2c',
          color: '#fdf8f2',
          borderRight: 'none'
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography fontWeight={700} fontSize={18}>
          ADMIN PANEL
        </Typography>
      </Box>

      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              color: '#fdf8f2',
              '&.active': {
                bgcolor: 'rgba(210,166,121,0.25)'
              },
              '&:hover': {
                bgcolor: 'rgba(210,166,121,0.15)'
              }
            }}
          >
            <ListItemIcon sx={{ color: '#fdf8f2' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

export default AdminSidebar
