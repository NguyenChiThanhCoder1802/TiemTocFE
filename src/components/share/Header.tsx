import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  InputBase,
  alpha
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import CustomerSidebar from '../../components/customer/Sidebar/CustomerSidebar'

const Header = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, isAdmin } = useAuth()

  const [openSidebar, setOpenSidebar] = useState(false)

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
          {/* ===== LEFT ===== */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* LOGO */}
            <Box
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <img
                src="/iconNen.png"
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
          
            {/* ===== ĐÃ ĐĂNG NHẬP (CUSTOMER) ===== */}
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
                <Typography sx={{ color: '#5D4037', fontWeight: 500 }}>
                  Lịch hẹn
                </Typography>
              </Box>
            )}
          </Box>
          {/* ===== RIGHT ===== */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* SEARCH */}
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

            {/* ===== CHƯA ĐĂNG NHẬP → TEXT ===== */}
            {!isAuthenticated && (
              <Typography
                onClick={() => navigate('/login')}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: '#5D4037',
                  px: 2,
                  py: 0.75,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: alpha('#000', 0.05)
                  }
                }}
              >
                Đăng nhập
              </Typography>
            )}

              {/* ===== ĐÃ ĐĂNG NHẬP → AVATAR ===== */}
              {isAuthenticated && !isAdmin && (
                <IconButton onClick={() => setOpenSidebar(true)} sx={{ p: 0 }}>
                  <Avatar
                    src={user?.avatar || ''}
                    sx={{ width: 36, height: 36 }}
                  />
                </IconButton>
              )}
            </Box>

        </Toolbar>
      </AppBar>

      {/* ===== CUSTOMER SIDEBAR ===== */}
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
