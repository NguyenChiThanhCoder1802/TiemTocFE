import { FormControlLabel, Switch } from '@mui/material'

interface Props {
  value?: boolean
  onChange: (value: boolean) => void
}

const DiscountFilter = ({ value = false, onChange }: Props) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label="Đang giảm giá"
    />
  )
}

export default DiscountFilter
