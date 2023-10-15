import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Iconify from 'src/components/iconify';

const AffirmationAccordion = ({ affirmation }) => (
  <Accordion sx={{ mb: 2 }}>
    <AccordionSummary
      expandIcon={<Iconify icon="mdi:chevron-down" />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Today&apos;s Affirmation</Typography>
    </AccordionSummary>
    <AccordionDetails>
      {affirmation ? (
        <Box
          sx={{
            p: 1,
            position: 'relative',
            bgcolor: 'primary.lighter',
            mb: 2,
            borderRadius: 1,
          }}
        >
          <Typography color="CaptionText" align="center" variant="caption" sx={{ mb: 1 }}>
            {affirmation}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            p: 1,
            position: 'relative',
            bgcolor: 'primary.lighter',
            mb: 2,
            borderRadius: 1,
          }}
        >
          <Typography color="CaptionText" align="center" variant="caption" sx={{ mb: 1 }}>
            Loading today&apos;s affirmation...
          </Typography>
        </Box>
      )}
    </AccordionDetails>
  </Accordion>
);

AffirmationAccordion.propTypes = {
  affirmation: PropTypes.string,
};

export default AffirmationAccordion;
