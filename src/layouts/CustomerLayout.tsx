import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import CustomerSidebar from '../components/customer/Sidebar/CustomerSidebar'

const CustomerLayout = () => {
  return (
    <Box display="flex" minHeight="calc(100vh - 120px)">
      <CustomerSidebar />

      <Box flex={1} p={4} bgcolor="#fafafa">
        <Outlet />
      </Box>
    </Box>
  )
}

export default CustomerLayout
