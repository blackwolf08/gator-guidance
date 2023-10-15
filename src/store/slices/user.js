import { createSlice } from '@reduxjs/toolkit';

// Slice to fetch User Detail

export const USER_STAGES = {
  LOGIN: 'LOGIN',
  DASHBOARD: 'DASHBOARD',
};

const initialState = {
  isLoading: true,
  error: null,
  success: null,
  stage: USER_STAGES.DASHBOARD,
  name: '',
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.success = null;
      state.isLoading = true;
      state.error = false;
      state.user = {};
    },
    // HAS ERROR
    hasError(state, action) {
      state.success = null;
      state.isLoading = false;
      state.error = action.payload;
      state.user = {};
    },
    // UPDATE STAGE
    updateUserStage(state, action) {
      state.stage = action.payload;
    },
    // UPDATE NAME
    setName(state, action) {
      state.name = action.payload;
    },
  },
});

// Actions
export function getUserStage() {
  return async (dispatch) => {
    const userStage = localStorage.getItem('user_stage');
    const userName = localStorage.getItem('user_name');
    if (!userStage || !userName) {
      dispatch(actions.updateUserStage(USER_STAGES.LOGIN));
      localStorage.setItem('user_stage', USER_STAGES.LOGIN);
    } else {
      dispatch(actions.updateUserStage(userStage));
      dispatch(actions.setName(userName));
    }
  };
}

export function login(name) {
  return async (dispatch) => {
    localStorage.setItem('user_stage', USER_STAGES.DASHBOARD);
    localStorage.setItem('user_name', name);
    dispatch(actions.updateUserStage(USER_STAGES.DASHBOARD));
    dispatch(actions.setName(name));
  };
}

export function logout() {
  return async (dispatch) => {
    localStorage.setItem('user_stage', USER_STAGES.LOGIN);
    localStorage.removeItem('user_name');
    dispatch(actions.updateUserStage(USER_STAGES.LOGIN));
    dispatch(actions.setName(''));
  };
}

// Reducer
export default slice.reducer;
export const { actions } = slice;
