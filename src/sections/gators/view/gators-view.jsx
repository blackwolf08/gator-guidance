import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { gatorMembers } from 'src/utils/gatorMembers';

import GatorCard from '../gator-card';

// ----------------------------------------------------------------------

export default function GatorsView() {
  return (
    <Container>
      <Typography align="center" variant="h4" sx={{ mb: 5 }}>
        Choose your Gator Advisory Board
      </Typography>

      <Grid container spacing={3}>
        {gatorMembers.map((gator) => (
          <Grid key={gator.id} xs={6}>
            <GatorCard gator={gator} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
