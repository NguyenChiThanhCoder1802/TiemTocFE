import { Box, Button } from '@mui/material'
import type { ProfileTab } from '../../../types/Profile/ProfileTab'
interface ProfileTabsProps {
  value: ProfileTab
  onChange: (value: ProfileTab) => void
}
const tabs :{ label: string; value: ProfileTab }[]= [
  { label: 'Lịch đặt', value: 'bookings' },
  { label: 'Yêu thích', value: 'favorites' },
  { label: 'Đánh giá', value: 'reviews' },
  { label: 'Thanh toán', value: 'paymentHistory' },
  { label: 'Khách hàng thân thiết', value: 'loyalty' },
]

const ProfileTabs = ({ value, onChange }: ProfileTabsProps) => {
    return (
    <Box display="flex" justifyContent="center" gap={2} mt={2}>
      {tabs.map(tab => (
        <Button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            color: value === tab.value ? '#b97a2b' : 'text.primary',
            borderBottom:
              value === tab.value
                ? '2px solid #b97a2b'
                : '2px solid transparent',
            borderRadius: 0
          }}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  
  )
}

export default ProfileTabs
