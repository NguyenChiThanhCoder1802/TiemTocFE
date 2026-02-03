import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

type SortValue =
  | 'priority'
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'popular'

interface Props {
  value?: SortValue
  onChange: (value?: SortValue) => void
}

const SortFilter = ({ value, onChange }: Props) => {
  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel>Sắp xếp</InputLabel>
      <Select
        label="Sắp xếp"
        value={value ?? ''}
        onChange={(e) =>
          onChange(e.target.value as SortValue || undefined)
        }
      >
        <MenuItem value="">
          <em>Mặc định</em>
        </MenuItem>
        <MenuItem value="priority">Ưu tiên</MenuItem>
        <MenuItem value="newest">Mới nhất</MenuItem>
        <MenuItem value="price_asc">Giá tăng dần</MenuItem>
        <MenuItem value="price_desc">Giá giảm dần</MenuItem>
        <MenuItem value="popular">Phổ biến</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SortFilter
