import { Fab } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
const BookingFab = () => {
  const navigate = useNavigate();

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'SERVICE_ITEM',
    drop: (item: { id: number }) => {
      const existing = JSON.parse(localStorage.getItem('selectedServiceIds') || '[]') as number[];
      if (!existing.includes(item.id)) {
        existing.push(item.id);
        localStorage.setItem('selectedServiceIds', JSON.stringify(existing));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <Fab
      ref={dropRef}
      color={isOver && canDrop ? 'secondary' : 'primary'}
      aria-label="book"
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1000,
        boxShadow: 4,
        transform: isOver ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.3s ease-in-out',
      }}
      onClick={() => navigate('/booking')}
    >
      <CalendarMonthIcon />
    </Fab>
  );
};


export default BookingFab;
