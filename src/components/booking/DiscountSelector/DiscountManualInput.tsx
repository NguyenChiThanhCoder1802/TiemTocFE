import { useState } from 'react'
import { Stack, TextField, Button } from '@mui/material'

interface Props {
  onApply: (code: string) => void
}

export default function DiscountManualInput({ onApply }: Props) {
  const [code, setCode] = useState('')

  return (
    <Stack direction="row" spacing={2} mb={2}>
      <TextField
        size="small"
        label="Nhập mã giảm giá"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ width: 600 }}
      />
      <Button
        variant="contained"
        disabled={!code}
        onClick={() => onApply(code)}
      >
        Áp dụng
      </Button>
    </Stack>
  )
}