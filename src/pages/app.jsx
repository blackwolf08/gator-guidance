import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { USER_STAGES, getUserStage } from 'src/store/slices/user';

import { AppView } from 'src/sections/app/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  const dispatch = useDispatch();
  const { stage } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserStage());
  }, [dispatch]);

  useEffect(() => {
    if (stage === USER_STAGES.LOGIN) {
      navigate('/login');
    }
  }, [stage, navigate]);

  return (
    <>
      <Helmet>
        <title> Dashboard | Gator Guidance </title>
      </Helmet>

      <AppView />
    </>
  );
}
