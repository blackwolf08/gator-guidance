import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Modal, Paper, Avatar, Typography } from '@mui/material';

import Speaker from 'src/components/Speaker';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ResponseCard({ gator }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const renderImg = (
    <Box
      component="img"
      alt={gator.name}
      src={gator.imagePath}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  return (
    <>
      <Card sx={{ cursor: 'pointer' }} raised variant="elevation" onClick={handleOpen}>
        <Box sx={{ pt: '100%', position: 'relative' }}>{renderImg}</Box>

        <Stack spacing={2} sx={{ p: 3 }} direction="column">
          <Link color="inherit" underline="hover" variant="h5" align="center" noWrap>
            {gator.name}
          </Link>

          <Typography variant="body2" align="center" noWrap>
            {gator.conversation
              ? gator.conversation[gator.conversation.length - 1]?.content
              : 'Where am I?'}
          </Typography>
        </Stack>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: '80vw',
            maxHeight: 500,
            overflowY: 'auto',
            borderRadius: 2,
          }}
        >
          <Stack direction="row" spacing={2} alignContent="center" justifyContent="center">
            <Box
              component="img"
              alt={gator.name}
              src={gator.imagePath}
              sx={{
                objectFit: 'cover',
                height: 100,
                width: 100,
              }}
            />
          </Stack>
          <Typography variant="h5" component="h2" align="center">
            What does {gator.name} had to say so far?
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
            {gator.conversation?.map((entry, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: entry.role === 'assistant' ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  mb: 3,
                  position: 'relative',
                }}
              >
                <Avatar
                  src={entry.role === 'assistant' ? gator.imagePath : 'assets/user.png'}
                  sx={{ mr: 1, ml: 1 }}
                />
                <Paper
                  sx={{
                    p: 1,
                    position: 'relative',
                    bgcolor: entry.role === 'assistant' ? 'info.lighter' : 'primary.lighter',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      width: 0,
                      height: 0,
                      borderTop: '10px solid transparent',
                      borderBottom: '10px solid transparent',
                      [entry.role === 'assistant' ? 'left' : 'right']: -10,
                      [entry.role === 'assistant' ? 'borderRight' : 'borderLeft']: `10px solid ${
                        entry.role === 'assistant' ? '#CAFDF5' : '#D0ECFE'
                      }`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  />
                  <Typography variant="body2">{entry.content}</Typography>
                  <Speaker
                    sx={{
                      position: 'absolute',
                      top: '0',
                      transform: 'translateY(-50%)',
                      right: '-1rem',
                      left: entry.role === 'assistant' ? 'auto' : '100%',
                    }}
                    phrase={entry.content}
                    name={gator.name}
                    role={entry.role}
                  />
                </Paper>
              </Box>
            ))}
          </Box>
          <Iconify
            icon="eva:close-outline"
            onClick={handleClose}
            width={32}
            sx={{
              position: 'fixed',
              top: 10,
              right: 10,
              cursor: 'pointer',
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

ResponseCard.propTypes = {
  gator: PropTypes.object,
};
