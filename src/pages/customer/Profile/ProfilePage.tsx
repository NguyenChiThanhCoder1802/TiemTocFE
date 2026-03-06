import { useState } from 'react'
import { Box } from '@mui/material'
import ProfileHeader from './ProfileHeader'
import FavoriteServicesPage from './FavoriteServicesPage'
import ReviewListPage from './ReviewListPage'
import PaymentHistory from '../Payment/PaymentHistory'
import type { ProfileTab } from '../../../types/Profile/ProfileTab'


const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState<ProfileTab>('favorites')
  const renderContent = () => {
    switch (activeTab) {
      case 'favorites':
        return <FavoriteServicesPage />
      case 'bookings':
        return <div>Danh sách đặt lịch của bạn</div>
      case 'reviews':
        return <ReviewListPage />
         case 'paymentHistory':
      return <PaymentHistory />
      default:
        return null
    }
  }

  return (
    <Box>
      <ProfileHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <Box mt={3}>
        {renderContent()}
      </Box>
    </Box>
  )
}

export default ProfilePage
