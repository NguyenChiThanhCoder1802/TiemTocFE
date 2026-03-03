import { Box, Typography, Stack, Button,Snackbar,Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { Booking } from '../../types/Booking/Booking'
import ReviewFormDialog from '../../pages/customer/Review/ReviewFormDialog'
interface Props {
  booking: Booking
}

export default function BookingServiceCard({ booking }: Props) {
  const navigate = useNavigate()
  const isService = booking.bookingType === 'service'
  const [openReview, setOpenReview] = useState(false)
  const [reviewServiceId, setReviewServiceId] = useState<string | undefined>()
  const [reviewStaffId, setReviewStaffId] = useState<string | undefined>()
  const [reviewServiceName, setReviewServiceName] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const handleGoDetail = (slug: string) => {
    navigate(`/services/${slug}`)
  }
  const staffName =
    typeof booking.staff === 'object'
      ? booking.staff?.user?.name
      : undefined
      const staffId =
    typeof booking.staff === 'object'
      ? booking.staff?._id
      : undefined
   const handleReviewService = (rawService: any,name?:string) => {
    if (!rawService) return

    const serviceId =
      typeof rawService === 'object'
        ? rawService._id
        : rawService

    if (!serviceId) return

    setReviewServiceId(serviceId)
    setReviewStaffId(undefined)
    setReviewServiceName(name)
    setOpenReview(true)
  }

  const handleReviewStaff = () => {
    if (!staffId) return
    setReviewStaffId(staffId)
    setReviewServiceId(undefined)
    setReviewServiceName(undefined)
    setOpenReview(true)
  }
  return (
    <>
    <Box
  sx={{
    p: 3,
    backgroundColor: '#fff',
    borderRadius: 1,
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
    }
  }}
>
      <Typography variant="h6" fontWeight={700} mb={2}>
        {isService ? 'Dịch vụ đã đặt' : 'Combo đã đặt'}
      </Typography>
      <Typography variant="body2" mb={2}>
        Nhân viên phục vụ:{' '}
        <strong>{staffName || 'Chưa gán nhân viên'}</strong>
      </Typography>
      <Stack spacing={2}>
        {isService &&
          booking.services.map((s, index) => {
            const firstImage = s.imageSnapshot?.[0]

            return (
              <Stack
                  key={index}
                  spacing={1}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    '&:hover': { backgroundColor: '#fafafa' }
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleGoDetail(s.slugSnapshot || '')}
                  >
                {firstImage && (
                  <Box
                    component="img"
                    src={firstImage}
                    alt={s.nameSnapshot}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 2
                    }}
                  />
                )}

                <Stack spacing={0.5}>
                  <Typography fontWeight={600}>
                    {s.nameSnapshot}
                  </Typography>

                  <Typography variant="body2">
                    Thời lượng: {s.durationSnapshot} phút
                  </Typography>

                  <Typography variant="body2">
                    Giá:{' '}
                    {s.priceAfterServiceDiscount?.toLocaleString('vi-VN')}đ
                  </Typography>
                </Stack>
              </Stack>
              {/* ===== BUTTON REVIEW SERVICE ===== */}
                  {booking.status === 'completed' && (
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ alignSelf: 'flex-start' }}
                      onClick={() => handleReviewService(s.service,s.nameSnapshot)}
                    >
                      Đánh giá dịch vụ
                    </Button>
                  )}
                  </Stack>
            )
          })}

        {/* ===== COMBO ===== */}
        {!isService && booking.comboSnapshot && (
          <Stack spacing={1}>
              <Stack direction="row" spacing={2} alignItems="center">
            {booking.comboSnapshot.imageSnapshot?.[0] && (
              <Box
                component="img"
                src={booking.comboSnapshot.imageSnapshot[0]}
                sx={{
                  width: 90,
                  height: 90,
                  objectFit: 'cover',
                  borderRadius: 2
                }}
              />
            )}

              <Stack spacing={0.5}>
                <Typography fontWeight={600}>
                  {booking.comboSnapshot.name}
                </Typography>

                <Typography variant="body2">
                  Giá combo:{' '}
                  {booking.comboSnapshot.comboPrice.toLocaleString('vi-VN')}đ
                </Typography>
              </Stack>
            </Stack>
            {booking.status === 'completed' && (
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                  onClick={() =>
                    handleReviewService(booking.combo?._id, booking.comboSnapshot?.name)
                  }
                >
                  Đánh giá combo
                </Button>
              )}
          </Stack>
        )}
        {booking.status === 'completed' && staffId && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ alignSelf: 'flex-start' }}
              onClick={handleReviewStaff}
            >
              Đánh giá nhân viên "{staffName}"
            </Button>
          )}
      </Stack>
    </Box>
     <ReviewFormDialog
        open={openReview}
        onClose={() => setOpenReview(false)}
        onSuccess={() => {}}
        onError={(message: string) => {
          setOpenReview(false)
          setErrorMessage(message)
        }}
        bookingId={booking._id}
        serviceId={reviewServiceId}
        staffId={reviewStaffId}
        serviceName={reviewServiceName}
        staffName={staffName}
      />
      <Snackbar
      open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity="warning"
          variant="filled"
          onClose={() => setErrorMessage(null)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      </>
  )
}