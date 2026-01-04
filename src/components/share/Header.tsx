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
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import CustomerSidebar from '../../components/customer/Sidebar/CustomerSidebar' 

const Header = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openCalendar, setOpenCalendar] = useState(false)
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
          {/* ===== LEFT: MENU + LOGO ===== */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
          </Box>

          {/* ===== RIGHT: SEARCH + AVATAR ===== */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                borderRadius: 2,
                backgroundColor: alpha('#FFF', 0.5),
                '&:hover': { backgroundColor: alpha('#FFF', 0.7) },
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 0.5,
                maxWidth: 250
              }}
            >
              <SearchIcon sx={{ mr: 1, color: '#5D4037' }} />
              <InputBase
                placeholder="Tìm kiếm..."
                sx={{ fontSize: '0.95rem', color: '#5D4037' }}
              />
            </Box>

            <IconButton onClick={handleMenuOpen}>
              {isAuthenticated ? (
                <Avatar src={user?.avatar || ''} sx={{ width: 36, height: 36 }} />
              ) : (
                <MenuIcon sx={{ color: '#4E342E' }} />
              )}
            </IconButton>
          </Box>

          {/* ===== AVATAR MENU ===== */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {!isAuthenticated ? (
              <>
                <MenuItem onClick={() => handleNavigate('/login')}>
                  Đăng nhập
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/register')}>
                  Đăng ký
                </MenuItem>
              </>
            ) : isAdmin ? (
              <>
                <MenuItem onClick={() => handleNavigate('/admin/dashboard')}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => handleNavigate('/my-profile')}>
                  Hồ sơ cá nhân
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setOpenCalendar(true)
                    handleMenuClose()
                  }}
                >
                  Lịch của bạn
                </MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </AppBar>

      {/* ===== CUSTOMER SIDEBAR (GỌI COMPONENT) ===== */}
      {isAuthenticated && !isAdmin && (
        <CustomerSidebar
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
        />
      )}

      {/* ===== CALENDAR ===== */}
      <Dialog
        open={openCalendar}
        onClose={() => setOpenCalendar(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Lịch của bạn</DialogTitle>
        <DialogContent />
      </Dialog>
    </>
  )
}

export default Header
