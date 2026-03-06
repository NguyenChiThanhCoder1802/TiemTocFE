import React from "react";
import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const HomeStaff: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <PersonIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Xin chào, Nhân viên!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Chúc bạn một ngày làm việc hiệu quả.
      </Typography>
    </Box>
  );
};

export default HomeStaff;
