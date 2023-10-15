import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { AI_STAGES } from 'src/store/slices/ai';

import Loading from '../loading';
import GatorResponse from '../GatorResponse';

export default function ResponseView() {
  const { stage } = useSelector((state) => state.ai);
  const router = useRouter();

  useEffect(() => {
    if (stage === AI_STAGES.ASKING) {
      router.push('/');
    }
  }, [stage, router]);

  if (stage === AI_STAGES.ANSWERING) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }
  if (stage === AI_STAGES.ANSWERED) {
    return (
      <Container>
        <GatorResponse />
      </Container>
    );
  }
  return null;
}
