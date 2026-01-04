import { Box, Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

const tabs = [
  { label: 'Lịch đặt', path: 'bookings' },
  { label: 'Đơn hàng', path: 'orders' },
  { label: 'Yêu thích', path: 'favorites' },
   { label: 'Đánh giá', path: 'reviews' }
]

const ProfileTabs = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      gap={2}
      mt={2}
    >
      {tabs.map(tab => (
        <Button
          key={tab.label}
          component={NavLink}
          to={tab.path}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            color: 'text.primary',
            '&.active': {
              color: '#b97a2b',
              borderBottom: '2px solid #b97a2b',
              borderRadius: 0
            }
          }}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  )
}

export default ProfileTabs
