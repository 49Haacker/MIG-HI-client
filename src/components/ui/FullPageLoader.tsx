import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface FullPageLoaderProps {
  isLoading: boolean;
}

const FullPageLoader: React.FC<FullPageLoaderProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null; // Return null if not loading
  }

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={1300} // Z-index should be high enough to be on top of other components
      bgcolor="rgba(0, 0, 0, 0.5)" // Semi-transparent background
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default FullPageLoader;
