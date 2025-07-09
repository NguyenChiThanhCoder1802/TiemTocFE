// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import Header from '../share/Header';
import Footer from '../share/Footer';
import { Box } from '@mui/material';

const MainLayout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box component="main" flex={1} p={2}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
