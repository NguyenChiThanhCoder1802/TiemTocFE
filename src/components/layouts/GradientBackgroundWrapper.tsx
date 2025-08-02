import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface GradientBackgroundWrapperProps {
  children: ReactNode;
}

const GradientBackgroundWrapper = ({ children }: GradientBackgroundWrapperProps) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to right bottom, #e0f7fa, #ffccbc)',
        minHeight: '100vh',
        width: '100%',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
      }}
    >
      {children}
    </Box>
  );
};

export default GradientBackgroundWrapper;
