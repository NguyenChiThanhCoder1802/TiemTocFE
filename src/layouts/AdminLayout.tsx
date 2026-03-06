import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />

      <Box sx={{ flexGrow: 1 }}>

        <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: 'calc(100vh - 120px)' }}>
          <Outlet />
        </Box>

      </Box>
    </Box>
  )
}

export default AdminLayout
