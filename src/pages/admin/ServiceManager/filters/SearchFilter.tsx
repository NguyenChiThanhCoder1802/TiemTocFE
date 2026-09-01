import { TextField } from '@mui/material'

interface Props {
  value?: string
  onChange: (value?: string) => void
}

const SearchFilter = ({ value, onChange }: Props) => {
  return (
    <TextField
      size="small"
      label="Tìm kiếm dịch vụ"
      placeholder="Nhập tên dịch vụ..."
      value={value ?? ''}
      onChange={(e) =>
        onChange(e.target.value || undefined)
      }
      sx={{ minWidth: 260 }}
    />
  )
}

export default SearchFilter
