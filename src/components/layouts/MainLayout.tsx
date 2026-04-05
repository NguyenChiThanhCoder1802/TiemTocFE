import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../share/Header/Header';
import Footer from '../share/Footer';
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
