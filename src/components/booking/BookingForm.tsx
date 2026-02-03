import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Divider,
  Stepper,
  Step,
  StepLabel
} from '@mui/material'

import { fetchPublicStaffs } from '../../api/staffAPI'
import { fetchServiceById } from '../../api/servicesAPI'
import { createBooking } from '../../api/BookingAPI'

import type { Staff } from '../../types/Staff/Staff'
import type { Service } from '../../types/HairService/Service'
import PaymentMethodSelect from '../../components/payment/PaymentMethodSelect'
import { createBookingPayment } from '../../api/PaymentAPI'
import type { PaymentMethod } from '../../types/Payment/Payment'

import useAuth from '../../hooks/useAuth'
import BookingReview from './BookingReview'
import BookingStepTime from './BookingStepTime'
import BookingStepStaff from './BookingStepStaff'

export default function BookingForm() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const navigate = useNavigate()
  const { user: currentUser } = useAuth()

  const [service, setService] = useState<Service | null>(null)
  const [staffs, setStaffs] = useState<Staff[]>([])
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [startTime, setStartTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
  'Chọn thời gian',
  'Chọn nhân viên',
  'Phương thức thanh toán',
  'Xác nhận'
]

  /* AUTH GUARD */
  useEffect(() => {
    if (currentUser === null) navigate('/login')
  }, [currentUser, navigate])

  /* LOAD SERVICE */
  useEffect(() => {
    if (!serviceId) return

    const load = async () => {
      const data = await fetchServiceById(serviceId)
      setService(data)
      setInitialLoading(false)
    }

    load()
  }, [serviceId])

  /* LOAD STAFF */
  useEffect(() => {
  fetchPublicStaffs().then(data => {
    setStaffs(data)
  })
}, [])


  /* SUBMIT */
  const handleSubmit = async () => {
    if (!service || !startTime) return

    setLoading(true)
    try {
      const booking = await createBooking({
        bookingType: 'service',
        services: [{ service: service._id }],
        startTime,
        ...(selectedStaff && { staff: selectedStaff._id })
      })
       if (paymentMethod === 'cash') {
      alert('🎉 Đặt lịch thành công! Thanh toán tại tiệm')
      navigate('/customer/bookings')
      return
    }
     if (paymentMethod === 'vnpay') {
      const payment = await createBookingPayment(booking._id,paymentMethod)

      // Redirect sang VNPay
      window.location.href = payment.paymentUrl
      return
    } alert('MoMo sẽ sớm được hỗ trợ!')
      navigate('/customer/bookings')}catch (error: any) {
    alert(error.message || 'Có lỗi xảy ra')
     
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return <CircularProgress sx={{ mt: 6 }} />
  }

  if (!service) {
    return <Typography color="error">Không tìm thấy dịch vụ</Typography>
  }

  return (
    <Box maxWidth={720} mx="auto">
  <Typography variant="h4" fontWeight={700} mb={3}>
    Đặt lịch – {service.name}
  </Typography>

  {/* STEP HEADER */}
  <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
    {steps.map(label => (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    ))}
  </Stepper>

  <Stack spacing={4}>
    {activeStep === 0 && (
      <BookingStepTime
        startTime={startTime}
        onChange={setStartTime}
      />
    )}

    {activeStep === 1 && (
      <BookingStepStaff
        staffs={staffs}
        selectedStaff={selectedStaff}
        onSelect={setSelectedStaff}
      />
    )}

    {activeStep === 2 && (
      <PaymentMethodSelect
        value={paymentMethod}
        onChange={setPaymentMethod}
      />
    )}

    {activeStep === 3 && (
      <BookingReview
        user={currentUser!}
        staff={selectedStaff}
        service={service}
        startTime={startTime}
        paymentMethod={paymentMethod}
      />
    )}

    {/* ACTION BUTTONS */}
    <Stack direction="row" justifyContent="space-between">
      <Button
        disabled={activeStep === 0}
        onClick={() => setActiveStep(s => s - 1)}
      >
        Quay lại
      </Button>

      {activeStep < 3 ? (
        <Button
          variant="contained"
          onClick={() => setActiveStep(s => s + 1)}
          disabled={activeStep === 0 && !startTime}
        >
          Tiếp tục
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {paymentMethod === 'vnpay'
            ? 'Thanh toán VNPay'
            : 'Xác nhận đặt lịch'}
        </Button>
      )}
    </Stack>
  </Stack>
</Box>

  )
}
