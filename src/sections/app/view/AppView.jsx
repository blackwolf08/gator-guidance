import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Grid, Stack, Button } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

// import { useResponsive } from 'src/hooks/use-responsive';

import { actions } from 'src/store/slices/ai';

import QuestionInput from '../question-input';

// ----------------------------------------------------------------------

export default function AppView() {
  const router = useRouter();
  const dispatch = useDispatch();
  // const isMobile = useResponsive('down', 'sm');

  const handleChooseGators = () => {
    router.push('/gators');
  };

  useEffect(() => {
    dispatch(actions.resetAIstate());
  }, [dispatch]);

  return (
    <>
      <Container
        className="animate__animated animate__fadeIn"
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
            className="animate__animated animate__lightSpeedInRight"
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
            Click here to choose your Gators!
          </Button>
        </Stack>

        <Stack direction="column" alignItems="center" mt={2}>
          <Typography align="center" variant="h4" sx={{ mb: 1 }}>
            Example questions
          </Typography>
          <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
            <Grid
              item
              xs={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={() => dispatch(actions.setQuestion("I don't want to go to school"))}
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
              >
                &quot;I don&apos;t want to go to school&quot;
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={() => dispatch(actions.setQuestion("My friends don't play with me"))}
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
              >
                &quot;My friends don&apos;t play with me&quot;
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={() => dispatch(actions.setQuestion('I am scared of the dark'))}
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
              >
                &quot;I am scared of the dark&quot;
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={() => dispatch(actions.setQuestion("I am scared of the Doctor's visit"))}
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
              >
                &quot;I am scared of the Doctor&apos;s visit&quot;
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Container>
      {/* {isMobile && (
        <Box
          component="img"
          alt="Gator Advisory Board"
          src="/assets/bye-gator.gif"
          sx={{
            bottom: '-2px',
            width: 1,
            height: 'auto',
            objectFit: 'contain',
            position: 'absolute',
            right: '50%',
            transform: 'translateX(50%)',
            maxWidth: '150px',
          }}
        />
      )} */}
    </>
  );
}
