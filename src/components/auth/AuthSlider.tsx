import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'

const images = [
  '/uontocduoi.jpg',
  '/cattoclayerdai.jpg',
  '/cattocnu.jpg',
]

const AuthSlider = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* IMAGE SLIDE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={images[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${images[index]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </AnimatePresence>

      {/* OVERLAY */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(210,166,121,0.55), rgba(222,184,135,0.65))'
        }}
      />

      {/* TEXT */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: '#fff',
          px: 4
        }}
      >
        <Box
          component={motion.img}
          src="/iconNen.png"
          alt="HairSalon Logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            objectFit: 'contain',
            filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.35))'
          }}
        />

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            mb: 1,
            textShadow: '0 4px 12px rgba(0,0,0,0.35)'
          }}
        >
          Welcome to HairSalon
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            opacity: 0.9,
            textShadow: '0 2px 6px rgba(0,0,0,0.3)'
          }}
        >
          Where beauty meets confidence
        </Typography>
      </Box>
    </Box>
  )
}

export default AuthSlider

