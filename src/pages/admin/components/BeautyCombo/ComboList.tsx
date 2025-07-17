import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ComboDto } from '../../../../types/Combo';

interface Props {
  combos: ComboDto[];
  onDelete: (id: number) => void;
}

const ComboList = ({ combos, onDelete }: Props) => {
  return (
    <Box mt={3}>
      {combos.map(combo => (
        <Box key={combo.id} border={1} borderRadius={2} p={2} mb={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{combo.name}</Typography>
              <Typography variant="body2" color="textSecondary">{combo.description}</Typography>
              <Typography variant="body1" color="primary">
                Giá: {combo.discountedPrice.toLocaleString()}₫
              </Typography>
              <Typography variant="body2">
                ⏰ {combo.startDate} ➡ {combo.endDate}
              </Typography>
              <List dense>
                {combo.services.map(s => (
                  <ListItem key={s.id}>
                    <ListItemText primary={`• ${s.name}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
            <IconButton color="error" onClick={() => onDelete(combo.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ComboList;
