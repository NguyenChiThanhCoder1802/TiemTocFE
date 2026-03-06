import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import type { Category } from '../../types/Category/Category'

interface Props {
  categories: Category[]
  value: string | null
  onChange: (categoryId: string | null) => void
}

const CategoryFilter = ({
  categories,
  value,
  onChange
}: Props) => {
  return (
    <FormControl size="small" sx={{ minWidth: 220 }}>
      <InputLabel>Danh mục</InputLabel>
      <Select
        label="Danh mục"
        value={value ?? ''}
        onChange={(e) =>
          onChange(e.target.value || null)
        }
      >
        <MenuItem value="">
          <em>Tất cả danh mục</em>
        </MenuItem>

        {categories.map((cat) => (
          <MenuItem key={cat._id} value={cat._id}>
            {cat.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CategoryFilter
