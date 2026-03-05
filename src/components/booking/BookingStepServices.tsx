import {
  Box,
  Typography,
  Card,
  CardContent,
  Checkbox,
  Stack,
  Chip
} from '@mui/material'
import { useState } from 'react'
import type { Service } from '../../types/HairService/Service'
import ServiceSearchDialog from '../../components/booking/ChooseService/ServiceSearchDialog'

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

  /* CARD UI */
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

      {/* HEADER */}
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

      {/* SELECTED */}
      <Stack spacing={2} mb={3}>
        {selected.map(service => ServiceCardItem(service))}
      </Stack>

      {/* SEARCH DIALOG */}
      <ServiceSearchDialog
        open={open}
        onClose={() => setOpen(false)}
        services={services}
        selected={selected}
        toggleService={toggleService}
        renderCard={ServiceCardItem}
      />

    </Box>
  )
}