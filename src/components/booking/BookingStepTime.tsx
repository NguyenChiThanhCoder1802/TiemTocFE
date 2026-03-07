import { useEffect, useState } from "react"
import { getAvailableSlots } from "../../api/BookingAPI"
import BookingTimeSlots from "./BookingTimeSlots"
import { CircularProgress, Box } from "@mui/material"

import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs, { Dayjs } from "dayjs"

interface Props {
  startTime: string | null
  onChange: (time: string) => void
  duration: number
}

export default function BookingStepTime({
  startTime,
  onChange,
  duration
}: Props) {

  const [slots, setSlots] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const [selectedDate, setSelectedDate] =
    useState<Dayjs>(dayjs())

  useEffect(() => {

    if (!duration || !selectedDate) return

    const fetchSlots = async () => {

      setLoading(true)

      try {

        const date =
          selectedDate.format("YYYY-MM-DD")

        const data = await getAvailableSlots(
          date,
          duration
        )

        setSlots(data)

      } catch (err) {
        console.error(err)
      }

      setLoading(false)
    }

    fetchSlots()

  }, [duration, selectedDate])

  return (
    <Box>

      {/* chọn ngày */}
      <DatePicker
        label="Chọn ngày"
        value={selectedDate}
        onChange={(newValue) => {
          if (newValue) {
            setSelectedDate(newValue)
          }
        }}
        disablePast
        sx={{ mb: 3 }}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <BookingTimeSlots
          slots={slots}
          selected={startTime}
          onSelect={onChange}
        />
      )}

    </Box>
  )
}