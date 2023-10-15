import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import Iconify from './iconify';

function Speaker({ phrase, role, name, sx }) {
  const speak = () => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = phrase;

    // Select a voice from the available list
    const voices = window.speechSynthesis
      .getVoices()
      .filter((voice) => voice.lang.includes('en-US'));
    let gatorVoice;

    switch (name) {
      case 'GrandGator':
        gatorVoice = voices.find((voice) => voice.name === 'Grandpa (English (United States))');
        break;
      case 'GatorDad':
        gatorVoice = voices.find((voice) => voice.name === 'Aaron');
        break;
      case 'GatorMom':
        gatorVoice = voices.find((voice) => voice.name === 'Kathy');
        break;
      case 'SisGator':
        gatorVoice = voices.find((voice) => voice.name === 'Shelley (English (United States))');
        break;
      case 'GatorGuru':
        gatorVoice = voices.find((voice) => voice.name === 'Google US English');
        break;
      case 'BroGator':
        gatorVoice = voices.find((voice) => voice.name === 'Junior');
        break;
      case 'RealityGator':
        gatorVoice = voices.find((voice) => voice.name === 'Good News');
        break;
      case 'DiploGator':
        gatorVoice = voices.find((voice) => voice.name === 'Rocko (English (United States))');
        break;
      case 'GatorGiggle':
        gatorVoice = voices.find((voice) => voice.name === 'Boing');
        break;
      default:
        gatorVoice = voices[0];
    }

    if (gatorVoice) {
      msg.voice = gatorVoice;
    }

    window.speechSynthesis.speak(msg);
  };

  useEffect(
    () => () => {
      window.speechSynthesis.cancel();
    },
    []
  );

  if (role === 'assistant') {
    return (
      <Box
        sx={{
          ...sx,
          borderRadius: '50%',
          width: 30,
          height: 30,
          padding: 0,
          bgcolor: 'primary.lighter',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        variant="contained"
        size="small"
        color="primary"
        onClick={speak}
      >
        <Iconify icon="eva:volume-up-fill" />
      </Box>
    );
  }
  return null;
}

Speaker.propTypes = {
  phrase: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default Speaker;
