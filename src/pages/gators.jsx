import { Helmet } from 'react-helmet-async';

import { GatorsView } from 'src/sections/gators/view';

// ----------------------------------------------------------------------

export default function GatorsPage() {
  return (
    <>
      <Helmet>
        <title> Gators | Gator Guidance </title>
      </Helmet>

      <GatorsView />
    </>
  );
}
