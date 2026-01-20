import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import CustomerSidebar from '../components/customer/Sidebar/CustomerSidebar'
import { BookingProvider } from '../contexts/booking/BookingProvider'


const CustomerLayout = () => {
  return (
    <BookingProvider>
      <Box display="flex" minHeight="calc(100vh - 120px)">
        <CustomerSidebar
          open
          variant="permanent"
          onClose={() => { }}
        />

        <Box flex={1} p={4} bgcolor="#fafafa">
          <Outlet />
        </Box>
      </Box>
    </BookingProvider>
  )
}


export default CustomerLayout
