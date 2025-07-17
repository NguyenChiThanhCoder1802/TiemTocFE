import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { getMyPoints } from '../../src/api/loyaltyAPI';

const UserPointDisplay = () => {
  const [points, setPoints] = useState<number | null>(null);

  useEffect(() => {
    getMyPoints()
      .then(setPoints)
      .catch(() => setPoints(null));
  }, []);

  return (
    <Box mt={2}>
      <Typography variant="h6">
        🌟 Điểm tích lũy: {points !== null ? points : 'Đang tải...'}
      </Typography>
    </Box>
  );
};

export default UserPointDisplay;
