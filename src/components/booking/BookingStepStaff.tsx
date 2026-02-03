import { Box, Typography } from '@mui/material'
import type { Staff } from '../../types/Staff/Staff'
import StaffCardList from '../staff/StaffCardList'

interface Props {
  staffs: Staff[]
  selectedStaff: Staff | null
  onSelect: (staff: Staff | null) => void
}

export default function BookingStepStaff({
  staffs,
  selectedStaff,
  onSelect
}: Props) {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={1}>
        2. Chọn nhân viên (không bắt buộc)
      </Typography>

      <StaffCardList
        staffs={staffs}
        selectedStaffId={selectedStaff?._id}
        onSelect={onSelect}
      />
    </Box>
  )
}
