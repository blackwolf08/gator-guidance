import React from 'react';
import { useSelector } from 'react-redux';

import { Box, Paper, Stack, Avatar, Container, Typography } from '@mui/material';

export default function Loading() {
  const { questions } = useSelector((state) => state.ai);

  return (
    <Container
      className="animate__animated animate__zoomIn"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Stack mb={2} direction="row" spacing={2} alignContent="center" justifyContent="center">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
          }}
        >
          <Avatar src="assets/user.png" sx={{ mr: 1, ml: 1 }} />
          <Paper
            sx={{
              p: 1,
              position: 'relative',
              bgcolor: 'primary.lighter',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: 0,
                height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                right: -10,
                borderLeft: `10px solid #D0ECFE`,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            <Typography variant="body2">{questions[questions.length - 1]}</Typography>
          </Paper>
        </Box>
      </Stack>
      <img src="/assets/loading2.png" alt="loading" />
    </Container>
  );
}
