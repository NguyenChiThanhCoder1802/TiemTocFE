import { Outlet, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'

import AuthSlider from '../components/auth/AuthSlider'
import { AnimatePresence, motion } from 'framer-motion'


const AuthLayout = () => {
  const location = useLocation()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
        background: 'linear-gradient(135deg, #d2a679, #deb887)'
      }}
    >
      {/* LEFT */}
      <AuthSlider />

      {/* RIGHT */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.35 }}
          >
            <Box
              sx={{
                width: 420,
                p: 4,
                bgcolor: '#fff',
                borderRadius: 3,
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
              }}
            >
              <Outlet />
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  )
}


export default AuthLayout
