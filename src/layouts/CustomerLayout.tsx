import { Box, useMediaQuery, useTheme  } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import CustomerSidebar from '../components/customer/Sidebar/CustomerSidebar'



const CustomerLayout = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [open, setOpen] = useState(false)
  return (

      <Box display="flex" minHeight="calc(100vh - 120px)">
        <CustomerSidebar
          open={isDesktop ? true : open}
          variant={isDesktop ? 'permanent' : 'temporary'}
          onClose={() => setOpen(false)}
        />

        <Box flex={1} p={4} bgcolor="#fafafa">
          <Outlet />
        </Box>
      </Box>
  )
}


export default CustomerLayout
