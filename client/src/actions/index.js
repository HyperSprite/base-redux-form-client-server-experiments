// @flow

import axios from 'axios';
// import { v4 } from 'uuid';

const ROOT_URL = process.env.ROOT_URL || '';


// If any of these have a flow error about
// being incompatable with a string enum
// check the ActionStrings in the interface file.
export const TYPES: {[key: ActionStrings]: ActionStrings} = {
  AUTH_USER: 'AUTH_USER',
  AUTH_EDIT_USER: 'AUTH_EDIT_USER',
  UNAUTH_USER: 'UNAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_DATA: 'FETCH_DATA',
  FETCH_JSON: 'FETCH_JSON',
  PAGE_TRANSITION_FALSE: 'PAGE_TRANSITION_FALSE',
  PAGE_TRANSITION_TRUE: 'PAGE_TRANSITION_TRUE',
  PHOTOS_DELETE: 'PHOTOS_DELETE',
  PHOTOS_FETCH: 'PHOTOS_FETCH',
  PHOTOS_POST: 'PHOTOS_POST',
  PHOTOS_SWAP_DISPLAY_TRASH: 'PHOTOS_SWAP_DISPLAY_TRASH',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
};

const axiosConfig = {
  headers: {
    authorization: localStorage.getItem('token'),
  },
};

// handle error mesages
export function authError(error) {
  return {
    type: TYPES.AUTH_ERROR,
    payload: error,
  };
}

// Action creators
export function signinUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/auth/signin`, { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: TYPES.AUTH_USER });
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function signupUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/auth/signup`, { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: TYPES.AUTH_USER });
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return ({ type: TYPES.UNAUTH_USER });
}

export function ifToken() {
  const token = localStorage.getItem('token');
  if (token) {
    return (dispatch) => {
      dispatch({ type: TYPES.AUTH_USER });
    };
  }
}

export function postForm(formProps, relURL, postType) {
  return (dispatch) => {
    axios.post(relURL, formProps, axiosConfig)
      .then((response) => {
        switch (postType) {
          case TYPES.AUTH_EDIT_USER:
            dispatch({
              type: TYPES.AUTH_EDIT_USER,
              payload: response,
            });
            break;
          default:
        }
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}

export function pageTransitionFalse () {
  return (dispatch) => dispatch({ type: TYPES.PAGE_TRANSITION_FALSE });
}

export function toggleModal(options) {
  return {
    type: TYPES.TOGGLE_MODAL,
    payload: options,
  };
}

export function fetchMessage() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/secret`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: response.data.secret,
        });
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}

export function fetchData(relURL) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/${relURL}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_JSON,
          payload: response.data.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}

export function fetchPhotos(relURL, fetchType) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/${relURL}`, axiosConfig)
      .then((response) => {
        switch (fetchType) {
          case TYPES.PHOTOS_FETCH:
            dispatch({
              type: TYPES.PHOTOS_FETCH,
              payload: response.data,
            });
            break;
          case TYPES.PHOTOS_SWAP_DISPLAY_TRASH:
            dispatch({
              type: TYPES.PHOTOS_SWAP_DISPLAY_TRASH,
              payload: response.data,
            });
            break;
          default:
        }
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}

export function postPhotos(formProps, relURL, postType) {
  return (dispatch) => {
    axios.post(relURL, formProps, axiosConfig)
      .then((response) => {
        switch (postType) {
          case TYPES.PHOTOS_POST:
            dispatch({
              type: TYPES.PHOTOS_POST,
              payload: response.data,
            });
            break;
          default:
        }
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}

export function patchPhotos(id, relURL, update, postType) {
  return (dispatch) => {
    axios.patch(`${relURL}/${id}`, update, axiosConfig)
      .then((response) => {
        switch (postType) {
          case TYPES.PHOTOS_DELETE:
            dispatch({
              type: TYPES.PHOTOS_DELETE,
              payload: response.data,
            });
            break;
          default:
        }
      })
      .catch((error) => {
        dispatch({
          type: TYPES.FETCH_DATA,
          payload: error.data,
        });
      });
  };
}
