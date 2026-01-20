import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Divider
} from '@mui/material'
import {
  Dashboard,
  CalendarMonth,
  Star,
  Person,
  Favorite,
  Logout
} from '@mui/icons-material'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

const drawerWidth = 260

const menu = [
  { text: 'Trang chủ', icon: <Dashboard />, path: '/' },
  { text: 'Lịch đặt', icon: <CalendarMonth />, path: '/customer/booking' },
  { text: 'Đánh giá', icon: <Star />, path: '/my-reviews' },
  { text: 'Yêu thích', icon: <Favorite />, path: '/my-favorites' },
  { text: 'Hồ sơ', icon: <Person />, path: '/customer/profile' }
]

interface Props {
  open: boolean
  onClose: () => void
  variant?: 'temporary' | 'permanent'
}

const CustomerSidebar = ({
  open,
  onClose,
  variant = 'temporary'
}: Props) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    onClose()
    navigate('/login')
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant={variant}
      anchor="right" // 👉 MỞ TỪ BÊN PHẢI
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth
        }
      }}
    >
      {/* ===== USER INFO ===== */}
      <Box p={3} display="flex" gap={2} alignItems="center">
        <Avatar src={user?.avatar} />
        <Box>
          <Typography fontWeight={600}>{user?.name}</Typography>
          <Typography fontSize={13} color="text.secondary">
            Customer
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* ===== MENU ===== */}
      <List>
        {menu.map(item => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            onClick={onClose}
            sx={{
              '&.active': {
                bgcolor: 'rgba(160,120,60,0.25)'
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      {/* ===== LOGOUT ===== */}
      <Box mt="auto">
        <Divider />
        <List>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              color: 'error.main'
            }}
          >
            <ListItemIcon sx={{ color: 'error.main' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  )
}

export default CustomerSidebar
