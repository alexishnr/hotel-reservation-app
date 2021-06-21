import React from 'react';
import { Box, Typography } from '@material-ui/core';

export default function Footer() {
  return (
    <Box color="#FFF" bgcolor="#282c34" height="50px" position="fixed" bottom="0" left="0" right="0" marginBottom="0px">
      <Typography variant='subtitle1'> 
        Projet Alexis Honoré
      </Typography>
    </Box>
  );
}