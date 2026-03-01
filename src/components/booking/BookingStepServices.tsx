import {
  Box,
  Typography,
  Card,
  CardContent,
  Checkbox,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Button
} from '@mui/material'
import { useState } from 'react'
import type { Service } from '../../types/HairService/Service'
interface Props {
  services: Service[]
  selected: Service[]
  toggleService: (service: Service) => void
}

export default function BookingStepServices({
  services,
  selected,
  toggleService
}: Props) {
  const [open, setOpen] = useState(false)

  const isSelected = (id: string) =>
    selected.some(s => s._id === id)

  /* ================= CARD UI ================= */
  const ServiceCardItem = (service: Service) => {
    const checked = isSelected(service._id)

    return (
      <Card
        key={service._id}
        variant="outlined"
        sx={{
          cursor: 'pointer',
          borderColor: checked ? 'primary.main' : undefined
        }}
        onClick={() => toggleService(service)}
      >
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            
            {/* IMAGE */}
            <Box
              component="img"
              src={service.images?.[0] || '/placeholder.png'}
              alt={service.name}
              sx={{
                width: 70,
                height: 70,
                objectFit: 'cover',
                borderRadius: 2
              }}
            />

            {/* INFO */}
            <Box flex={1}>
              <Typography fontWeight={600}>
                {service.name}
              </Typography>

              <Stack direction="row" spacing={1} mt={1}>
                <Chip size="small" label={`${service.duration} phút`} />
                <Chip
                  size="small"
                  color="primary"
                  label={`${service.finalPrice.toLocaleString()}đ`}
                />
              </Stack>
            </Box>

            <Checkbox checked={checked} />
          </Stack>
        </CardContent>
      </Card>
    )
  }

  return (
    <Box>
      {/* ================= HEADER ================= */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={700}>
          Chọn dịch vụ
        </Typography>

        <Typography
          color="primary"
          sx={{ cursor: 'pointer', fontWeight: 600 }}
          onClick={() => setOpen(true)}
        >
          Chọn thêm dịch vụ
        </Typography>
      </Stack>

      {/* ================= SELECTED SERVICES ================= */}
      {selected.length > 0 && (
        <Stack spacing={2} mb={3}>
          {selected.map(service => ServiceCardItem(service))}
        </Stack>
      )}

      {/* ================= DIALOG ALL SERVICES ================= */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Chọn thêm dịch vụ</DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            {services.map(service =>
              ServiceCardItem(service)
            )}
          </Stack>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => setOpen(false)}
          >
            Xong
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  )
}