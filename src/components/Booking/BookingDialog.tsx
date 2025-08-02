// components/BookingDialog.tsx
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BookingPage from '../../pages/customer/BookingPage';
import type { Service } from '../../types/Service';

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
  preselectedService?: Service;
}

const BookingDialog = ({ open, onClose, preselectedService }: BookingDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <IconButton onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ pt: 6 }}>
        <BookingPage preselectedService={preselectedService} />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
