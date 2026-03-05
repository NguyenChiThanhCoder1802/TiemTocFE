import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  Button,
  Typography
} from '@mui/material'
import { useState } from 'react'
import type { Service } from '../../../types/HairService/Service'

interface Props {
  open: boolean
  onClose: () => void
  services: Service[]
  selected: Service[]
  toggleService: (service: Service) => void
  renderCard: (service: Service) => React.ReactNode
}

export default function ServiceSearchDialog({
  open,
  onClose,
  services,
  renderCard
}: Props) {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<Service[]>(services)

  const handleSearch = () => {
    const key = keyword.trim().toLowerCase()

    if (!key) {
      setResults(services)
      return
    }

    const filtered = services.filter(s =>
      s.name.toLowerCase().includes(key)
    )

    setResults(filtered)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Chọn thêm dịch vụ</DialogTitle>

      <DialogContent>

        {/* SEARCH */}
        <Stack direction="row" spacing={1} mb={2}>
          <TextField
            fullWidth
            size="small"
            placeholder="Nhập tên dịch vụ..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <Button variant="contained" onClick={handleSearch}>
            Tìm
          </Button>
        </Stack>

        {/* RESULT */}
        <Stack spacing={2}>
          {results.map(service => renderCard(service))}

          {results.length === 0 && (
            <Typography textAlign="center" color="text.secondary">
              Không tìm thấy dịch vụ
            </Typography>
          )}
        </Stack>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={onClose}
        >
          Xong
        </Button>

      </DialogContent>
    </Dialog>
  )
}