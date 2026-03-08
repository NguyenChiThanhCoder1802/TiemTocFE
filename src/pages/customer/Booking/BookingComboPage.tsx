import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Stack,
  Button,
  Card,
  CardContent,
  Chip,
} from '@mui/material'

import BookingStepStaff from '../../../components/booking/ChooseStaff/BookingStepStaff'
import BookingStepTime from '../../../components/booking/BookingStepTime'
import BookingPaymentSection from '../../../components/booking/payment/PaymentMethodSelect'
import BookingSummaryPanel from '../../../components/booking/BookingSummaryPanel'

import type { Staff } from '../../../types/Staff/Staff'
import type { PaymentMethod } from '../../../types/Payment/Payment'
import type { Combo } from '../../../types/Combo/Combo'

import { getComboBySlug } from '../../../api/ComboAPI'
import { fetchPublicStaffs } from '../../../api/staffAPI'
import { createBooking } from '../../../api/BookingAPI'
import { createBookingPayment } from '../../../api/PaymentAPI'
import { useToast } from '../../../hooks/useToast'
export default function BookingComboPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [combo, setCombo] = useState<Combo | null>(null)
  const [staffs, setStaffs] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('cash')
  const [submitting, setSubmitting] = useState(false)

  const [staffError, setStaffError] = useState<string | null>(null)

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    if (!slug) return

    const fetchData = async () => {
      try {
        const [comboData, staffData] = await Promise.all([
          getComboBySlug(slug),
          fetchPublicStaffs()
        ])

        setCombo(comboData)
        setStaffs(staffData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!combo || !startTime) {
      return
    }

    setSubmitting(true)

    try {
      const booking = await createBooking({
        bookingType: 'combo',
        combo: combo._id,
        staff: selectedStaff?._id,
        startTime: new Date(startTime).toISOString(),
        paymentMethod
      })

      if (paymentMethod === 'cash') {
        showToast("Đặt lịch thành công (Thanh toán tại salon)", "success")
        navigate(`/booking-success/${booking._id}`)
        return
      }

      if (paymentMethod === 'vnpay') {
        const payment = await createBookingPayment(booking._id)
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

  /* ================= RENDER ================= */

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    )
  }

  if (!combo) {
    return (
      <Container>
        <Typography>Combo không tồn tại</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Đặt lịch Combo
      </Typography>


      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">{combo.name}</Typography>
          <Typography color="text.secondary" mt={1}>
            {combo.description}
          </Typography>

          <Stack direction="row" spacing={2} mt={2}>
            <Chip label={` ${combo.duration} phút`} />
            <Chip
              color="primary"
              label={`${combo.pricing.comboPrice.toLocaleString()} đ`}
            />
          </Stack>
        </CardContent>
      </Card>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        {/* LEFT */}
        <Box flex={2}>
          {/* STEP 1 */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <BookingStepStaff
                staffs={staffs}
                selectedStaff={selectedStaff}
                onSelect={(s) => {
                  setSelectedStaff(s)
                  setStaffError(null)
                }}
                availability={{}}
                error={staffError}
              />
            </CardContent>
          </Card>

          {/* STEP 2 */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <BookingStepTime
                startTime={startTime ?? ''}
                onChange={setStartTime}
                duration={combo.duration}
              />
            </CardContent>
          </Card>

          {/* STEP 3 */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <BookingPaymentSection
                value={paymentMethod}
                onChange={setPaymentMethod}
              />
            </CardContent>
          </Card>

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              height: 56,
              fontSize: 16,
              fontWeight: 600
            }}
            disabled={ !startTime || submitting}
            onClick={handleSubmit}
          >
            {submitting ? 'Đang xử lý...' : 'Xác nhận đặt lịch'}
          </Button>
        </Box>

        {/* RIGHT */}
        <Box flex={1}>
          <BookingSummaryPanel
            services={[]}
            original={combo.pricing.originalPrice}
            afterServiceDiscount={combo.pricing.comboPrice}
            discountAmount={0}
            final={combo.pricing.comboPrice}
            totalDuration={combo.duration}
          />
        </Box>
      </Stack>
    </Container>
  )
}