import React from 'react';

import { Container } from '@mui/material';

export default function Loading() {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <img src="/assets/loading2.png" alt="loading" />
    </Container>
  );
}
