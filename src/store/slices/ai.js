import { createSlice } from '@reduxjs/toolkit';

import { askMemberGPT } from 'src/utils/chatGPT';
import { gatorMembers } from 'src/utils/gatorMembers';

export const AI_STAGES = {
  ASKING: 'ASKING',
  ANSWERING: 'ANSWERING',
  ANSWERED: 'ANSWERED',
};

const STORED_GATORS = localStorage.getItem('gators')
  ? JSON.parse(localStorage.getItem('gators'))
  : gatorMembers.slice(0, 4);

const initialState = {
  gators: STORED_GATORS,
  questions: [],
  isLoading: false,
  error: null,
  question: '',
  stage: AI_STAGES.ASKING,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = false;
    },
    // ADD CONVERSATION TO GATOR
    addConverstationToGator(state, action) {
      const { id, response } = action.payload;
      state.gators = state.gators.map((gator) => {
        if (gator.id === id) {
          gator.conversation.push({ role: 'assistant', content: response });
        }
        return gator;
      });
    },
    // STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // ADD QUESTION
    addQuestion(state, action) {
      state.questions.push(action.payload);
    },
    // ADD Question to every gator
    addQuestionToGators(state, action) {
      state.gators = state.gators.map((gator) => {
        gator.conversation.push({ role: 'user', content: action.payload });
        return gator;
      });
    },
    // SET GATOR MEMBERS
    setGatorMembers(state, action) {
      state.gators = action.payload;
    },
    // SET QUESTION
    setQuestion(state, action) {
      state.question = action.payload;
    },
    // SET STAGE
    setStage(state, action) {
      state.stage = action.payload;
    },
    // ADD GATOR (if more than 4 alret user to remove one) else add
    addGator(state, action) {
      if (state.gators.length === 4) {
        alert('You can only add 4 gators');
      } else {
        state.gators.push(action.payload);
      }
      localStorage.setItem('gators', JSON.stringify(state.gators));
    },
    // REMOVE GATOR (minimum 4 gators)
    removeGator(state, action) {
      state.gators = state.gators.filter((gator) => gator.id !== action.payload.id);
      localStorage.setItem('gators', JSON.stringify(state.gators));
    },
    // clear questions and gator conversation
    clearQuestions(state) {
      state.questions = [];
      state.gators = state.gators.map((gator) => {
        gator.conversation = [];
        return gator;
      });
    },
  },
});

// Actions
export function addQuestionToState(question) {
  return (dispatch) => {
    dispatch(actions.addQuestion(question));
    dispatch(actions.addQuestionToGators(question));
    dispatch(askGators());
  };
}

export function askGators() {
  return async (dispatch, getState) => {
    const { gators } = getState().ai;
    dispatch(actions.startLoading());
    try {
      const batchedGators = gators.map(async (gator) => {
        const response = await askMemberGPT(gator);
        dispatch(actions.addConverstationToGator({ id: gator.id, response }));
      });
      await Promise.all(batchedGators);
      dispatch(actions.setStage(AI_STAGES.ANSWERED));
      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.hasError(error));
      dispatch(actions.stopLoading());
    }
  };
}

// Reducer
export default slice.reducer;
export const { actions } = slice;
