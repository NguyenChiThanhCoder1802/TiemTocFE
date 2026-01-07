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
  title?: string
}

const StaffCardList = ({ staffs, title }: Props) => {
  const navigate = useNavigate()

  return (
    <Box mt={6}>
      {title && (
        <Typography variant="h5" mb={3} fontWeight={600}>
          {title}
        </Typography>
      )}

      <Stack
        direction="row"
        flexWrap="wrap"
        gap={3}
      >
        {staffs.map(staff => (
          <Card
            key={staff._id}
            sx={{
              width: 280,
              cursor: 'pointer',
              transition: '0.25s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
            onClick={() => navigate(`/staffs/${staff._id}`)}
          >
            <CardContent>
              <Stack alignItems="center" spacing={1.2}>
                <Avatar
                  src={staff.user.avatar}
                  alt={staff.user.name}
                  sx={{ width: 72, height: 72 }}
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
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}

export default StaffCardList
