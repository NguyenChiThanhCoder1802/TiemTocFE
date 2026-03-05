import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Stack,
  Divider,
  Paper,
  Button
} from '@mui/material'

import { fetchStaffById } from '../../api/staffAPI'
import type { Staff } from '../../types/Staff/Staff'
import ReviewList from '../../pages/customer/Review/ReviewList'
import ReviewFormDialog from '../../pages/customer/Review/ReviewFormDialog'

const StaffDetailPage = () => {
  const { id } = useParams()
  const [staff, setStaff] = useState<Staff | null>(null)
  const [openReview, setOpenReview] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!id) return
    fetchStaffById(id).then(setStaff)
  }, [id])

  if (!staff) return null

  return (
    <Box maxWidth={900} mx="auto" mt={6} px={2}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        {/* ================= INFO ================= */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
          <Avatar
            src={staff.user.avatar}
            sx={{ width: 140, height: 140, border: '4px solid', borderColor: 'primary.main' }}
          />

          <Box flex={1}>
            <Typography variant="h4" fontWeight={600}>
              {staff.user.name}
            </Typography>

            <Stack direction="row" spacing={1} mt={1}>
              <Chip label={staff.position} color="secondary" />
              <Chip
                label={
                  staff.workingStatus === 'active'
                    ? 'Đang làm'
                    : staff.workingStatus === 'off'
                    ? 'Nghỉ'
                    : 'Đã nghỉ'
                }
                color={
                  staff.workingStatus === 'active'
                    ? 'success'
                    : staff.workingStatus === 'off'
                    ? 'warning'
                    : 'default'
                }
              />
            </Stack>

            <Typography mt={2} color="text.secondary">
              {staff.experienceYears} năm kinh nghiệm
            </Typography>

            <Typography mt={1}>
              {staff.ratingAverage.toFixed(1)} / 5 • {staff.completedBookings} lượt phục vụ
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* ================= SKILLS ================= */}
        <Typography variant="h6">Kỹ năng</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
          {staff.skills.length
            ? staff.skills.map(skill => <Chip key={skill} label={skill} />)
            : <Typography color="text.secondary">Chưa cập nhật</Typography>}
        </Stack>

        {/* ================= REVIEWS ================= */}
        <Divider sx={{ my: 4 }} />

        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight={600}>
            Đánh giá từ khách hàng
          </Typography>

          <Button
            variant="contained"
            onClick={() => setOpenReview(true)}
            sx={{ borderRadius: 3 }}
          >
            Viết đánh giá
          </Button>
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
