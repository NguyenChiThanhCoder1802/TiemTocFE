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
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useEffect } from 'react'
import { getMyNotificationsApi } from '../../api/notificationApi'
import type { Notification } from '../../types/Notification/Notification'
const Header = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, isAdmin } = useAuth()
  const [openSidebar, setOpenSidebar] = useState(false)
  const [search, setSearch] = useState('')
  const [notifications, setNotifications] = useState<Notification[]>([])
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter' && search.trim()) {
    navigate(`/results?search=${search}`)
  }
}
const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget)
}

const handleCloseNotifications = () => {
  setAnchorEl(null)
}
useEffect(() => {

  if (!isAuthenticated) return

  const fetchNotifications = async () => {
    try {

      const res = await getMyNotificationsApi(1, 5)

      setNotifications(res.data)

    } catch (error) {
      console.error(error)
    }
  }

  fetchNotifications()

}, [isAuthenticated])
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
            minHeight: 52,
            px: 2,
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
                onClick={() => navigate('/customer/bookinghistory')}
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
                  Lịch hẹn của bạn
                </Typography>
              </Box>
            )}
            {/* ===== ƯU ĐÃI (CUSTOMER) ===== */}
            {isAuthenticated && !isAdmin && (
              <Box
                onClick={() => navigate('/discounts')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: 500,
                  color: '#5D4037',
                  '&:hover': {
                    backgroundColor: alpha('#000', 0.05)
                  }
                }}
              >
                 Ưu đãi
              </Box>
            )}
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
                  fontWeight: 500,
                  color: '#5D4037',
                  '&:hover': {
                    backgroundColor: alpha('#000', 0.05)
                  }
                }}
              >
                 Đặt lịch ngay
              </Box>
            )}
            <Box
                onClick={() => navigate('/services')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: 500,
                  color: '#5D4037',
                  '&:hover': {
                    backgroundColor: alpha('#000', 0.05)
                  }
                }}
              >
                Dịch vụ
              </Box>

          </Box>
          {/* ===== RIGHT ===== */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        
              {isAuthenticated && !isAdmin && (
                <>
                  <IconButton onClick={handleOpenNotifications}>
                    <Badge
                      badgeContent={notifications.filter(n => !n.isRead).length}
                      color="error"
                    >
                      <NotificationsIcon sx={{ color: '#d2a679' }} />
                    </Badge>
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseNotifications}
                  >
                    {notifications.length === 0 && (
                      <MenuItem>Không có thông báo</MenuItem>
                    )}
                      {notifications.map((n) => {
                        const service = n.booking?.services?.[0]

                        return (
                          <MenuItem
                            key={n._id}
                            onClick={() => navigate(`/bookings/${n.booking?._id}`)}
                            sx={{ gap: 2, alignItems: 'center', maxWidth: 320 }}
                          >
                            {/* SERVICE IMAGE */}
                            {service?.imageSnapshot?.[0] && (
                              <img
                                src={service.imageSnapshot[0]}
                                alt={service.nameSnapshot}
                                style={{
                                  width: 40,
                                  height: 40,
                                  objectFit: 'cover',
                                  borderRadius: 6
                                }}
                              />
                            )}

                            <Box>
                              <Typography sx={{ fontWeight: n.isRead ? 400 : 600 }}>
                                {n.title}
                              </Typography>

                              <Typography variant="body2" color="text.secondary">
                                {n.message}
                              </Typography>

                              {service && (
                                <Typography variant="caption" color="text.secondary">
                                  {service.nameSnapshot}
                                </Typography>
                              )}
                            </Box>
                          </MenuItem>
                        )
                      })}
                  </Menu>
                </>
              )}
                {/* SEARCH */}
          <Box
            sx={{
              borderRadius: 2,
              backgroundColor: alpha('#FFF', 0.5),
              display: 'flex',
              alignItems: 'center',
              px: 1.5,
              py: 0.25
            }}
          >
      
            <SearchIcon sx={{ mr: 1, color: '#5D4037' }} />
           <InputBase
              placeholder="Tìm kiếm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
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
