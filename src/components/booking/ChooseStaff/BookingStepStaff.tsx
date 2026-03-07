import { Box, Button, Stack, Typography } from '@mui/material'
import { useState } from "react"
import type { Staff } from '../../../types/Staff/Staff'
import StaffSelectDialog from "./StaffSelectDialog"

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
  const [open, setOpen] = useState(false)
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography fontWeight={600}>
          Nhân viên phục vụ:
          {" "}
          {selectedStaff
            ? selectedStaff.name
            : "Không bắt buộc"}
        </Typography>

        <Button
          variant="text"
          onClick={() => setOpen(true)}
        >
          Chọn nhân viên
        </Button>
      </Stack>
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
       <StaffSelectDialog
        open={open}
        staffs={staffs}
        selectedStaff={selectedStaff}
        availability={availability}
        onClose={() => setOpen(false)}
        onSelect={onSelect}
      />
    </Box>
  )
}
