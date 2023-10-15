import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices

import aiReducer from './slices/ai';
import userReducer from './slices/user';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  ai: aiReducer,
});

export { rootReducer, rootPersistConfig };
