import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  InputBase,
  alpha,

} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
// import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import CustomerSidebar from '../../components/customer/Sidebar/CustomerSidebar'


const Header = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()




  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openSidebar, setOpenSidebar] = useState(false)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => setAnchorEl(null)

  const handleNavigate = (path: string) => {
    navigate(path)
    handleMenuClose()
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
    handleMenuClose()
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 243, 224, 0.6)',
          backdropFilter: 'blur(6px)',
          borderBottom: '1px solid rgba(255,255,255,0.3)'
        }}
      >
        <Toolbar
          sx={{
            minHeight: 72,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {/* LEFT */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isAuthenticated && !isAdmin && (
              <IconButton
                onClick={() => setOpenSidebar(true)}
                sx={{ color: '#5D4037' }}
              >
                <MenuIcon />
              </IconButton>
            )}

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
                sx={{ fontWeight: 'bold', color: '#5D4037' }}
              >
                Tiệm Tóc
              </Typography>
            </Box>

            {/* 🔔 LỊCH HẸN */}
            {isAuthenticated && !isAdmin && (
              <Box
                onClick={() => navigate('/customer/booking')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  '&:hover': { backgroundColor: alpha('#000', 0.05) }
                }}
              >
                {/* <Badge
                  badgeContent={bookingCount}
                  color="primary"
                  invisible={bookingCount === 0}
                >
                  <EditCalendarOutlinedIcon sx={{ color: '#5D4037' }} />
                </Badge> */}

                <Typography sx={{ color: '#5D4037', fontWeight: 500 }}>
                  Lịch hẹn
                </Typography>
              </Box>
            )}
          </Box>

          {/* RIGHT */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                borderRadius: 2,
                backgroundColor: alpha('#FFF', 0.5),
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 0.5
              }}
            >
              <SearchIcon sx={{ mr: 1, color: '#5D4037' }} />
              <InputBase placeholder="Tìm kiếm..." />
            </Box>

            <IconButton onClick={handleMenuOpen}>
              {isAuthenticated ? (
                <Avatar src={user?.avatar || ''} />
              ) : (
                <MenuIcon />
              )}
            </IconButton>
          </Box>

          {/* MENU */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {!isAuthenticated ? [
              <MenuItem key="login" onClick={() => handleNavigate('/login')}>
                Đăng nhập
              </MenuItem>,
              <MenuItem key="register" onClick={() => handleNavigate('/register')}>
                Đăng ký
              </MenuItem>
            ] : [
              <MenuItem key="profile" onClick={() => handleNavigate('/my-profile')}>
                Hồ sơ cá nhân
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout}>
                Đăng xuất
              </MenuItem>
            ]}
          </Menu>
        </Toolbar>
      </AppBar>

      {isAuthenticated && !isAdmin && (
        <CustomerSidebar
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
        />
      )}
    </>
  )
}

export default Header
