import { Fab } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';

const BookingFab = () => {
  const navigate = useNavigate();

  return (
    <Fab
      color="primary"
      aria-label="book"
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1000,
        boxShadow: 4,
      }}
      onClick={() => navigate('/booking')}
    >
      <CalendarMonthIcon />
    </Fab>
  );
};

export default BookingFab;
