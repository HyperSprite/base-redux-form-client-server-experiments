// @flow

import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import page from './page';
import photos from './photos';

const app = combineReducers({
  auth,
  form,
  page,
  photos,
});

export default app;
