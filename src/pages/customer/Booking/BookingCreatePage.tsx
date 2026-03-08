import {
  Box,
  Stack,
  Typography,
  Button,
  CircularProgress,Divider
} from '@mui/material'

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useBookingBuilder } from '../../../hooks/useBookingBuilder'
import useAuth from '../../../hooks/useAuth'
import BookingStepTime from '../../../components/booking/BookingStepTime'
import BookingStepStaff from '../../../components/booking/ChooseStaff/BookingStepStaff'
import BookingStepServices from '../../../components/booking/BookingStepServices'
import DiscountSection from '../../../components/booking/DiscountSelector/DiscountSelector'
import PaymentMethodSelect from '../../../components/booking/payment/PaymentMethodSelect'
import BookingSummaryPanel from '../../../components/booking/BookingSummaryPanel'
import { createBooking } from '../../../api/BookingAPI'
import { createBookingPayment } from '../../../api/PaymentAPI'
import BookingReviewDialog from '../../../components/booking/BookingReview'
import { useToast } from '../../../hooks/useToast'
export default function BookingCreatePage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { user } = useAuth()
  const location = useLocation()
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const builder = useBookingBuilder()

  const {
    availableServices,
    toggleService
  } = builder
  const [autoAdded, setAutoAdded] = useState(false)

  useEffect(() => {
    const serviceId = location.state?.serviceId
    if (!serviceId) return
    if (autoAdded) return
    if (!availableServices.length) return

    const found = availableServices.find(
      (s) => s._id === serviceId
    )

    if (found) {
      toggleService(found)
      setAutoAdded(true)
    }
  }, [availableServices, location.state, autoAdded, toggleService])
  const handleSubmit = async () => {
    if (
      !builder.startTime ||
      builder.selectedServices.length === 0
    )
      return

    setSubmitting(true)

    try {
      const startTimeISO = new Date(
        builder.startTime
      ).toISOString()

      const booking = await createBooking({
        staff: builder.selectedStaff?._id ?? null,
        bookingType: 'service',
        services: builder.selectedServices.map(s => ({
          service: s._id
        })),
        startTime: startTimeISO,
        paymentMethod: builder.paymentMethod,
        discountCode: builder.discount?.code
      })

      // CASH
      if (builder.paymentMethod === 'cash') {
        showToast("Đặt lịch thành công", "success")
        navigate(`/booking-success/${booking._id}`)
        return
      }

      // VNPAY
      if (builder.paymentMethod === 'vnpay') {
        const payment = await createBookingPayment(
          booking._id
        )
        showToast("Đang chuyển đến cổng thanh toán...", "info")

        window.location.href = payment.paymentUrl
        return
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Có lỗi xảy ra'

      showToast(msg, "error")


    } finally {
      setSubmitting(false)
    }
  }
  if (showConfirm) {
    return (
      <Box maxWidth={720} mx="auto" mt={4}>
        <BookingReviewDialog
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleSubmit}
          loading={submitting}
          user={user!}
          staff={builder.selectedStaff}
          services={builder.selectedServices}
          startTime={builder.startTime}
          paymentMethod={builder.paymentMethod}
          totalDuration={builder.totalDuration}
          endTime={builder.endTime}
          originalAmount={builder.price.original}
          afterServiceDiscount={builder.price.afterServiceDiscount}
          discountAmount={builder.price.discountAmount}
          finalAmount={builder.price.final}
          discountCode={builder.discount?.code}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting
            ? <CircularProgress size={24} />
            : 'Xác nhận đặt lịch'}
        </Button>
      </Box>
    )
  }

  return (
    <Box maxWidth={1200} mx="auto" mt={4}>
      <Typography variant="h4" fontWeight={700} mb={4} textAlign="center">
        Đặt lịch hẹn
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        <Box flex={2}>
           <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 1,
              p: 4,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}
          >
          <Stack spacing={4}>
            <Divider textAlign="center">Chọn ngày và giờ</Divider>
            <BookingStepTime
              startTime={builder.startTime}
              onChange={builder.setStartTime}
              duration={builder.totalDuration}
            />
            <Divider textAlign="center">Chọn nhân viên</Divider>
            {builder.loadingStaff ? (
              <CircularProgress />
            ) : (
              <BookingStepStaff
                staffs={builder.staffs}
                selectedStaff={builder.selectedStaff}
                onSelect={(staff) => {
                  builder.setSelectedStaff(staff)
                }}
                availability={builder.availability}
                error={builder.staffError}
              />
            )}
            <Divider textAlign="center">Chọn dịch vụ</Divider>
            {builder.loadingServices ? (
              <CircularProgress />
            ) : (
              <BookingStepServices
                services={builder.availableServices}
                selected={builder.selectedServices}
                toggleService={builder.toggleService}
              />
            )}
            <Divider textAlign="center">Chọn ưu đãi</Divider>
            <DiscountSection
              amount={builder.price.original}
              serviceIds={builder.selectedServices.map(s => s._id)}
              onApply={builder.setDiscount}
            />
            <Divider textAlign="center">Chọn phương thức thanh toán</Divider>
            <PaymentMethodSelect
              value={builder.paymentMethod}
              onChange={builder.setPaymentMethod}
            />
          </Stack>
          </Box>
        </Box>

        <Box flex={1}>
          <BookingSummaryPanel
            services={builder.selectedServices}
            original={builder.price.original}
            afterServiceDiscount={builder.price.afterServiceDiscount}
            discountAmount={builder.price.discountAmount}
            final={builder.price.final}
            totalDuration={builder.totalDuration}
            endTime={builder.endTime}
          />


          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            disabled={
              !builder.startTime ||
              builder.selectedServices.length === 0
            }
            onClick={() => setShowConfirm(true)}
          >
            Tiếp tục xác nhận
          </Button>
        </Box>
      </Box>
    </Box>
  )
}