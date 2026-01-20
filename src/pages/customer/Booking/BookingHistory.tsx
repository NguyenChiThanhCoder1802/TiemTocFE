import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  CircularProgress
} from '@mui/material'

import { fetchMyBookings } from '../../../api/BookingAPI'
import type {
  Booking,
  BookingStatus
} from '../../../types/Booking/Booking'


import BookingTable from './BookingTable'

const BookingManager = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeStatus, setActiveStatus] =
    useState<BookingStatus>('pending')

  const loadBookings = async (status: BookingStatus) => {
    setLoading(true)
    try {
      const data = await fetchMyBookings(status)
      setBookings(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings(activeStatus)
  }, [activeStatus])

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Lịch đặt của tôi
      </Typography>

    

      {loading ? (
        <Box textAlign="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : (
        <BookingTable bookings={bookings} />
      )}
    </Box>
  )
}

export default BookingManager
