// Danh sách Combo
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import type { ComboDto } from '../../types/Combo';

interface Props {
  combos: ComboDto[];
  selected: number[];
  onChange: (ids: number[]) => void;
}

const ComboSelector = ({ combos, selected, onChange }: Props) => (
  <FormControl fullWidth margin="normal">
    <InputLabel id="combo-select-label">Combo</InputLabel>
    <Select
      labelId="combo-select-label"
      multiple
      value={selected}
      onChange={(e) => onChange(e.target.value as number[])}
      input={<OutlinedInput label="Combo" />}
      renderValue={(selected) =>
        combos
          .filter((c) => selected.includes(c.id))
          .map((c) => c.name)
          .join(', ')
      }
    >
      {combos.map((combo) => (
        <MenuItem key={combo.id} value={combo.id}>
          <Checkbox checked={selected.includes(combo.id)} />
          <ListItemText
            primary={`${combo.name} - ${combo.discountedPrice.toLocaleString()}đ`}
            secondary={
              combo.services?.map((s) => s.name).join(', ') ?? 'Không có dịch vụ'
            }
          />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default ComboSelector;
