import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Divider,
  CircularProgress
} from '@mui/material'

import { createBooking } from '../../../api/BookingAPI'
import { fetchServices } from '../../../api/servicesAPI'


import type { CreateBookingPayload, PaymentMethod } from '../../../types/Booking/Booking'
import type { Service } from '../../../types/HairService/Service'

import useAuth from '../../../hooks/useAuth'

const paymentMethods: PaymentMethod[] = ['cash', 'card', 'vnpay', 'momo']

const BookingPage = () => {
  const { user, loading: authLoading, isAuthenticated } = useAuth()

  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<Service[]>([])


  const [form, setForm] = useState<CreateBookingPayload>({
    bookingDate: '',
    services: [],
    paymentMethod: 'cash',
    amountPaid: 0,
    notes: ''
  })

  /* ======================
     LOAD DATA
  ====================== */
  useEffect(() => {
    fetchServices().then(setServices)
  
  }, [])

  /* ======================
     HANDLERS (NO ANY)
  ====================== */
  const handleChange = <K extends keyof CreateBookingPayload>(
    key: K,
    value: CreateBookingPayload[K]
  ) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleAddService = (serviceId: string) => {
    if (form.services.some(s => s.service === serviceId)) return

    setForm(prev => ({
      ...prev,
      services: [...prev.services, { service: serviceId }]
    }))
  }

  const handleRemoveService = (serviceId: string) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.filter(s => s.service !== serviceId)
    }))
  }

  const handleSubmit = async () => {
  if (!isAuthenticated) {
    alert('Vui lòng đăng nhập để đặt lịch')
    return
  }

  try {
    setLoading(true)
    await createBooking(form)
    alert('Đặt lịch thành công 🎉')
  } catch (error: any) {
    console.error(error.response?.data)
    alert(error.response?.data?.message || 'Lỗi tạo booking')
  } finally {
    setLoading(false)
  }
}


  /* ======================
     UI
  ====================== */
  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" mb={2}>
            Đặt lịch làm tóc
          </Typography>

          {/* Booking date */}
          <TextField
            fullWidth
            type="datetime-local"
            label="Ngày & giờ"
            InputLabelProps={{ shrink: true }}
            value={form.bookingDate}
            onChange={e => handleChange('bookingDate', e.target.value)}
            margin="normal"
          />

          {/* Staff */}
          <TextField
            select
            fullWidth
            label="Nhân viên"
            value={form.staff || ''}
            onChange={e => handleChange('staff', e.target.value)}
            margin="normal"
          >
            <MenuItem value="">Không chọn</MenuItem>
          </TextField>

          <Divider sx={{ my: 2 }} />

          {/* Services */}
          <TextField
            select
            fullWidth
            label="Thêm dịch vụ"
            value=""
            onChange={e => handleAddService(e.target.value)}
          >
            {services.map(service => (
              <MenuItem key={service._id} value={service._id}>
                {service.name} – {service.finalPrice.toLocaleString()}₫
              </MenuItem>
            ))}
          </TextField>

          {/* Selected services */}
          {form.services.map(s => {
            const service = services.find(x => x._id === s.service)
            if (!service) return null

            return (
              <Box
                key={s.service}
                display="flex"
                justifyContent="space-between"
                mt={1}
              >
                <Typography>{service.name}</Typography>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleRemoveService(s.service)}
                >
                  Xóa
                </Button>
              </Box>
            )
          })}

          <Divider sx={{ my: 2 }} />

          {/* Payment */}
          <TextField
            select
            fullWidth
            label="Phương thức thanh toán"
            value={form.paymentMethod}
            onChange={e =>
              handleChange('paymentMethod', e.target.value as PaymentMethod)
            }
            margin="normal"
          >
            {paymentMethods.map(pm => (
              <MenuItem key={pm} value={pm}>
                {pm.toUpperCase()}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Số tiền thanh toán trước"
            value={form.amountPaid}
            onChange={e =>
              handleChange('amountPaid', Number(e.target.value))
            }
            margin="normal"
          />

          {/* Notes */}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Ghi chú"
            value={form.notes || ''}
            onChange={e => handleChange('notes', e.target.value)}
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? <CircularProgress size={24} /> : 'Xác nhận đặt lịch'}
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default BookingPage
