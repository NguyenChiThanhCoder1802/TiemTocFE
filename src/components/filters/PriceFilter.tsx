import { Box, TextField } from '@mui/material'

interface Props {
  minPrice?: number
  maxPrice?: number
  onChange: (value: {
    minPrice?: number
    maxPrice?: number
  }) => void
}

const PriceFilter = ({ minPrice, maxPrice, onChange }: Props) => {
  return (
    <Box display="flex" gap={1}>
      <TextField
        size="small"
        label="Giá từ"
        type="number"
        value={minPrice ?? ''}
        onChange={(e) =>
          onChange({
            minPrice: e.target.value
              ? Number(e.target.value)
              : undefined,
            maxPrice
          })
        }
      />

      <TextField
        size="small"
        label="Giá đến"
        type="number"
        value={maxPrice ?? ''}
        onChange={(e) =>
          onChange({
            minPrice,
            maxPrice: e.target.value
              ? Number(e.target.value)
              : undefined
          })
        }
      />
    </Box>
  )
}

export default PriceFilter
