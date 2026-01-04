import { Box } from '@mui/material'
import ProfileHeader from './ProfileHeader.tsx'
import { Outlet } from 'react-router-dom'

const ProfilePage = () => {
  return (
    <Box>
      <ProfileHeader />
      <Box mt={3}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default ProfilePage
