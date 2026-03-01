import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Stack
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Staff } from '../../types/Staff/Staff'

interface Props {
  staffs: Staff[]
  selectedStaffId?: string
  onSelect: (staff: Staff | null) => void
  title?: string
  availability?: Record<string, boolean>
}

const StaffCardList = ({
  staffs,
  selectedStaffId,
  onSelect,
  title,
  availability = {}
}: Props) => {
  const navigate = useNavigate()

  return (
    <Box mt={6}>
      {title && (
        <Typography variant="h5" mb={3} fontWeight={600}>
          {title}
        </Typography>
      )}

      <Stack direction="row" flexWrap="wrap" gap={3}>
        {staffs.map(staff => {
          const isSelected = staff._id === selectedStaffId
          const isAvailable = availability[staff._id] !== false

         
          return (
            <Card
              key={staff._id}
               onClick={() => {
                  if (!isAvailable) return
                  onSelect(isSelected ? null : staff)
                }}

             sx={{
              width: 280,
              cursor: isAvailable ? 'pointer' : 'not-allowed',
              opacity: isAvailable ? 1 : 0.5,
              border: isSelected ? '2px solid' : '1px solid #e0e0e0',
              borderColor: isSelected ? 'primary.main' : '#e0e0e0',
              boxShadow: isSelected ? 6 : 1,
              transition: '0.25s',
              '&:hover': isAvailable
                ? {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                : {}
            }}

            >
              <CardContent>
                <Stack alignItems="center" spacing={1.2}>
                  {/* Avatar → xem profile */}
                  <Avatar
                     src={staff.user?.avatar || ''}
  alt={staff.user?.name || 'Staff'}
                    sx={{ width: 72, height: 72, cursor: 'pointer' }}
                    onClick={e => {
                      e.stopPropagation()
                      navigate(`/staffs/${staff._id}`)
                    }}
                  />

                  <Typography fontWeight={600}>
                    {staff.user.name}
                  </Typography>

                  <Chip
                    label={staff.position}
                    size="small"
                    color="secondary"
                  />

                  <Typography variant="body2" color="text.secondary">
                    {staff.experienceYears} năm kinh nghiệm
                  </Typography>

                  <Typography variant="body2">
                    ⭐ {staff.ratingAverage.toFixed(1)} •{' '}
                    {staff.completedBookings} lượt
                  </Typography>
                {/* Trạng thái */}
                  {!isAvailable && (
                    <Chip
                      label="Đã kín lịch"
                      color="error"
                      size="small"
                    />
                  )}

                  {isAvailable && isSelected && (
                    <Chip
                      label="Đã chọn"
                      color="primary"
                      size="small"
                    />
                  )}
                </Stack>
              </CardContent>
            </Card>
          )
        })}
      </Stack>
    </Box>
  )
}

export default StaffCardList
