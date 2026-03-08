import { Box, Button, Typography, Tooltip } from "@mui/material"
import { format } from "date-fns"

interface Slot {
  time: string
  available: boolean
  reason?: string
}

interface Props {
  slots: Slot[]
  selected: string | null
  onSelect: (time: string) => void
}

export default function BookingTimeSlots({
  slots,
  selected,
  onSelect
}: Props) {
  return (
    <Box>
      <Typography fontWeight={600} mb={2}>
        Chọn giờ
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(80px,1fr))",
          gap: 1
        }}
      >
        {slots.map((slot) => {
        
          const timeLabel = format(
            new Date(slot.time),
            "HH:mm"
          )

         const button =(
            <Button
              key={slot.time}
              variant={
                selected === slot.time
                  ? "contained"
                  : "outlined"
              }
              disabled={!slot.available}
              onClick={() => onSelect(slot.time)}
              title={slot.reason}
              size="small"
              sx={{
                minHeight: 36,
                fontSize: 13,
                padding: "4px 6px",
                borderRadius: 1
              }}
            >
              {timeLabel}
            </Button>
          )
          if (!slot.available && slot.reason) {
            return (
              <Tooltip key={slot.time} title={slot.reason}>
                <span>{button}</span>
              </Tooltip>
            )
          }

          return button
        })}
      </Box>
    </Box>
  )
}