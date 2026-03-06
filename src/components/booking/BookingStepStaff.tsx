import { Box, Typography } from '@mui/material'
import type { Staff } from '../../types/Staff/Staff'
import StaffCardList from '../staff/StaffCardList'

interface Props {
  staffs: Staff[]
  selectedStaff: Staff | null
  onSelect: (staff: Staff | null) => void
   availability: Record<string, boolean>
    error?: string | null
}

export default function BookingStepStaff({
  staffs,
  selectedStaff,
  onSelect,
  availability,
  error
}: Props) {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={1}>
        Chọn nhân viên (không bắt buộc)
      </Typography>
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
      <StaffCardList
        staffs={staffs}
        selectedStaffId={selectedStaff?._id}
        availability={availability}
        onSelect={onSelect}
      />
    </Box>
  )
}
