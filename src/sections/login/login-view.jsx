import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { login } from 'src/store/slices/user';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const router = useRouter();

  const handleClick = () => {
    dispatch(login(name));
    router.push('/');
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      {/* <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      /> */}

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Logo sx={{ width: 120, height: 120 }} />
          </Stack>
          <Typography mb={2} variant="h4" align="center">
            Ready to chomp into some awesome stuff?
          </Typography>

          <Stack spacing={3}>
            <TextField onChange={handleNameChange} value={name} name="email" label="Name" />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              onClick={handleClick}
            >
              Lets Go!
            </LoadingButton>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
