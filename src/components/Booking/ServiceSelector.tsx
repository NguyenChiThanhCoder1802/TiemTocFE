import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import type { Service } from '../../types/Service';

interface Props {
  services: Service[];
  selected: number[];
  onChange: (ids: number[]) => void;
}

const ServiceSelector = ({ services, selected, onChange }: Props) => (
  <FormControl fullWidth margin="normal">
    <InputLabel>Dịch vụ</InputLabel>
    <Select
      multiple
      value={selected}
      onChange={(e) => onChange(e.target.value as number[])}
      input={<OutlinedInput label="Dịch vụ" />}
      renderValue={(selected) =>
        services
          .filter((s) => selected.includes(s.id))
          .map((s) => s.name)
          .join(', ')
      }
    >
      {services.map((service) => (
        <MenuItem key={service.id} value={service.id}>
          <Checkbox checked={selected.includes(service.id)} />
          <ListItemText
            primary={`${service.name} - ${service.price.toLocaleString()}đ`}
          />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default ServiceSelector;
