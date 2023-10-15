import { Helmet } from 'react-helmet-async';

import { ResponseView } from 'src/sections/response/view';

// ----------------------------------------------------------------------

export default function ResponsePage() {
  return (
    <>
      <Helmet>
        <title> Responses | Gator Guidance </title>
      </Helmet>

      <ResponseView />
    </>
  );
}
