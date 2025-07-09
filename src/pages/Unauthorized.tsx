import { Typography, Box } from '@mui/material';

const Unauthorized = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4" color="error">
        ❌ Bạn không có quyền truy cập trang này
      </Typography>
    </Box>
  );
};

export default Unauthorized;
