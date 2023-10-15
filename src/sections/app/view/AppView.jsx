import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Stack, Button } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { actions } from 'src/store/slices/ai';

import QuestionInput from '../question-input';

// ----------------------------------------------------------------------

export default function AppView() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isMobile = useResponsive('down', 'sm');

  const handleChooseGators = () => {
    router.push('/gators');
  };

  useEffect(() => {
    dispatch(actions.clearQuestions());
  }, [dispatch]);

  return (
    <>
      <Container
        sx={{
          position: 'relative',
        }}
      >
        <Stack spacing={2} direction="column" alignItems="center" sx={{}}>
          <Typography align="center" variant="h4" sx={{ mb: 5 }}>
            Ask the Gator Advisory Board
          </Typography>

          <Box
            component="img"
            alt="Gator Advisory Board"
            src="/assets/gators/togeather.png"
            sx={{
              top: 0,
              width: 1,
              height: 1,
              objectFit: 'cover',
              maxHeight: '300px',
              maxWidth: '300px',
            }}
          />

          <QuestionInput />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleChooseGators}>
            Choose your Gators
          </Button>
        </Stack>
      </Container>
      {isMobile && (
        <Box
          component="img"
          alt="Gator Advisory Board"
          src="/assets/bye-gator.gif"
          sx={{
            bottom: '-2px',
            width: 1,
            height: 'auto',
            objectFit: 'cover',
            position: 'absolute',
            right: '50%',
            transform: 'translateX(50%)',
            maxWidth: '300px',
          }}
        />
      )}
    </>
  );
}
