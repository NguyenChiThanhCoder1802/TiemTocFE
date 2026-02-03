import { Box, Typography, TextField } from '@mui/material'

interface Props {
  startTime: string
  onChange: (value: string) => void
}

export default function BookingStepTime({ startTime, onChange }: Props) {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={1}>
        1. Chọn ngày & giờ
      </Typography>

      <TextField
        type="datetime-local"
        fullWidth
        value={startTime}
        onChange={e => onChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  )
}
