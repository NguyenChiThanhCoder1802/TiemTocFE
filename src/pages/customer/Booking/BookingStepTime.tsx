import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import type { BookingEstimateContext } from '../../../types/Booking/BookingEstimateContext'


interface Props {
  booking: BookingEstimateContext
  onNext: () => void
  onBack: () => void
}

const BookingStepTime = ({ booking, onNext, onBack }: Props) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  return (
    <Stack spacing={3}>
      <TextField
        type="date"
        label="Ngày"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <TextField
        type="datetime-local"
        label="Giờ bắt đầu"
        InputLabelProps={{ shrink: true }}
        value={time}
        onChange={e => setTime(e.target.value)}
      />

      <Stack direction="row" spacing={2}>
        <Button onClick={onBack}>Quay lại</Button>

        <Button
  variant="contained"
  disabled={!date || !time}
  onClick={() => {
    booking.setTime(date, time)
    onNext()
  }}
>
  Tiếp tục
</Button>

      </Stack>
    </Stack>
  )
}

export default BookingStepTime
