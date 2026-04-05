import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Stack,
  Divider,
  Paper,
} from '@mui/material'

import { fetchStaffBySlug } from '../../api/staffAPI'
import type { Staff } from '../../types/Staff/Staff'
import ReviewList from '../../pages/customer/Review/ReviewList'
import ReviewFormDialog from '../../pages/customer/Review/ReviewFormDialog'

const StaffDetailPage = () => {
  const { slug } = useParams()
  const [staff, setStaff] = useState<Staff | null>(null)
  const [openReview, setOpenReview] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!slug) return
    fetchStaffBySlug(slug).then(setStaff)
  }, [slug])

  if (!staff) return null

  return (
    <Box maxWidth={900} mx="auto" mt={6} px={2}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        {/* ================= INFO ================= */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
          <Box
            component="img"
            src={staff.avatar}
            sx={{
              width: 200,
              height: 200,
              objectFit: "cover",
              borderRadius: 3,
              border: "4px solid",
              borderColor: "primary.main"
            }}
          />

          <Box flex={1}>
            <Typography variant="h4" fontWeight={600}>
              {staff.name}
            </Typography>
            <Typography mt={2}>
              <strong>Vị trí:</strong> {staff.position}
            </Typography>

            <Typography mt={1}>
              <strong>Kinh nghiệm:</strong> {staff.experienceYears} năm
            </Typography>

            <Typography mt={1}>
              <strong>Đánh giá:</strong> {staff.ratingAverage.toFixed(1)} / 5
            </Typography>

            <Typography mt={1}>
              <strong>Lượt phục vụ:</strong> {staff.completedBookings}
            </Typography>
          </Box>
   
        </Stack>
        {/* ================= REVIEWS ================= */}
        <Divider sx={{ my: 4 }} />

        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight={600}>
            Đánh giá từ khách hàng
          </Typography>

        
        </Stack>

        <ReviewList
          staffId={staff._id}
          reloadKey={reloadKey}
        />

        <ReviewFormDialog
          open={openReview}
          onClose={() => setOpenReview(false)}
          staffId={staff._id}
          onSuccess={() => setReloadKey(k => k + 1)}
        />
      </Paper>
    </Box>
  )
}

export default StaffDetailPage
