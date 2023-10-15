import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

import { actions } from 'src/store/slices/ai';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function GatorCard({ gator }) {
  const { gators } = useSelector((state) => state.ai);
  const dispatch = useDispatch();

  const isSelected = gators.some((g) => g.id === gator.id);

  const handleGatorSelect = () => {
    if (isSelected) {
      dispatch(actions.removeGator(gator));
    } else {
      dispatch(actions.addGator(gator));
    }
  };

  const renderStatus = (
    <Label
      variant="filled"
      color="error"
      sx={{
        zIndex: 9,
        top: -4,
        width: '100%',
        position: 'absolute',
        textTransform: 'uppercase',
        padding: 2,
        fontSize: 9,
        bottomRightRadius: 0,
        bottomLeftRadius: 0,
      }}
    >
      {gator.type}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={gator.name}
      src={gator.imagePath}
      sx={{
        top: 20,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  return (
    <Card
      raised
      variant="elevation"
      sx={{
        cursor: 'pointer',
        border: isSelected ? '2px solid #649456' : 'none',
      }}
      onClick={handleGatorSelect}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3, position: 'relative' }}>
        <Link color="inherit" underline="hover" variant="h5" align="center" noWrap>
          {gator.name}
        </Link>
        {isSelected && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 4,
              right: '50%',
              transform: 'translateX(50%)',
              bgcolor: 'common.white',
              zIndex: 99,
            }}
          >
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Selected
            </Typography>
          </Box>
        )}
      </Stack>
    </Card>
  );
}

GatorCard.propTypes = {
  gator: PropTypes.object,
};
