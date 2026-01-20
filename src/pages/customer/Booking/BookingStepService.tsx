import {
  Stack,
  Typography,
  Button,
  Box,
  CircularProgress,
  IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState } from 'react'
import type { BookingEstimateContext } from '../../../types/Booking/BookingEstimateContext'

import type { Service } from '../../../types/HairService/Service'
import { fetchServiceById } from '../../../api/servicesAPI'

interface Props {
  booking: BookingEstimateContext
  onNext: () => void
}

const BookingStepService = ({ booking, onNext }: Props) => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadServices = async () => {
      if (!booking.draft.services.length) {
        setServices([])
        return
      }

      try {
        setLoading(true)

        const data = await Promise.all(
          booking.draft.services.map(s =>
            fetchServiceById(s.serviceId)
          )
        )

        setServices(data)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [booking.draft.services])

  if (!booking.draft.services.length) {
    return (
      <Typography align="center">
        Chưa chọn dịch vụ nào
      </Typography>
    )
  }

  if (loading) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h6">
        Dịch vụ đã chọn
      </Typography>

      {services.map(service => (
        <Box
          key={service._id}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          borderRadius={2}
          boxShadow={1}
        >
          <Box>
            <Typography fontWeight={600}>
              {service.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {service.duration} phút ·{' '}
              {new Intl.NumberFormat('vi-VN').format(service.finalPrice)}đ
            </Typography>
          </Box>

          <IconButton
            color="error"
            onClick={() => booking.removeService(service._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button
  variant="contained"
  onClick={onNext}
>
  Tiếp tục
</Button>

    </Stack>
  )
}

export default BookingStepService
